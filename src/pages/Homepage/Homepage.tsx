import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { test, testSelector } from "../../redux/Bdolytics/slice";

import "./Homepage.css";
import { updateReportProps, updateReporting } from "../../redux/Reports/slice";

function Homepage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    navigate("/summary")
    //@ts-ignore
    window.overwolf.windows.onMessageReceived.addListener((message) => {
      if(message.id === "result") {
        console.log(message.content);
        dispatch(updateReportProps({
          grindspotId: message.content.grindspotid,
          time: message.content.time,
          id: message.content.id
        }))
        dispatch(updateReporting(true));
        navigate("/report");
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
