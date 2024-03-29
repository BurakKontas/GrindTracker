
import React from "react";

import "./global.css";
import { useOverwolf } from "../../../hooks/useOverwolf";

function CreditsTab() {
    const { openUrlInDefaultBrowser } = useOverwolf();

    return (
        <div className="credits-tab-container">
            <div className="credits-tab-container-header">
                <h1>Credits</h1>
                <p>Icons, API's and other resources</p>
                <p>used in this project.</p>
            </div>
            <div>
                <p>Icons by <a
                    onClick={(e) => {
                        e.preventDefault();
                        openUrlInDefaultBrowser("https://icons8.com/");
                    }}
                href="https://icons8.com/">Icons8</a></p>
                <p>API by <a 
                    onClick={(e) => {
                        e.preventDefault();
                        openUrlInDefaultBrowser("https://bdolytics.com/en/NA");
                    }}
                href="https://bdolytics.com/en/NA">Bdolytics</a></p>
            </div>
        </div>
    )
}

export default CreditsTab;