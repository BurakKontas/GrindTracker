import React from "react"

import "./Brief.css"
import { useNavigate, useParams } from "react-router-dom";
import { BdolyticsGrindspotResponse } from "../../types/Bdolytics/Grindspot";
import { useBdolyticsAPI } from "../../hooks/useBdolyticsApi";
import { useAppSelector } from "../../redux/hooks";
import { getReportByGrindspot, getReportsByGrindzones } from "../../redux/Reports/slice";

function Brief() {
    const { id } = useParams();
    const [grindspot, setGrindspot] = React.useState<BdolyticsGrindspotResponse>();
    const { getGrindspot } = useBdolyticsAPI()
    const navigate = useNavigate()
    const reports = useAppSelector(state => getReportByGrindspot(state, parseInt(id!)));
    console.log(reports)

    React.useEffect(() => {
        async function init() {
            let response = await getGrindspot(id!)
            setGrindspot(response)
        }
        init()
    }, [])

    return (
        <div>
            <h1>Brief</h1>
            <p>{id}</p>
            <p>{JSON.stringify(reports)}</p>
        </div>
    )
}

export default Brief;