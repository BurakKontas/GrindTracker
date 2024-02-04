import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./Report.css";
import { useBdolyticsAPI } from "../../hooks/useBdolyticsApi";
import { BdolyticsGrindspotResponse } from "../../types/Bdolytics/Grindspot";
import { useAppSelector } from "../../redux/hooks";
import { getReportProps, isReporting } from "../../redux/Reports/slice";

function Report() {
    const navigate = useNavigate();
    const { getGrindspot } = useBdolyticsAPI();
    const [grindspot, setGrindspot] = React.useState<BdolyticsGrindspotResponse>();
    const result = useAppSelector(getReportProps)
    const isReport = useAppSelector(isReporting)

    React.useEffect(() => {
        if(!isReport) {
            navigate("/");
            return;
        }
        getGrindspot(result.grindspotId).then((response) => {
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
