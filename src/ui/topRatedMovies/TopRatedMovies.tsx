import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieCard from "../../components/MovieCard/movieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from "react-query";

interface Movie {
    movie_id:number;
    duration:number;
    title:string;
    year:string;
    average_rating:string;
    poster:string;
}


const Top10ThisMonth = () => {
    const { isLoading, isError, data, error } = useQuery('movies', async () => {
        const response = await fetch('http://localhost:3000/api/movie');
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        return response.json();
    });
    
    if (isLoading) return <Container>Loading...</Container>;
    if (isError) return <div>Error: {error.message}</div>;

    const movies = data as Movie[];
    
    return ( 
    <>
            <Container >
                <div className="topRatedMovies">
                <header className="header">
                    <h2><span><FontAwesomeIcon icon={faCrown} /></span> Movies</h2>
                    {/* <Link to='/'>View all</Link> */}
                </header>
                <Row>
                {movies.map((movie: Movie) => (
                    <Col sm={6} md={4} key={movie.movie_id}>
                        <MovieCard movie={movie} />
                    </Col>
                ))}

                </Row>
                </div>
            </Container>
        </>
     );
}
 
export default Top10ThisMonth;