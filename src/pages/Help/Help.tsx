import React from "react";
import { OverwolfGetHotkeysResult, useOverwolf } from "../../hooks/useOverwolf";

import "./Help.css";

function HelpSection({children, title, subtitle}: {children: React.ReactNode, title: string, subtitle?: string}) {
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

function Help() {
    const { getHotkeys } = useOverwolf();
    const [hotkeys, setHotkeys] = React.useState<OverwolfGetHotkeysResult[]>([]);

    React.useEffect(() => {
        async function init() {
            const hotkeys = await getHotkeys();
            setHotkeys(hotkeys);
        }
        init()
    },[])

    return (
        <div>
            <div>
                <HelpSection title="Shortcuts" subtitle="This section contains shortcuts to use app efficiently">
                    <div>
                        {hotkeys.map((hotkey) => {
                            return (
                                <p>
                                    <span className="help-shortcuts-hotkey">{hotkey.binding}</span>{" "}{hotkey.title}
                                    <a href={"overwolf://settings/games-overlay?hotkey="+hotkey.name}>Edit</a>
                                </p>
                            )
                        })}
                    </div>
                </HelpSection>
            </div>
            <div>
                {/* Getting Started */}
            </div>
            <div>
                {/* FAQ */}
            </div>
            <div>
                {/* Contact */}
            </div>
        </div>
    );
}

export default Help;