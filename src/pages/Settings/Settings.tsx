import React, { Dispatch, SetStateAction } from 'react';

import ProfileTab from './Tabs/Profile';
import SettingsTab from './Tabs/Settings';
import CreditsTab from './Tabs/Credits';
import AboutDeveloperTab from './Tabs/AboutDeveloper';

import "./Settings.css";

function SettingsHeader() {
    return (
        <div className="settings-header-container">
            <h1>Settings</h1>
            <p>Manage your account settings and preferences.</p>
        </div>
    )

}

function Settings() {
    return (
        <div className="settings-container">
            <SettingsHeader />
            <div className="divider" />
            <ProfileTab />
            <div className="divider" />
            <SettingsTab />
            <div className="divider" />
            <CreditsTab />
            <div className="divider" />
            <AboutDeveloperTab />
            <div style={{ paddingBottom: 30 }}></div>
        </div>
    )
}

export default Settings;

//TODO: Tabbar for each ? settings
/*
    ? Add Profile Settings (overwolf based)
    ? Add settings for:
        ** Region (NAEU default)
        ** Level AP DP Class (Witch, Wizard, etc.) 
        ! Theme (Dark, Light)
    ? Icons credits and Bdolytics credits
    ? About Developer
*/