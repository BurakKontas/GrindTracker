import React from "react"

import "./Brief.css"
import { useNavigate, useParams } from "react-router-dom";
import { BdolyticsGrindspotResponse, Item } from "../../types/Bdolytics/Grindspot";
import { useBdolyticsAPI } from "../../hooks/useBdolyticsApi";
import { useAppSelector } from "../../redux/hooks";
import { getReportByGrindspot, getReportsByGrindzones } from "../../redux/Reports/slice";
import { formatTime } from "../../helpers/formatTime";
import { GrindHeader } from "../../components/grindheader/GrindHeader";
import { formatValueToK } from "../../helpers/formatValueToK";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BdolyticsTooltipTypes } from "../../types/Bdolytics/TooltipTypes";
import { DropItemText } from "../Grindspot/Grindspot";
import { DropItem } from "../../components/dropitem/DropItem";

function Brief() {
    const { id } = useParams();
    const [grindspot, setGrindspot] = React.useState<BdolyticsGrindspotResponse>();
    const { getGrindspot } = useBdolyticsAPI()
    const navigate = useNavigate()
    const reports = useAppSelector(state => getReportByGrindspot(state, parseInt(id!)));
    let totalHoursSpent = reports.reduce((acc, report) => acc + report.seconds, 0)

    const dataTableItems = grindspot?.data.items_at_grindspot.map((item) => {
        let dropped = reports.reduce((acc, report) => {
            let dropped = report.items.find((droppedItem) => droppedItem.id === item.id)
            return acc + (dropped ? dropped.amount : 0)
        }, 0)
        return {
            id: item.id,
            item: item,
            dropped: dropped,
            droppedPerHour: (dropped / (totalHoursSpent / 3600)).toFixed(2)
        }
    })

    console.log(dataTableItems)

    React.useEffect(() => {
        async function init() {
            let response = await getGrindspot(id!)
            setGrindspot(response)
        }
        init()
    }, [])

    function GrindHeaderInlineElements() {
        if (grindspot === undefined) return null;
        let totalSilverGain = reports.reduce((acc, report) => acc + report.totalSilver, 0);
        let averageSilverGainByHour = totalSilverGain / (totalHoursSpent / 3600);
        return (
            <>
                <div>
                    <span>Recommended AP: </span>
                    <span>
                        {grindspot!.data.ap}
                    </span>
                </div>
                <div>
                    <span>Recommended DP: </span>
                    <span>
                        {grindspot!.data.dp}
                    </span>
                </div>
                <div style={{
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 20
                }}>
                    <span>Total Hours Spent: {formatTime(totalHoursSpent)} Hours</span>
                    <span>Total Silver Gain: {formatValueToK(totalSilverGain)} Silver</span>
                    <span>Average Silver Gain By Hour: {formatValueToK(averageSilverGainByHour)}</span>
                </div>
            </>
        )
    }

    return (
        <div className="brief-container">
            <div className="brief-left">
                <button onClick={() => navigate("/summary")} className="settings-tab-addcharacter-button" style={{
                    alignSelf: "flex-start",
                    marginLeft: -10,
                }}>
                    Back
                </button>                
                <GrindHeader data={{
                    image: grindspot?.data.icon_image!,
                    name: grindspot?.data.name!,
                }}
                    inlineElements={<GrindHeaderInlineElements />}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "97%",
                        borderRight: "1px solid #444",
                        paddingRight: 40
                    }}
                    imageStyle={{
                        width: 100,
                        height: 100,
                        marginBottom: 10
                    }}
                    titleStyle={{
                        fontSize: 20,
                        fontWeight: "bold",
                        marginBottom: 10
                    }}
                />
            </div>
            <div className="brief-right">
                <DataTable value={dataTableItems}>
                    <Column field="item" header="Drop Item" body={(data: any, options) => {
                        console.log(data)
                        return (
                            <div className="report-drop-item">
                                <DropItem
                                    type={BdolyticsTooltipTypes.ITEM}
                                    drop={{
                                        id: data.item.id,
                                        name: data.item.name,
                                        image: data.item.icon_image,
                                        grade_type: data.item.grade_type
                                    }}
                                    containerStyle={{
                                        height: 40,
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingLeft: 10,
                                        textDecoration: "none"
                                    }}
                                    inlineElement={<DropItemText name={data.item.name} grade={data.item.grade_type} />}
                                />
                            </div>
                        )
                    }}></Column>
                    <Column field="dropped" header="Total Dropped"></Column>
                    <Column field="droppedPerHour" header="Dropped Per Hour"></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default Brief;