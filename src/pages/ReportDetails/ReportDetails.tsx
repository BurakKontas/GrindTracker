import React from "react";
import { useNavigate, useParams } from 'react-router-dom';

import "./ReportDetails.css";


function ReportDetails() {
    const { id } = useParams();
    const navigate = useNavigate()

    return (
        <div className="reportdetails-container">
        </div>
    )
}

export default ReportDetails;
