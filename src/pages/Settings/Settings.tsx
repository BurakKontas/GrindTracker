import React, { Dispatch, SetStateAction } from 'react';

import ProfileTab from './Tabs/Profile';
import SettingsTab from './Tabs/Settings';
import CreditsTab from './Tabs/Credits';
import AboutDeveloperTab from './Tabs/AboutDeveloper';

import "./Settings.css";
import { useBdolyticsAPI } from '../../hooks/useBdolyticsApi';

const Tabs = {
    "profile": () => <ProfileTab />,
    "settings": () => <SettingsTab />,
    "credits": () => <CreditsTab />,
    "aboutDeveloper": () => <AboutDeveloperTab />
}


type Tab = {
    name: string;
    label: string;
};

type TabBarButtonsProps = {
    activeTab: number;
    setActiveTab: Dispatch<SetStateAction<number>>;
};

function TabBarButtons({ activeTab, setActiveTab }: TabBarButtonsProps) {
    const tabs: Tab[] = [
        { name: "profile", label: "Profile" },
        { name: "settings", label: "Settings" },
        { name: "credits", label: "Credits" },
        { name: "aboutDeveloper", label: "About Developer" }
    ];

    return (
        <div className="settings-tabbar-container">
            {tabs.map((tab, index) => (
                <button key={index} className={`tabbar-button ${activeTab === index ? "active" : ""}`} onClick={() => setActiveTab(index)}>
                    {tab.label}
                </button>
            ))}
        </div>
    );
}

function SettingsHeader() {
    return (
        <div className="settings-header-container">
            <h1>Settings</h1>
            <p>Manage your account settings and preferences.</p>
        </div>
    )

}

function Settings() {
    const [activeTab, setActiveTab] = React.useState(1);
    const [image, setImage] = React.useState<string | undefined>(undefined);
    const { getGrindspots, getImage } = useBdolyticsAPI()

    React.useEffect(() => {
        async function init() {
            // let grindspots = await getGrindspots()
            // let imageURL = grindspots?.data[0].icon_image!
            // let imageBase64 = await getImage(imageURL)
        }
        init()
    }, [])

    return (
        <div className="settings-container">
 
            <SettingsHeader />
            <div className="divider" />
            <ProfileTab />
            <div className="divider" />
            <SettingsTab />
            <div className="divider" />
            <CreditsTab />
            {/* <div className="divider" />
            <AboutDeveloperTab /> */}
            <div style={{ marginBottom: 30 }} />
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