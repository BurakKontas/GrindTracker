import React from "react";
import { useNavigate } from "react-router-dom";
import { useBdolyticsAPI } from "../../hooks/useBdolyticsApi";
import { BdolyticsGrindspotsResponse } from "../../types/Bdolytics/Grindspots";

import "./Grindspots.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useAppSelector } from "../../redux/hooks";
import { getLanguage, getRegion } from "../../redux/Settings/slice";

interface Item {
    id: number;
    name: string;
    image: string;
    grade_type: number;
}
interface Grindspot {
    id: number;
    image: string;
    name: string;
    drops: Item[];
    ap: number;
    dp: number;
}

enum GradeTypes {
    Grade4 = "#d36200",
    Grade3 = "#f6c232",
    Grade2 = "#0391c4",
    Grade1 = "#5ff369",
    Grade0 = "#ffffff",
}
function GrindSpots() {
    const [grindspots, setGrindspots] = React.useState<Grindspot[]>([]);
    const language = useAppSelector(getLanguage)
    const region = useAppSelector(getRegion)
    const navigate = useNavigate()
    const { getGrindspots, getImage } = useBdolyticsAPI()

    React.useEffect(() => {
        async function init() {
            let response = await getGrindspots()
            let grindspots = response?.data.map((grindspot): Grindspot => {
                return {
                    image: grindspot.icon_image,
                    ap: grindspot.ap,
                    dp: grindspot.dp,
                    drops: grindspot.products.map((product): Item => {
                        return {
                            id: product.id,
                            name: product.name,
                            image: product.icon_image,
                            grade_type: product.grade_type
                        }
                    }),
                    id: grindspot.id,
                    name: grindspot.name
                }
            })
            setGrindspots(grindspots!)
        }
        init()
    }, [])

    return (
        <div className="grindspots-container">
            <DataTable tableStyle={{ minWidth: "94.5vw" }}  value={grindspots} header="Grindspots" className="grindspots-table" emptyMessage="No grindspots found" selectionMode="single" onSelectionChange={(e) => navigate(`/grindspot/${e.value.id}`)}>
                <Column field="name" header="Name" body={(data, options) => {
                    let [image, setImage] = React.useState<string>("")
                    React.useEffect(() => {
                        async function init() {
                            let image = await getImage(data.image)
                            setImage(image!)
                        }
                        init()
                    }, [])
                    return (
                        <div style={{ width: 225, height: 50, display:"flex", flexDirection: "row", alignItems:"center" }}>
                            <img src={image} style={{ width: 40, height: 40 }} />
                            <span style={{ marginLeft: 10 }}>{data.name}</span>
                        </div>
                    )
                }}></Column>
                <Column field="drop" header="Drop" body={(data, options) => {
                    return (
                        <div className="grindspots-drops">
                            {data.drops.map((drop: Item) => {
                                let [image, setImage] = React.useState<string>("")
                                React.useEffect(() => {
                                    async function init() {
                                        let image = await getImage(drop.image)
                                        setImage(image!)
                                    }
                                    init()
                                }, [])
                                return (
                                    <a href={`https://bdolytics.com/${language}/${region}/db/item/${drop.id}`} style={{
                                        borderColor: GradeTypes[`Grade${drop.grade_type}` as keyof typeof GradeTypes],
                                        borderWidth: 0.2,
                                        borderStyle: "solid", // Add this line to specify the border style
                                        display: "inline-block", // Add this line to make the div inline-block
                                    }}
                                        key={drop.id+drop.name}
                                    >
                                        <img key={drop.id} style={{
                                            width: 30,
                                            height: 30,
                                            border: "none", // Add this line to remove the default image border
                                        }} src={image} alt={`Item ${drop.id}`} />
                                    </a>
                                )
                            })}
                        </div>
                    )
                }}></Column>
                <Column field="ap" header="AP"></Column>            
                <Column field="dp" header="DP"></Column>            
            </DataTable>
        </div>
    )
}

export default GrindSpots;
