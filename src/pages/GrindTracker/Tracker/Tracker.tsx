import React from "react";
import { useParams } from "react-router-dom";

import "./Tracker.css";

const Trakcer = () => {
    const { grindspotid, id } = useParams();

    return (
        <div className="tracker-container">
            <h1>Trakcer</h1>
            <p>Grindspot: {grindspotid}</p>
            <p>Id: {id}</p>
        </div>
    )
}

export default Trakcer;