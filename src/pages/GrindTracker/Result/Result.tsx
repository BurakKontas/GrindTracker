import React from "react";
import { useParams } from "react-router-dom";

import "./Result.css";

const Result = () => {
    const { grindspotid, id, timer } = useParams();

    return (
        <div className="result-container">
            <h1>Result</h1>
            <p>Grindspot: {grindspotid}</p>
            <p>Id: {id}</p>
            <p>Timer: {timer}</p>
        </div>
    )
}

export default Result;