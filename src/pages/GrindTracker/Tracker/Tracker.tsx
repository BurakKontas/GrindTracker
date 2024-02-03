import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./Tracker.css";
import { useBdolyticsAPI } from "../../../hooks/useBdolyticsApi";
import { BdolyticsGrindspotResponse } from "../../../types/Bdolytics/Grindspot";
import { formatTime } from "../../../helpers/formatTime";

const Tracker = () => {
    const { grindspotid, id } = useParams();
    //get time from query if exists
    const [timer, setTimer] = React.useState(0);
    const { getGrindspot } = useBdolyticsAPI();
    const [grindspot, setGrindspot] = React.useState<BdolyticsGrindspotResponse>();
    const [isRunning, setIsRunning] = React.useState(true);
    const [isHovering, setIsHovering] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        const time = window.location.href.split("?time=")[1];
        if(isNaN(parseInt(time))) return;
        setTimer(parseInt(time));
        setIsRunning(false)
    }, []);

    React.useEffect(() => {
        getGrindspot(parseInt(grindspotid!)).then((response) => {
            setGrindspot(response);
        });
    }, [])

    React.useEffect(() => {
        const interval = setInterval(() => {
            if(!isRunning) return;
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isRunning]); 

    function finish() {
        // window.overwolf.windows.getWindow("app_window", (result) => {
        //@ts-ignore
        window.overwolf.windows.getWindow("desktop", (result) => {
            //@ts-ignore
            window.overwolf.windows.sendMessage(result.window.id, "result", { grindspotid, id, time: timer }, function (response) {
                //@ts-ignore
                window.overwolf.windows.getCurrentWindow((result) => {
                    //@ts-ignore
                    window.overwolf.windows.close(result.window.id);
                });
            });
        });

    }

    return (
        <div className="tracker-container" style={{
            backgroundColor: (isHovering) ? "rgba(51, 51, 51, 1)" : "rgba(51, 51, 51, 0.01)",
            transition: "background-color 0.3s ease"
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        >
            <h1 className="tracker-title" style={{ opacity: (isHovering) ? 1 : 0, transition: "opacity 0.3s ease" }} >{grindspot?.data.name}</h1>
            <p className="tracker-timer">Timer: <span className="tracker-timer-time">{formatTime(timer)}</span></p>
            <div className="tracker-button-container">
                <button style={{
                    opacity: (isHovering) ? 1 : 0, transition: "opacity 0.3s ease" }} onClick={() => {
                    navigate(`/startup/${grindspotid}/${id}`);
                    setTimer(0);
                    setIsRunning(false)
                }}>Back</button>
                <button style={{ opacity: (isHovering) ? 1 : 0, transition: "opacity 0.3s ease" }} onClick={() => setIsRunning(prev => !prev)}>{(isRunning) ? "Stop" : "Start"}</button>
                <button style={{ opacity: (isHovering) ? 1 : 0, transition: "opacity 0.3s ease" }} onClick={finish}>Finish</button>
            </div>
        </div>
    );
};

export default Tracker;
