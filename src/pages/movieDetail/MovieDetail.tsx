import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../layout";
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import { useQuery } from "react-query";
import { useParams } from 'react-router-dom';
import { baseUrl } from "../../../config";
import MovieCard from "../../components/MovieCard/movieCard";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

type MovieIdParams = {
  movieId: string;
};

interface Star {
  id: number;
  name: string;
}

const fetchMovieDetails = async (movieId: string) => {
  const response = await fetch(`${baseUrl}/movies/${movieId}/details`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchSimilarMovies = async (movieId: string) => {
  const response = await fetch(`${baseUrl}/movies/${movieId}/similar`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const MovieDetail = () => {
  const { movieId } = useParams<MovieIdParams>();

  // Ensure movieId is defined before making the API calls
  const movieIdString = movieId as string;

  const { isLoading: isMovieLoading, isError: isMovieError, data: movieData, error: movieError } = useQuery(
    ['movieDetails', movieIdString],
    () => fetchMovieDetails(movieIdString),
    {
      enabled: !!movieIdString, 
    }
  );

  const { isLoading: isSimilarLoading, isError: isSimilarError, data: similarMovies, error: similarError } = useQuery(
    ['similarMovies', movieIdString],
    () => fetchSimilarMovies(movieIdString),
    {
      enabled: !!movieIdString, 
    }
  );

  const stars = movieData ? JSON.parse(movieData.stars) : [];
  const writers = movieData ? JSON.parse(movieData.writers) : [];
  const genres = movieData ? JSON.parse(movieData.genres) : [];

  const renderError = (error: unknown) => {
    if (error instanceof Error) {
      return <div>Error: {error.message}</div>;
    }
    return <div>An unknown error occurred</div>;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movieId]);

  return (
    <Layout>
      <Container>
        <div className="movie">
          <header className="movie-name">
            {isMovieLoading ? (
              <h2>Loading...</h2>
            ) : isMovieError ? (
              <h2>{renderError(movieError)}</h2>
            ) : (
              <h2>{movieData.movie_title}</h2>
            )}
          </header>
          <div className="movie-visual">
            <Row>
              <Col md={4}>
                <div className="movie-poster">
                  <figure className="image-container">
                    {isMovieLoading ? (
                      <div>Loading...</div>
                    ) : isMovieError ? (
                      renderError(movieError)
                    ) : (
                      <img src={movieData.poster} alt={movieData.movie_title} />
                    )}
                  </figure>
                </div>
              </Col>
              <Col md={8}>
                <div className="video-container">
                  {isMovieLoading ? (
                    <div>Loading...</div>
                  ) : isMovieError ? (
                    renderError(movieError)
                  ) : (
                    <iframe
                      width="100%"
                      height="auto"
                      src={movieData.trailer}
                      title={movieData.movie_title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </Col>
            </Row>
          </div>
          {isMovieLoading ? (
            <div>Loading movie info...</div>
          ) : isMovieError ? (
            <div>{renderError(movieError)}</div>
          ) : (
            <MovieInfo avg_rating={movieData.average_rating} year={movieData.year} duration={movieData.duration} genres={genres} />
          )}
          <div className="description">
            {isMovieLoading ? (
              <div>Loading description...</div>
            ) : isMovieError ? (
              <div>{renderError(movieError)}</div>
            ) : (
              <p>{movieData.description}</p>
            )}
            <Row>
              <Col md={6}>
                <ul className="detail">
                  {isMovieLoading ? (
                    <div>Loading details...</div>
                  ) : isMovieError ? (
                    <div>{renderError(movieError)}</div>
                  ) : (
                    <>
                      <li><strong>Director:</strong> {movieData.director_name}</li>
                      <li><strong>Writers:</strong>
                        <ul className="writers">
                          {writers.map((writer: Star) => (
                            <li key={writer.id}>{writer.name}</li>
                          ))}
                        </ul>
                      </li>
                      <li><strong>Stars:</strong>
                        <ul className="stars">
                          {stars.map((star: Star) => (
                            <li key={star.id}>{star.name}</li>
                          ))}
                        </ul>
                      </li>
                      <li><strong>Box office collection: </strong>${movieData.box_office_collection}</li>
                      <li><strong>Budget: </strong>${movieData.budget}</li>
                      <li><strong>Opening week: </strong>${movieData.opening_week}</li>
                      <li><strong>Release Date: </strong>{movieData.release_date}</li>
                      <li><strong>Country of Origin: </strong>{movieData.country_of_origin}</li>
                    </>
                  )}
                </ul>
              </Col>
              <Col md={6}></Col>
            </Row>
          </div>
          <div className="similarMovies">
            <SectionTitle icon={faFilm} title="Similar Movies" />
            <Row>
              {isSimilarLoading ? (
                <div>Loading similar movies...</div>
              ) : isSimilarError ? (
                <div>{renderError(similarError)}</div>
              ) : (
                similarMovies.map((movie: any) => (
                  <Col md={3} key={movie.movie_id}>
                    <MovieCard movie={movie} />
                  </Col>
                ))
              )}
            </Row>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default MovieDetail;