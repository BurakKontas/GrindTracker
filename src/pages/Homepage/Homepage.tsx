import React from "react";
import { useNavigate } from "react-router-dom";

import "./Homepage.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { test, testSelector } from "../../redux/Bdolytics/slice";

function Homepage() {
  const navigate = useNavigate();

  React.useEffect(() => {
    //@ts-ignore
    window.overwolf.windows.onMessageReceived.addListener((message) => {
      if(message.id === "result") {
        navigate("/report", { state: message.content });
      }
    });
    return () => window.removeEventListener("storage", () => {});
  }, [])

  return (
    <div className="homepage-container">
      <p>Homepage</p>
    </div>
  );
}

export default Homepage;
