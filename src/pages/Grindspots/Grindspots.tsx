import React from "react";
import { useNavigate } from "react-router-dom";
import { useBdolyticsAPI } from "../../hooks/useBdolyticsApi";
import { BdolyticsGrindspotsResponse } from "../../types/Bdolytics/Grindspots";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useAppSelector } from "../../redux/hooks";
import { getLanguage, getRegion } from "../../redux/Settings/slice";
import { DropItem, Item } from "../../components/dropitem/DropItem";
import { GrindHeader } from "../../components/grindheader/GrindHeader";
import { BdolyticsTooltipTypes } from "../../types/Bdolytics/TooltipTypes";

import "./Grindspots.css";

export interface Grindspot {
    id: number;
    image: string;
    name: string;
    drops: Item[];
    ap: number;
    dp: number;
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
                <Column field="name" header="Name" body={(data, options) => 
                    <GrindHeader 
                        style={{ width: 225, height: 50, display: "flex", flexDirection: "row", alignItems: "center" }}
                        data={data}
                        imageStyle={{ width: 40, height: 40 }}
                        titleStyle={{ marginLeft: 10 }}
                    />}>
                </Column>
                <Column field="drop" header="Drop" body={(data, options) => 
                        <div className="grindspots-drops">
                            {data.drops.map((drop: Item) => <DropItem type={BdolyticsTooltipTypes.ITEM} drop={drop} key={drop.id + drop.name} />)}
                        </div>
                    }>
                </Column>
                <Column field="ap" header="AP"></Column>            
                <Column field="dp" header="DP"></Column>            
            </DataTable>
        </div>
    )
}

export default GrindSpots;
