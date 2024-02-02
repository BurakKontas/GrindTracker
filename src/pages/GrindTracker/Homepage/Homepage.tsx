import React from "react";
import { useBdolyticsAPI } from "../../../hooks/useBdolyticsApi";
import { BdolyticsGrindspotsResponse, Grindspot } from "../../../types/Bdolytics/Grindspots";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { getDefaultCharacter } from "../../../redux/Settings/slice";

import "./Homepage.css";

function Homepage() {
    const { getGrindspots, getImage } = useBdolyticsAPI();
    const defaultCharacter = useAppSelector(getDefaultCharacter)
    const navigate = useNavigate();
    
    const [grindspots, setGrindspots] = React.useState<BdolyticsGrindspotsResponse>();
    const [search, setSearch] = React.useState("");
    const [uuid, _] = React.useState<string>(uuidv4());

    React.useEffect(() => {
        console.log("fetching grindspots")
        const fetchGrindspots = async () => {
            const response = await getGrindspots();
            setGrindspots(response!);
            console.log(response)
        }
        fetchGrindspots();
    }, []);

    function GrindSpot({ grindspot }: { grindspot: Grindspot}) {
        const [image, setImage] = React.useState<string>("")

        React.useEffect(() => {
            const fetchImage = async () => {
                const cachedImage = sessionStorage.getItem(`image_${grindspot.icon_image}`);
                if (cachedImage) {
                    setImage(cachedImage);
                } else {
                    // Resmi al ve önbellekte sakla
                    const response = await getImage(grindspot.icon_image);
                    console.log("response sent")
                    sessionStorage.setItem(`image_${grindspot.icon_image}`, response!);
                    setImage(response!);
                }
            };

            fetchImage();
        }, [grindspot.icon_image, getImage]);

        return (
            <button key={grindspot.id} className="grindtracker-grindspot"
                onClick={() => navigate(`/startup/${grindspot.id}/${uuid}`)}
            >
                <img src={image} style={{ width: 40, height: 40 }} alt={grindspot.name} />
                <p>
                    {grindspot.name}
                    <br />
                    <span style={{ color: (defaultCharacter.ap > grindspot.ap + 10) ? "#00af00" : (defaultCharacter.ap < grindspot.ap - 10) ? "#b00000" : "#fff" }}>
                        AP: {grindspot.ap}
                    </span>
                    <br />
                    <span style={{ color: (defaultCharacter.dp > grindspot.dp + 20) ? "#00af00" : (defaultCharacter.dp < grindspot.dp - 20) ? "#b00000" : "#fff" }}>
                        DP: {grindspot.dp}
                    </span>
                </p>
            </button>
        )
    }

    return (
        <div className="grindtracker-container">
            <input 
                className="grindtracker-search"
                type="text" 
                id="search" 
                name="search" 
                placeholder="Search for Grindspot"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="grindtracker-grindspots">
                {grindspots?.data.map((grindspot) => {
                    if (grindspot.name.toLowerCase().includes(search.toLowerCase())) {
                        return <GrindSpot grindspot={grindspot} />
                    }
                })
                }
            </div>
        </div>
    )
}

export default Homepage;
