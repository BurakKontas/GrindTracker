import React, { useState, useEffect } from "react";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  const [componentWidth, setComponentWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setComponentWidth(document.getElementById("homepage-container")!.offsetWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigateToAbout = () => navigate("/about");

  return (
    <div className="homepage-container" id="homepage-container">
      <p>Hello Worldsss</p>
      <button onClick={navigateToAbout}>Navigate to About</button>
      <div>
        Component Width: {componentWidth}px
      </div>
    </div>
  );
}

export default Homepage;
