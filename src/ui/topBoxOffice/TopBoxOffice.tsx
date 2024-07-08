
import { Card } from "react-bootstrap";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import MovieInfo from "../../components/MovieInfo/MovieInfo";


const TopBoxOffice = () => {
    return ( 
        <>
            <div className="topBoxOffice">
                <SectionTitle icon={faCrown} title="Top Box Office" />
                <div className="topBoxOffice--wrapper">
                    <ul className="movieList">
                        <li>
                            <Card className="movie">
                                <figure>
                                    <img src="./assets/image-4.jpg" alt="" />
                                </figure>
                                <div className="card--text">
                                    <h3>Movie Title</h3>
                                    <ul>
                                        <li>
                                            <span>Total Gross :</span> $202,888
                                        </li>
                                        <li>
                                            <span>Weekly Gross :</span> $20,000
                                        </li>
                                        <li>
                                            <span>Weeks Released :</span> 4
                                        </li>
                                    </ul>
                                    <MovieInfo />
                                </div>
                            </Card>
                        </li>
                        <li>
                            <Card className="movie">
                                <figure>
                                    <img src="./assets/image-4.jpg" alt="" />
                                </figure>
                                <div className="card--text">
                                    <h3>Movie Title</h3>
                                    <ul>
                                        <li>
                                            <span>Total Gross :</span> $202,888
                                        </li>
                                        <li>
                                            <span>Weekly Gross :</span> $20,000
                                        </li>
                                        <li>
                                            <span>Weeks Released :</span> 4
                                        </li>
                                    </ul>
                                    <MovieInfo />
                                </div>
                            </Card>
                        </li>
                        <li>
                            <Card className="movie">
                                <figure>
                                    <img src="./assets/image-4.jpg" alt="" />
                                </figure>
                                <div className="card--text">
                                    <h3>Movie Title</h3>
                                    <ul>
                                        <li>
                                            <span>Total Gross :</span> $202,888
                                        </li>
                                        <li>
                                            <span>Weekly Gross :</span> $20,000
                                        </li>
                                        <li>
                                            <span>Weeks Released :</span> 4
                                        </li>
                                    </ul>
                                    <MovieInfo />
                                </div>
                            </Card>
                        </li>
                    </ul>
                </div>
            </div>
        </>
     );
}
 
export default TopBoxOffice;