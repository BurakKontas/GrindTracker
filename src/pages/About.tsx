import React from "react";
import "./Homepage/Homepage.css";
import { useNavigate } from "react-router-dom";

function About() {
    const navigate = useNavigate();

    const navigateToIndex = () => navigate("/");
    return (
        <div className="homepage-container">
            <p>About</p>
            <button onClick={navigateToIndex}>Navigate to Home</button>
        </div>
    )
}

export default About;
