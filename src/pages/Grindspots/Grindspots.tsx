import React from "react";
import "./Grindspots.css";
import { useNavigate } from "react-router-dom";

function GrindSpots() {
    const navigate = useNavigate()
    return (
        <div className="grindspots-container">
            <p>GrindSpots</p>
            <button onClick={() => navigate("/grindspot/71")}>GOTO 71</button>
            <button onClick={() => navigate("/grindspot/61")}>GOTO 61</button>
        </div>
    )
}

export default GrindSpots;
