import React from 'react'
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {

    const navigate = useNavigate();
    
    const LandPage= () => {
        navigate('/');
    };

  return(
    <div class="home" align="center">
        <h2>404 error Page Not Found</h2>
        <pre>The page you are looking for could not be found.</pre>
        <pre>Click the button below to go to the main page</pre>
        <button onClick={LandPage}>Landing Page</button>
    </div>
  )
}

export  default NotFound