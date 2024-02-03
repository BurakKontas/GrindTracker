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

    return (
        <div className="tracker-container">
            <h1 className="tracker-title">{grindspot?.data.name}</h1>
            <p className="tracker-timer">Timer: <span className="tracker-timer-time">{formatTime(timer)}</span></p>
            <div className="tracker-button-container">
                <button onClick={() => {
                    navigate(`/startup/${grindspotid}/${id}`);
                    setTimer(0);
                    setIsRunning(false)
                }}>Back</button>
                <button onClick={() => setIsRunning(prev => !prev)}>{(isRunning) ? "Stop" : "Start"}</button>
                <button onClick={() => navigate(`/result/${grindspotid}/${id}/${timer}`)}>Finish</button>
            </div>
        </div>
    );
};

export default Tracker;
