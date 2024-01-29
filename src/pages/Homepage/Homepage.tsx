import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <p>Homepage</p>
    </div>
  );
}

export default Homepage;
