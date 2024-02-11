import React from "react";
import { OverwolfGetHotkeysResult, useOverwolf } from "../../hooks/useOverwolf";
import GettingStarted from "./GettingStarted";

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
    const { getHotkeys } = useOverwolf();
    const [hotkeys, setHotkeys] = React.useState<OverwolfGetHotkeysResult[]>([]);
    const galleria = React.useRef(null);

    const [activeIndex, setActiveIndex] = React.useState(0);

    React.useEffect(() => {
        async function init() {
            const hotkeys = await getHotkeys();
            setHotkeys(hotkeys);
        }
        init()
    },[])

    return (
        <div className="help-container">
        <HelpHeader />
        <div className="divider" />
            <div className="help-section-container">
                <HelpSection title="Shortcuts" subtitle="This section provides essential shortcuts for optimizing app usage. (Click on each shortcut to customize)">
                    <div>
                        {hotkeys.map((hotkey) => {
                            return (
                                <p className="shortcut-item">
                                    <a href={`overwolf://settings/games-overlay?hotkey=${hotkey.name}`} className="shortcut-key">{hotkey.binding}</a>{" "}
                                    <span className="shortcut-title">{hotkey.title}</span>{" "}
                                </p>
                            )
                        })}
                    </div>
                </HelpSection>
            </div>
            <div className="divider" />
            <GettingStarted />
        </div>
    );
}

export default Help;