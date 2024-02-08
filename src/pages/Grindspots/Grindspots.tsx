import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBdolyticsAPI } from "../../hooks/useBdolyticsApi";
import { BdolyticsGrindspotsResponse } from "../../types/Bdolytics/Grindspots";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useAppSelector } from "../../redux/hooks";
import { getDefaultCharacter, getLanguage, getRegion } from "../../redux/Settings/slice";
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
    const defaultCharacter = useAppSelector(getDefaultCharacter)
    const [grindspots, setGrindspots] = useState<Grindspot[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const [showGrindableAP, setShowGrindableAP] = useState<boolean>(false);
    const [showGrindableDP, setShowGrindableDP] = useState<boolean>(false);
    const [filterAP, setFilterAP] = useState<number | undefined>(undefined);
    const [filterDP, setFilterDP] = useState<number | undefined>(undefined);
    const language = useAppSelector(getLanguage)
    const region = useAppSelector(getRegion)
    const navigate = useNavigate()
    const { getGrindspots, getImage } = useBdolyticsAPI()
    const [filteredGrindspots, setFilteredGrindspots] = useState<Grindspot[]>([]);

    useEffect(() => {
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

    useEffect(() => {
        // Filtreleme işlemi burada yapılıyor
        let filteredData = grindspots.filter(grindspot => {
            if (globalFilter && !grindspot.name.toLowerCase().includes(globalFilter.toLowerCase())) {
                return false;
            }
            if (showGrindableAP && grindspot.ap === 0) {
                return false;
            }
            if (showGrindableDP && grindspot.dp === 0) {
                return false;
            }
            if (showGrindableAP && defaultCharacter && defaultCharacter.ap && grindspot.ap > defaultCharacter.ap) {
                return false;
            }
            if (showGrindableDP && defaultCharacter && defaultCharacter.dp && grindspot.dp > defaultCharacter.dp) {
                return false;
            }
            if (filterAP && grindspot.ap < filterAP) {
                return false;
            }
            if (filterDP && grindspot.dp < filterDP) {
                return false;
            }
            return true;
        });

        setFilteredGrindspots(filteredData);
        console.log(filteredData)
    }, [grindspots, globalFilter, showGrindableAP, showGrindableDP, defaultCharacter, filterAP, filterDP]);
    return (
        <div className="grindspots-container">
            <DataTable tableStyle={{ minWidth: "94.5vw" }}
                header={() => (
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                        <div style={{ display: "flex", flexDirection: "column", height: 80, marginBottom: 70 }}>
                            <h5 style={{ marginBottom: -10 }}>Grindspots</h5>
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <h5>Name:</h5>
                                    <input
                                        style={{ width: 200, height: 25 }}
                                        type="text"
                                        value={globalFilter}
                                        onChange={(e) => setGlobalFilter(e.target.value)}
                                    />
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: -40 }}>
                                    <h5>AP:</h5>
                                    <input
                                        style={{ width: 100, height: 25 }}
                                        type="number"
                                        value={filterAP || ""}
                                        onChange={(e) => setFilterAP(parseInt(e.target.value))}
                                    />
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: -40 }}>
                                    <h5>DP:</h5>
                                    <input
                                        style={{ width: 100, height: 25 }}
                                        type="number"
                                        value={filterDP || ""}
                                        onChange={(e) => setFilterDP(parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            marginBottom: 10
                        }}>
                            <div>
                                <input
                                    type="checkbox"
                                    id="showAP"
                                    checked={showGrindableAP}
                                    onChange={(e) => setShowGrindableAP(e.target.checked)}
                                />
                                <label htmlFor="showAP">Only show Grindable AP</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="showDP"
                                    checked={showGrindableDP}
                                    onChange={(e) => setShowGrindableDP(e.target.checked)}
                                />
                                <label htmlFor="showDP">Only show Grindable DP</label>
                            </div>
                        </div>
                    </div>
                )}
                //@ts-ignore
                value={filteredGrindspots} className="grindspots-table" emptyMessage="No grindspots found" selectionMode="single" onSelectionChange={(e) => navigate(`/grindspot/${e.value.id}`)} globalFilter={globalFilter} onGlobalFilterChange={(e: any) => setGlobalFilter(e.target.value)}>
                <Column field="name" header="Name" sortable body={(data, options) =>
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
                <Column field="ap" header="AP" sortable></Column>
                <Column field="dp" header="DP" sortable></Column>
            </DataTable>
        </div>
    )
}

export default GrindSpots;
