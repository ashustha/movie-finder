import { Card, Col, Container, Dropdown, DropdownButton, Row } from "react-bootstrap";
import Layout from "../../layout";
import Watchlist from "../../ui/Watchlist/Watchlist";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../config";
import MovieCard from "../../components/MovieCard/movieCard";

interface FormData {
    oldPassword: string;
    newPassword: string;
  }

  interface Movie {
    movie_id:number;
    duration:number;
    title:string;
    year:string;
    average_rating:string;
    poster:string;
}

const Profile = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate();
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        const userId = getUserId();
        const storedUserDataJSON = localStorage.getItem('mfs-user');
        if (storedUserDataJSON !== null) {
            const storedUserData = JSON.parse(storedUserDataJSON);
            const capitalizedFullName = storedUserData.fullName.charAt(0).toUpperCase() + storedUserData.fullName.slice(1);
            const userEmail = storedUserData.email;
            setFullName(capitalizedFullName);
            setEmail(userEmail);
        }
         fetchWishlist(userId);
        fetchWatchlistStatus();
    }, []);

    const getUserId = () => {
        const storedUserDataJSON = localStorage.getItem('mfs-user');
        if (storedUserDataJSON !== null) {
            const storedUserData = JSON.parse(storedUserDataJSON);
            return storedUserData.id;
        }
        return null;
    }
    const fetchWishlist = async (userId) => {
        try {
          const response = await axios.get(`${baseUrl}/wishlist/${userId}`);
          setWishlist(response.data);
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      };

    const refetchWishlist = () => {
        const userId = getUserId();
        fetchWishlist(userId);
    }

    const changePassword = async (data:FormData)=>{
        const userId = getUserId(); 
        await axios.put(`${baseUrl}/change-password/${userId}`, data);
    }
    
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        const formData: FormData = {
            oldPassword: e.currentTarget.oldPassword.value.trim(),
            newPassword: e.currentTarget.newPassword.value.trim(),
          };

          // Check if passwords match
        const confirmPassword = e.currentTarget.confirmPassword.value;
        if (formData.newPassword !== confirmPassword) {
          alert("Passwords don't match");
          return;
        }
      
        // Validate password criteria
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
        if (!passwordRegex.test(formData.newPassword)) {
          alert('Password must be at least 6 characters long and contain at least one number and one special character.');
          return;
        }

        try {
            await changePassword(formData);
            alert('Password changed successfully');
            (e.target as HTMLFormElement).reset();
            navigate('/');
          } catch (error: unknown) {
              if (error instanceof Error && 'response' in error) {
                const response = error.response as { data?: { message?: string } }; 
                const errorMessage = response.data?.message || 'An unknown error occurred';
                alert(errorMessage);
              } else {
                alert('An unknown error occurred');
              }
            }    
      };

    const fetchWatchlistStatus = async () => {
        try {
          const userId = getUserId();
          const response = await axios.get(`${baseUrl}/wishlist/${userId}/status`);
          setSelectedStatus(response.data.is_public ? 'Public' : 'Private');
        } catch (error) {
          console.error('Error fetching watchlist status:', error);
        }
      };

    const handleStatusSelect = async (isPublic : boolean) => {
        console.log(isPublic)
        try {
            const userId = getUserId()
          await axios.put(`${baseUrl}/wishlist/${userId}/status`, { is_public: isPublic });
          setSelectedStatus(isPublic ? 'Public' : 'Private');
        } catch (error) {
          console.error('Error updating wishlist status:', error);
        }
      };

    return ( 
        <Layout>
            <Container>
                <SectionTitle title={`${fullName}`} icon={faUser}/>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                            <Nav.Link eventKey="first">Watchlist</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="second">Change Password</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                        <Col sm={9}>
                        <Tab.Content>   
                            <Tab.Pane eventKey="first">
                                {wishlist.length === 0  ? 
                                <Watchlist />  
                                :
                                <Row>
                                    <Card.Header>
                                        <h2>Your watchlist</h2>
                                        <DropdownButton id="dropdown-item-button" title={`Watchlist Status: ${selectedStatus}`}>
                                            <Dropdown.Item as="button" onClick={() => handleStatusSelect(true)}>Public</Dropdown.Item>
                                            <Dropdown.Item as="button" onClick={() => handleStatusSelect(false)}>Private</Dropdown.Item>
                                        </DropdownButton>
                                    </Card.Header>
                                    {wishlist.map((movie: Movie) => (
                                        <Col sm={6} md={3} key={movie.movie_id}>
                                            <MovieCard movie={movie} refetchWishlist={refetchWishlist} /> {/* Pass refetchWishlist */}
                                        </Col>
                                    ))}
                                </Row>
                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <div className="changePassword">
                                    <Form onSubmit={handleSubmit} autoComplete="off">
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                            <Form.Label column sm="2">
                                            Email
                                            </Form.Label>
                                            <Col sm="10">
                                            <Form.Control plaintext readOnly defaultValue={email} />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                            <Form.Label column sm="2">
                                            Old Password
                                            </Form.Label>
                                            <Col sm="10">
                                            <Form.Control  type="password"  autoComplete="off"  name="oldPassword" required placeholder="Old Password" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                            <Form.Label column sm="2">
                                            New Password
                                            </Form.Label>
                                            <Col sm="10">
                                            <Form.Control type="password" autoComplete="off" name="newPassword" required placeholder="New Password" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                            <Form.Label column sm="2">
                                            Confirm Password
                                            </Form.Label>
                                            <Col sm="10">
                                            <Form.Control type="password" autoComplete="off" name="confirmPassword" required placeholder="Confirm Password" />
                                            </Col>
                                        </Form.Group>
                                        <Button type="submit" className="btn btn-primary">
                                                Submit
                                            </Button>
                                    </Form>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </Layout>
     );
}
 
export default Profile;
