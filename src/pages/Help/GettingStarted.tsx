import React from "react";
import Modal from '@mui/material/Modal';
import { Galleria } from 'primereact/galleria';
import { GettingStartedGalleryDataImages, GettingStartedGalleryDataImage, GettingStartedGalleryData } from "./Gallery";

import "./Help.css";
import { HelpSection } from "./Help";


const GettingStarted = () => {
    const gallery = React.useRef(null);
    const [activeIndex, setActiveIndex] = React.useState(0);

    const itemTemplate = (item: GettingStartedGalleryDataImage) => {
        return <img src={item.src} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    }

    const openGallery = (index: number) => {
        setActiveIndex(index);
        // @ts-ignore
        gallery.current.show();
    }

    const caption = (item: GettingStartedGalleryDataImage) => {
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
                            <button onClick={() => openGallery(0)}>How to use GrindTracker?</button>
                            <button onClick={() => openGallery(0)}>How to add/change the default character?</button>
                            <button onClick={() => openGallery(0)}>How to check grindspot statistics?</button>
                            <button onClick={() => openGallery(0)}>How to check grindspot item drop rates per hour?</button>
                            <button onClick={() => openGallery(0)}>How to correct wrong report data?</button>
                        </div>
                    </HelpSection>
                </div>
            </div>
            <div className="card">
                <Galleria ref={gallery} value={GettingStartedGalleryData.images[activeIndex]} style={{ maxWidth: '80%', maxHeight: '95%' }}
                    circular fullScreen showItemNavigators showItemNavigatorsOnHover showIndicators showThumbnails={false} caption={caption} item={itemTemplate}
                    />
            </div>
        </div>
    );
}

export default GettingStarted;
