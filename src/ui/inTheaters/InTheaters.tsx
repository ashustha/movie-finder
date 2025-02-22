import { faCrown } from "@fortawesome/free-solid-svg-icons";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { Card } from "react-bootstrap";
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import Button from "../../components/button";

const InTheaters: React.FC = () => {

    const handleClick =(event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('Button clicked!', event.target);
      };

    return ( 
        <section className="inTheaters">
            <SectionTitle title="In Theaters" icon={faCrown} />
            <div className="inTheaters--body">
                <ul>
                    <li>
                        <Card className="movie">
                            <figure>
                                <img src="./assets/image-4.jpg" alt="" />
                            </figure>
                            <div className="card--text">
                                <div>
                                    <h3>Movie Title</h3>
                                    <MovieInfo />
                                </div>
                                <Button onClick={handleClick} className="my-button">
                                    Trailer
                                </Button>
                            </div>
                        </Card>
                    </li>
                    <li>
                        <Card className="movie">
                            <figure>
                                <img src="./assets/image-4.jpg" alt="" />
                            </figure>
                            <div className="card--text">
                                <div>
                                    <h3>Movie Title</h3>
                                    <MovieInfo />
                                </div>
                                <Button onClick={handleClick} className="my-button">
                                    Trailer
                                </Button>
                            </div>
                        </Card>
                    </li>
                    <li>
                        <Card className="movie">
                            <figure>
                                <img src="./assets/image-4.jpg" alt="" />
                            </figure>
                            <div className="card--text">
                                <div>
                                    <h3>Movie Title</h3>
                                    <MovieInfo />
                                </div>
                                <Button onClick={handleClick} className="my-button">
                                    Trailer
                                </Button>
                            </div>
                        </Card>
                    </li>
                    <li>
                        <Card className="movie">
                            <figure>
                                <img src="./assets/image-4.jpg" alt="" />
                            </figure>
                            <div className="card--text">
                                <div>
                                    <h3>Movie Title</h3>
                                    <MovieInfo />
                                </div>
                                <Button onClick={handleClick} className="my-button">
                                    Trailer
                                </Button>
                            </div>
                        </Card>
                    </li>
                </ul>
            </div>
        </section>
     );
}
 
export default InTheaters;