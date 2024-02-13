import React from "react";
import GettingStarted from "./GettingStarted";
import Hotkeys from "./Hotkeys";

import "./Help.css";

export function HelpSection({children, title, subtitle}: {children: React.ReactNode, title: string, subtitle?: string}) {
    return (
        <div className="helpsection-container">
            <div className="helpsection-left">
                <h2 className="helpsection-title">{title}</h2>
                {subtitle && <p className="helpsection-subtitle">{subtitle}</p>}
            </div>
            <div className="helpsection-right">
                {children}
            </div>
        </div>
    );
}

function HelpHeader() {
    return (
        <div className="help-header-container">
            <h1>Help</h1>
            <p>Manage your account settings and preferences.</p>
        </div>
    )
}

function Help() {
    return (
        <div className="help-container">
        <HelpHeader />
        <div className="divider" />
            <Hotkeys />
            {/* <div className="divider" />
            <GettingStarted /> */}
            {/* <div className="divider" /> */}
            {/* FAQ ? */}
        </div>
    );
}

export default Help;