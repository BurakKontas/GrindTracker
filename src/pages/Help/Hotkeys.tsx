// ShortcutsSection.tsx
import React from "react";
import { OverwolfGetHotkeysResult, useOverwolf } from "../../hooks/useOverwolf";
import { HelpSection } from "./Help";


const Hotkeys = () => {
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
        <div className="help-section-container">
            <HelpSection title="Shortcuts" subtitle="This section provides essential shortcuts for optimizing app usage. (Click on each shortcut to customize)">
                <div>
                    {hotkeys.map((hotkey) => {
                        return (
                            <p className="shortcut-item" key={hotkey.name}>
                                <a href={`overwolf://settings/games-overlay?hotkey=${hotkey.name}`} className="shortcut-key">{hotkey.binding}</a>{" "}
                                <span className="shortcut-title">{hotkey.title}</span>{" "}
                            </p>
                        )
                    })}
                </div>
            </HelpSection>
        </div>
    );
}

export default Hotkeys;
