import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./Startup.css";
import { getDefaultCharacter } from "../../../redux/Settings/slice";
import { useAppSelector } from "../../../redux/hooks";
import { BdolyticsGrindspotResponse } from "../../../types/Bdolytics/Grindspot";
import { useBdolyticsAPI } from "../../../hooks/useBdolyticsApi";
import { DropItem } from "../../../components/dropitem/DropItem";
import { BdolyticsTooltipTypes } from "../../../types/Bdolytics/TooltipTypes";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const generateRandomDate = () => {
    const start = new Date(2022, 0, 1); // 2022-01-01
    const end = new Date(2022, 11, 31); // 2022-12-31
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const formattedDate = randomDate.toISOString().split('T')[0]; // 'YYYY-MM-DD' formatında dönüştürme
    return formattedDate;
};

const generateRandomData = () => {
    const newData = [];
    for (let i = 0; i < 100; i++) {
        newData.push({
            date: generateRandomDate(),
            value: Math.floor(Math.random() * 1000000000), // Rastgele bir değer
        });
    }
    return newData;
};

const data = generateRandomData();

const formatValue = (value: number) => {
    const suffixes = ['', 'K', 'M', 'B', 'T']; // Sırasıyla: birim, bin, milyon, milyar, trilyon
    let suffixIndex = 0;

    while (value >= 1000) {
        value /= 1000;
        suffixIndex++;
    }

    return `${value.toFixed(1)}${suffixes[suffixIndex]}`;
};

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
            if (!grindspot) return;
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
        <div className="startup-container">
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
            <div className="startup-grindspot-drops">
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
            <div style={{ display:"flex", justifyContent:"center", alignItems:"center" }}>
                <Line
                    style={{ width: "50vw", height: "50vh" }}
                    data={{
                        labels: data.slice(-30).map(item => item.date), // Son 30 veri etiketlerini alır
                        datasets: [
                            {
                                label: 'Value',
                                data: data.slice(-30).map(item => item.value), // Son 30 veri değerlerini alır
                                borderColor: '#8884d8', // Çizgi rengi
                                fill: false // Alan doldurmayı devre dışı bırakır
                            }
                        ]
                    }}
                    options={{
                        scales: {
                            y: {
                                ticks: {
                                    callback: (value) => formatValue(parseInt(value as string)) // Eksen değerlerini okunabilir formata dönüştür
                                }
                            },
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: (tooltipItem) => `${tooltipItem.formattedValue} Silver` // Tooltip'deki değeri kullan
                                }
                            },
                            legend: {
                                display: false // Açıklamayı gizle
                            }
                        }
                    }}
                />
            </div>
            <button 
                onClick={() => navigate(`/tracker/${grindspotid}/${id}`)}
                style={{ position:"absolute", bottom: 15, right:"47%" }} className="startup-button"
            >
                Start
            </button>
        </div>
    )
}

export default Startup;