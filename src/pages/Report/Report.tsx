import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./Report.css";
import { useBdolyticsAPI } from "../../hooks/useBdolyticsApi";
import { BdolyticsGrindspotResponse } from "../../types/Bdolytics/Grindspot";

function Report() {
    const navigate = useNavigate();
    const location = useLocation();
    const result = location.state;
    const { getGrindspot } = useBdolyticsAPI();
    const [grindspot, setGrindspot] = React.useState<BdolyticsGrindspotResponse>();

    React.useEffect(() => {
        if(!result) {
            navigate("/");
            return;
        }
        getGrindspot(result.grindspotid).then((response) => {
            setGrindspot(response);
        });
    }, [result])

    React.useEffect(() => {
        //@ts-ignore
        // window.overwolf.windows.getWindow("app_window", (result) => {
        window.overwolf.windows.getWindow("desktop", (result) => {
            //@ts-ignore
            window.overwolf.windows.restore(result.window.id);
        });
    }, [])

    // Report eklenince homepage yada grind summary sayfasına atacak

    return (
        <div className="report-container">
            <p>Report</p>
        </div>
    );
}

export default Report;
