import React from "react";
import { useParams } from "react-router-dom";

import "./Startup.css";
import { getDefaultCharacter } from "../../../redux/Settings/slice";
import { useAppSelector } from "../../../redux/hooks";
import { BdolyticsGrindspotResponse } from "../../../types/Bdolytics/Grindspot";
import { useBdolyticsAPI } from "../../../hooks/useBdolyticsApi";

const Startup = () => {
    const { grindspotid, id } = useParams();
    const { getGrindspot } = useBdolyticsAPI();
    const defaultCharacter = useAppSelector(getDefaultCharacter)
    const [grindspot, setGrindspot] = React.useState<BdolyticsGrindspotResponse>();

    React.useEffect(() => {
        async function fetchGrindspot() {
            const response = await getGrindspot(parseInt(grindspotid!));
            setGrindspot(response);
        }
        fetchGrindspot()
    }, [grindspotid]);

    return (
        <div className="startup-container">
            <button>Back</button>
            <div>Grindspot Details</div>
            <div>Drop Items</div>
            <div>Varsa önceki saatlik gümüş istatistikleri</div>
            <button>Start</button>
        </div>
    )
}

export default Startup;