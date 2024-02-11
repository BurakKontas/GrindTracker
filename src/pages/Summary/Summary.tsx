import React from "react";
import TotalHoursPie from "./TotalHoursPie";
import TotalSilverByZoneBar from "./TotalSilverByZoneBar";
import TotalSilverByZoneHourBar from "./TotalSilverByZoneHourBar";

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

import "./Summary.css";
import LastReports from "./LastReports";
import { useAppSelector } from "../../redux/hooks";
import { getReportCount } from "../../redux/Reports/slice";

function Summary() {
    const reportCount = useAppSelector(getReportCount)
    if(reportCount === 0) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                height: "100vh",
            }}>
                <h1>No reports to show</h1>
            </div>
        )
    }
    return (
        <div className="summary-container">
            <div className="summary-info-container">

            </div>
            <div className="summary-graphs">
                <div className="summary-graph-pie">
                    <TotalHoursPie />
                </div>
                <div style={{
                    gap: 10,
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <div className="summary-graph-totalsilverbyzone-bar">
                        <TotalSilverByZoneBar />
                    </div>
                    <div className="summary-graph-totalsilverbyzone-bar">
                        <TotalSilverByZoneHourBar />
                    </div>
                </div>
            </div>
            <div className="summary-last-reports">
                <LastReports />
            </div>
            <div style={{marginBottom: 20}}></div>
        </div>
    )
}

export default Summary;