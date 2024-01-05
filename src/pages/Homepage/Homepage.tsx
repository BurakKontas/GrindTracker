import React from "react";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();  
  
  const navigateToAbout = () => navigate("/about");
  return (
    <div className="homepage-container">
      <p>Hello Worldsss</p>
      <button onClick={navigateToAbout}>Navigate to About</button>
    </div>
  )
}

export default Homepage;
