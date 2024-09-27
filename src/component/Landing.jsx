import React from 'react'
import styles from './Landing.module.css';
import { useNavigate } from 'react-router-dom';

export const Landing = () => {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/home');
    };

  return (
    <div class="home" align="center">
         <h1 class="homeh1">
                Organize your work
            </h1>
            <h1>
                and life, finally.
            </h1>
            <pre class="homepre">
                Simplify your life for both you and your team, with the help 
            </pre>
            <pre class="homepre">
            of a to-do list tracker website.
            </pre>
            <form action="">
                <button onClick={handleButtonClick} class="homebutton ">Start</button>
            </form>
    </div>
)
};

export default Landing