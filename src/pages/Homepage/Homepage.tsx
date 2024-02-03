import React from "react";
import { useNavigate } from "react-router-dom";

import "./Homepage.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { test, testSelector } from "../../redux/Bdolytics/slice";

function Homepage() {
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log(window)
  }, [])

  return (
    <div className="homepage-container">
      <p>Homepage</p>
    </div>
  );
}

export default Homepage;
