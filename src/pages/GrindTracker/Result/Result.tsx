import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatTime } from "../../../helpers/formatTime";

import "./Result.css";
import { BdolyticsGrindspotResponse } from "../../../types/Bdolytics/Grindspot";
import { useBdolyticsAPI } from "../../../hooks/useBdolyticsApi";

const Result = () => {
    const { grindspotid, id, timer } = useParams();
    const { getGrindspot } = useBdolyticsAPI();
    const [grindspot, setGrindspot] = React.useState<BdolyticsGrindspotResponse>();
    const navigate = useNavigate();


    React.useEffect(() => {
        getGrindspot(parseInt(grindspotid!)).then((response) => {
            setGrindspot(response);
        });
    }, [])
    return (
        <div className="result-container">
            <h1>Result</h1>
            <p>Grindspot: {grindspotid}</p>
            <p>Id: {id}</p>
            <p>Timer: {formatTime(parseInt(timer!))}</p>
            <button onClick={() => navigate(`/tracker/${grindspotid}/${id}?time=${timer}`)}>Back</button>
            {/* ask for character, drop items (image (in bracelets price (editable))) and next to it input for amount */}
            {/* back and save button */}
            {/* when presses save close window */}
            {/* make a redux store for grindreports */}
        </div>
    )
}

export default Result;