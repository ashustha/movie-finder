import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";

const Watchlist = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
          try {
            // Make a request to the server to check the authentication status
            const response = await axios.get('http://localhost:3000/api/check-authentication', {
              withCredentials: true // Include credentials (cookies) with the request
            });
            console.log(response.data); 
            // Check if the response contains a valid authentication status
            if (response.data && response.data.isLoggedIn !== undefined) {
              setIsLoggedIn(response.data.isLoggedIn);
            }
          } catch (error) {
            console.error('Error checking authentication:', error);
          }
        };
      
        checkAuthentication();
      }, []);

    return ( 
        <>
            {isLoggedIn ? (
                <div className="watchlist">
                    <Link className="addtoWatchlist" to='/'>+</Link>
                    <h3>Your Watchlist is Empty</h3>
                    <p>Add movies and shows to your Watchlist to keep track of what you want to watch.</p>
                    <Link to='/' className="btn btn-primary">Browse popular movies</Link>
                </div>
            )
                
            :
            (
                null
            )
            }
        </>
     );
}
 
export default Watchlist;