import React from "react";
import { useNavigate, useParams } from 'react-router-dom';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useBdolyticsAPI } from "../../hooks/useBdolyticsApi";
import { BdolyticsGrindspotResponse } from "../../types/Bdolytics/Grindspot";
import { GrindHeader, GrindHeaderData } from '../../components/grindheader/GrindHeader';
import { DropItem, GradeTypes } from "../../components/dropitem/DropItem";
import { BdolyticsTooltipTypes } from "../../types/Bdolytics/TooltipTypes";

import "./Grindspot.css";

function DropItemText({ name, grade }: { name: string, grade: number }) {
    return (
        <div className="grindspot-right-item-text" style={{
            color: GradeTypes[`Grade${grade}` as keyof typeof GradeTypes]
        }}>
            <p>{name}</p>
        </div>
    )
}

function GrindSpot() {
    const { id } = useParams();
    const [grindspot, setGrindspot] = React.useState<BdolyticsGrindspotResponse>();
    const { getGrindspot } = useBdolyticsAPI()
    const navigate = useNavigate()
    const [data, setData] = React.useState<GrindHeaderData>({
        name: "",
        image: ""
    });

    React.useEffect(() => {
        async function init() {
            let response = await getGrindspot(id!)
            setGrindspot(response)
            setData({
                name: response!.data.name,
                image: response!.data.icon_image
            })
        }
        init()
    }, [])

    const accordionStyle = {
        backgroundColor: "#3f3f3f",
        color: "white",
        width: 810,
        marginLeft: 40,
        marginRight: 45
    }
    const accordionSummaryStyle = {
        backgroundColor: "#444"
    }

    function GrindHeaderInlineElements() {
        return (
            <>
                <p>Recommended AP: {grindspot?.data.ap}</p>
                <p>Recommended DP: {grindspot?.data.dp}</p>
            </>
        )
    }

    return (
        <div className="grindspot-container">
            <div className="grindspot-left">
                <button onClick={() => navigate("/grindspots")} className="settings-tab-addcharacter-button" style={{
                    alignSelf: "flex-start",
                }}>
                    Back
                </button>
                <GrindHeader data={data} 
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
                    fontWeight: "bold"
                }}
                />
            </div>
            <div className="grindspot-right">
                <Accordion style={accordionStyle}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{
                            color:"white"
                        }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        style={accordionSummaryStyle}
                    >
                        <Typography>Drop Items</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="grindspot-right-drop-items">
                            {grindspot?.data.items_at_grindspot.map((item) => {
                                return (
                                    <div className="grindspot-right-item">
                                        <DropItem
                                            type={BdolyticsTooltipTypes.ITEM}
                                            drop={{
                                                id: item.id,
                                                name: item.name,
                                                image: item.icon_image,
                                                grade_type: item.grade_type
                                            }}
                                            containerStyle={{
                                                height: 40,
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                paddingLeft: 10,
                                                textDecoration: "none"
                                            }}  
                                            inlineElement={<DropItemText name={item.name} grade={item.grade_type} />}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion style={accordionStyle}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{
                            color: "white"
                        }} />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        style={accordionSummaryStyle}
                    >
                        <Typography>Monsters</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="grindspot-right-drop-items">
                            {grindspot?.data.monsters_at_grindspot.map((monster) => {
                                return (
                                    <div className="grindspot-right-item">
                                        <DropItem
                                            type={BdolyticsTooltipTypes.MONSTER}
                                            drop={{
                                                id: monster.id,
                                                name: monster.name,
                                                image: monster.icon_image,
                                                grade_type: 0
                                            }}
                                            containerStyle={{
                                                height: 40,
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                paddingLeft: 10,
                                                textDecoration: "none"
                                            }}
                                            inlineElement={<DropItemText name={monster.name} grade={0} />}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion style={accordionStyle}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{
                            color: "white"
                        }} />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        style={accordionSummaryStyle}
                    >
                        <Typography>Titles</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="grindspot-right-drop-items">
                            {grindspot?.data.titles_at_grindspot.map((title) => {
                                return (
                                    <div className="grindspot-right-item">
                                        <DropItem
                                            type={BdolyticsTooltipTypes.TITLE}
                                            drop={{
                                                id: title.id,
                                                name: title.name,
                                                image: title.icon_image,
                                                grade_type: 0
                                            }}
                                            containerStyle={{
                                                height: 40,
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                paddingLeft: 10,
                                                textDecoration: "none"
                                            }}
                                            inlineElement={<DropItemText name={title.name} grade={0} />}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </AccordionDetails>
                </Accordion>
                <div style={{
                    height: 20
                }}></div>
            </div>
        </div>
    )
}

export default GrindSpot;
