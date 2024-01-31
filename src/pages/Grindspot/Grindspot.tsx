import React from "react";
import { useParams } from 'react-router-dom';

import "./Grindspot.css";

function GrindSpot() {
    const { id } = useParams();
    return (
        <div className="grindspots-container">
            <p>GrindSpot</p>
            <p>{id}</p>
        </div>
    )
}

export default GrindSpot;
