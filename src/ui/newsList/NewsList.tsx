import { Col, Container, Row } from "react-bootstrap";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NewsList = () => {
    return ( 
        <div className="newsList">
            <Container>
                <SectionTitle title="Top news" icon={faGlobe} />
                <ul className="news-items">
                    <li className="news-item">
                        <Link to="/">
                            <Row>
                                <Col md={3}>
                                    <figure>
                                        <img src="./assets/image-10.png" alt="" />
                                    </figure>
                                </Col>
                                <Col md={9}>
                                    <div className="news-body">
                                    <h3>An Interesting news title</h3>
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum ipsa, vitae cupiditate sunt nulla natus dignissimos? Quod provident ipsam nam voluptatem quia accusamus, incidunt ullam itaque temporibus accusantium ratione velit. elit. Facilis enim deserunt qui vitae eum, nemo eos non illo modi cumque dolorum sequi perferendis praesentium cupiditate quos, dolores iusto quasi voluptatem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem corporis error fuga non exercitationem, eligendi nostrum aut ea! Perferendis consequuntur esse itaque, ipsam architecto illo quibusdam! Quos eligendi consequuntur harum!</p>
                                    </div>
                                </Col>
                            </Row>
                        </Link>
                    </li>
                    <li className="news-item">
                        <Link to="/">
                            <Row>
                                <Col md={3}>
                                    <figure>
                                        <img src="./assets/image-10.png" alt="" />
                                    </figure>
                                </Col>
                                <Col md={9}>
                                    <div className="news-body">
                                    <h3>An Interesting news title</h3>
                                    <p>Lorem ipsum dolor, sit amet consectetur  provident ipsam nam voluptatem quia accusamus, incidunt ullam itaque temporibus accusantium ratione velit. elit. Facilis enim deserunt qui vitae eum, nemo eos non illo modi cumque dolorum sequi perferendis praesentium cupiditate quos, dolores iusto quasi voluptatem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem corporis error fuga non exercitationem, eligendi nostrum aut ea! Perferendis consequuntur esse itaque, ipsam architecto illo quibusdam! Quos eligendi consequuntur harum!</p>
                                    </div>
                                </Col>
                            </Row>
                        </Link>
                    </li>
                    <li className="news-item">
                        <Link to="/">
                            <Row>
                                <Col md={3}>
                                    <figure>
                                        <img src="./assets/image-10.png" alt="" />
                                    </figure>
                                </Col>
                                <Col md={9}>
                                    <div className="news-body">
                                    <h3>An Interesting news title</h3>
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum ipsa, vitae cupiditate sunt nulla natus dignissimos? Quod provident ipsam nam voluptatem quia accusamus, incidunt ullam itaque temporibus accusantium ratione velit. elit. Facilis enim deserunt qui vitae eum, nemo eos non illo modi cumque dolorum sequi perferendis praesentium cupiditate quos, dolores iusto quasi voluptatem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem corporis error fuga non exercitationem, eligendi nostrum aut ea! Perferendis consequuntur esse itaque, ipsam architecto illo quibusdam! Quos eligendi consequuntur harum!</p>
                                    </div>
                                </Col>
                            </Row>
                        </Link>
                    </li>
                    <li className="news-item">
                        <Link to="/">
                            <Row>
                                <Col md={3}>
                                    <figure>
                                        <img src="./assets/image-10.png" alt="" />
                                    </figure>
                                </Col>
                                <Col md={9}>
                                    <div className="news-body">
                                    <h3>An Interesting news title</h3>
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum ipsa, vitae cupiditate sunt nulla natus dignissimos? Quod provident ipsam nam voluptatem quia accusamus, incidunt ullam itaque temporibus accusantium ratione velit. elit. Facilis enim deserunt qui vitae eum, nemo eos non illo modi cumque dolorum sequi perferendis praesentium cupiditate quos, dolores iusto quasi voluptatem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem corporis error fuga non exercitationem, eligendi nostrum aut ea! Perferendis consequuntur esse itaque, ipsam architecto illo quibusdam! Quos eligendi consequuntur harum!</p>
                                    </div>
                                </Col>
                            </Row>
                        </Link>
                    </li>
                </ul>
            </Container>
        </div>
     );
}
 
export default NewsList;