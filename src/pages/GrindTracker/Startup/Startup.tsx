import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./Startup.css";
import { getDefaultCharacter } from "../../../redux/Settings/slice";
import { useAppSelector } from "../../../redux/hooks";
import { BdolyticsGrindspotResponse } from "../../../types/Bdolytics/Grindspot";
import { useBdolyticsAPI } from "../../../hooks/useBdolyticsApi";
import { DropItem } from "../../../components/dropitem/DropItem";
import { BdolyticsTooltipTypes } from "../../../types/Bdolytics/TooltipTypes";

const Startup = () => {
    const { grindspotid, id } = useParams();
    const { getGrindspot, getImage } = useBdolyticsAPI();
    const navigate = useNavigate();
    const defaultCharacter = useAppSelector(getDefaultCharacter)
    const [grindspot, setGrindspot] = React.useState<BdolyticsGrindspotResponse>();
    const [image, setImage] = React.useState<string>("")


    React.useEffect(() => {
        async function fetchGrindspot() {
            const response = await getGrindspot(parseInt(grindspotid!));
            setGrindspot(response!);
        }
        fetchGrindspot()
    }, [grindspotid]);

    React.useEffect(() => {
        const fetchImage = async () => {
            const cachedImage = sessionStorage.getItem(`image_${grindspot?.data.icon_image}`);
            if (cachedImage) {
                setImage(cachedImage);
            } else {
                // Resmi al ve önbellekte sakla
                const response = await getImage(grindspot!.data.icon_image);
                sessionStorage.setItem(`image_${grindspot?.data.icon_image}`, response!);
                setImage(response!);
            }
        };

        fetchImage();
    }, [grindspot]);

    if(!grindspot) return <div>Loading...</div>
    return (
        <div className="startup-container" id="header">
            <button onClick={() => navigate("/")} className="startup-button">Back</button>
            <div className="startup-grindspot-detail">
                <img src={image} style={{ width: 100, height: 100 }} alt={grindspot!.data.name} />
                <p style={{textAlign:"center"}}>
                    {grindspot!.data.name}
                    <br />
                    <span style={{ color: (defaultCharacter.ap > grindspot!.data.ap + 10) ? "#00af00" : (defaultCharacter.ap < grindspot!.data.ap - 10) ? "#b00000" : "#fff" }}>
                        AP: {grindspot!.data.ap}
                    </span>
                    <br />
                    <span style={{ color: (defaultCharacter.dp > grindspot!.data.dp + 20) ? "#00af00" : (defaultCharacter.dp < grindspot!.data.dp - 20) ? "#b00000" : "#fff" }}>
                        DP: {grindspot!.data.dp}
                    </span>
                </p>
            </div>
            <div style={{ marginBottom: 15}} className="startup-grindspot-drops">
                {grindspot!.data.items_at_grindspot.map((item) => {
                    let drop = {
                        id: item.id,
                        name: item.name,
                        image: item.icon_image,
                        grade_type: item.grade_type
                    }
                    return (
                        <DropItem drop={drop} type={BdolyticsTooltipTypes.ITEM} key={item.id} />
                    )
                })}
            </div>
            <div>Varsa önceki saatlik gümüş istatistikleri</div>
            <button style={{ alignSelf: "center", marginTop: 15 }} className="startup-button">Start</button>
        </div>
    )
}

export default Startup;