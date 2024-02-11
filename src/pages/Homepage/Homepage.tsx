import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { test, testSelector } from "../../redux/Bdolytics/slice";

import "./Homepage.css";
import { updateReportProps, updateReporting } from "../../redux/Reports/slice";
import { useOverwolf } from "../../hooks/useOverwolf";

//only used for listenings etc.
function Homepage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { onMessageReceived, getCurrentWindow, closeWindow } = useOverwolf();


  React.useEffect(() => {
    // navigate("/summary")
    navigate("/help")

    onMessageReceived((message) => {
      if (message.id === "result") {
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
  }, [])

  return (
    <></>
  );
}

export default Homepage;
