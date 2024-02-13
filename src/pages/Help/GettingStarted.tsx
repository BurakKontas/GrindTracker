import React from "react";
import { Galleria } from 'primereact/galleria';
import { GettingStartedGalleryData, GettingStartedGalleryDataImage } from "./Gallery";
import { HelpSection } from "./Help";

import "./Help.css";


const GettingStarted = () => {
    const gallery = React.useRef(null);
    const [activeTopic, setActiveTopic] = React.useState("how_to_use_grindtracker_app");

    const itemTemplate = (item: GettingStartedGalleryDataImage[0]) => {
        return <img src={item.src} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    }

    React.useEffect(() => {
        // @ts-ignore
        gallery.current.show();
        // @ts-ignore
        gallery.current.hide();
    }, [])
    const openGallery = (topic: string) => {
        setActiveTopic(topic);
        // @ts-ignore
        gallery.current.show();
    }

    const caption = (item: GettingStartedGalleryDataImage[0]) => {
        return (
            <React.Fragment>
                <div className="text-xl mb-2 font-bold">{item.title}</div>
                <p className="text-white">{item.alt}</p>
            </React.Fragment>
        );
    }

    return (
        <div>
            <div>
                <div className="help-section-container">
                    <HelpSection title="Getting Started" subtitle="An introduction to using the app efficiently. (Click on each topic to begin)">
                        <div className="help-gettingstarted-buttons">
                            <button onClick={() => openGallery('how_to_use_grindtracker_app')}>How to use GrindTracker?</button>
                            <button onClick={() => openGallery('how_to_addchange_default_character')}>How to add/change the default character?</button>
                            <button onClick={() => openGallery('how_to_check_grindspot_statistics')}>How to check grindspot statistics?</button>
                            <button onClick={() => openGallery('how_to_check_grindspot_item_drop_rates_per_hour')}>How to check grindspot item drop rates per hour?</button>
                            <button onClick={() => openGallery('how_to_correct_wrong_report_data')}>How to correct wrong report data?</button>
                            <button onClick={() => openGallery('how_to_change_hotkeys')}>How to change hotkeys?</button>

                        </div>
                    </HelpSection>
                </div>
            </div>
            <div className="card">
                {/* @ts-ignore */}
                <Galleria ref={gallery} value={GettingStartedGalleryData.images[activeTopic] || []} style={{ maxWidth: '80%', maxHeight: '95%' }}
                    circular fullScreen showItemNavigators showItemNavigatorsOnHover showIndicators showThumbnails={false} caption={caption} item={itemTemplate}
                />
            </div>
        </div>
    );
}

export default GettingStarted;
