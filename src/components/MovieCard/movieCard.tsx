import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faStar, faHeartCirclePlus, faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Movie {
    movie_id: number;
    duration: number;
    title: string;
    year: string;
    average_rating: string;
    poster: string;
}

interface Props {
    movie: Movie;
    refetchWishlist?: () => void; 
}

const MovieCard = ({ movie, refetchWishlist }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [wishlistMovies, setWishlistMovies] = useState<number[]>([]);
    const [key, setKey] = useState(0); // Add key state

    const getUserId = () => {
        const storedUserDataJSON = localStorage.getItem('mfs-user');
        if (storedUserDataJSON !== null) {
            const storedUserData = JSON.parse(storedUserDataJSON);
            return storedUserData.id;
        }
        return null;
    };

    const fetchWishlistFromServer = async () => {
        try {
            const user_id = getUserId();
            if (!user_id) {
                throw new Error('Please Login before creating your wishlist');
            }
            const response = await fetch(`http://localhost:3000/api/wishlist/${user_id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch wishlist from server');
            }
            const data = await response.json();
            setWishlistMovies(data);
        } catch (error) {
            console.error('Error fetching wishlist from server:', error);
        }
    };

    useEffect(() => {
        const storedUserDataJSON = localStorage.getItem('mfs-user');
        if (storedUserDataJSON) {
            const storedUserData = JSON.parse(storedUserDataJSON);
            const userWishlistMovies = storedUserData.wishlistMovies || [];
            setWishlistMovies(userWishlistMovies);
        }
        fetchWishlistFromServer();
    }, [key]); 

    
    const isMovieInWishlist = wishlistMovies.some(wishlistMovie => wishlistMovie.movie_id === movie.movie_id);

    const addToWishlist = async () => {
        setIsLoading(true);
        try {
            const user_id = getUserId();
            if (!user_id) {
                throw new Error('Please Login before creating your wishlist');
            }
            const response = await fetch('http://localhost:3000/api/addToWishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id,
                    movie_id: movie.movie_id,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add movie to wishlist');
            }

            // Update local storage
            const updatedWishlistMovies = isMovieInWishlist ? wishlistMovies.filter(id => id !== movie.movie_id) : [...wishlistMovies, movie.movie_id];
            setWishlistMovies(updatedWishlistMovies);
            setIsHovered(false); // Reset hovered state
            setKey(prevKey => prevKey + 1); // Increment key to trigger reload

            // Refetch wishlist if the function is provided
            if (refetchWishlist) {
                refetchWishlist();
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card">
            <div className="card-wrapper">
                <div className="rating">
                    <span><FontAwesomeIcon icon={faStar} /></span><p>{movie.average_rating}</p>
                </div>
                <Link to={`/movieDetail/${movie.movie_id}`}>
                    <figure>
                        <img src={movie.poster} alt="" />
                    </figure>
                </Link>
                <div className="card--text">
                    <div className="card--text__name">
                        <p>{movie.title} ({movie.year})</p>
                    </div>
                    <div className="card--text__right">
                        <div className="wishlist-button" onClick={addToWishlist} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                            {isLoading ? (
                                <div>Loading...</div>
                            ) : (
                                <FontAwesomeIcon icon={isHovered ? faHeartCirclePlus : (isMovieInWishlist ? faHeartCircleCheck : faHeart)} />
                            )}
                        </div>
                    </div>
                    <div className="card--text__duration">
                        <p>{movie.duration} min</p>
                    </div>
                </div>
                {error && <div>Error: {error}</div>}
            </div>
        </div>
    );
};

export default MovieCard;
