import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { getAllReports, removeReport } from "../../redux/Reports/slice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatTime } from "../../helpers/formatTime";
import { formatDate } from "../../helpers/formatDate";
import { formatValueToK } from "../../helpers/formatValueToK";
import { Dialog } from 'primereact/dialog';
import { Item, Report } from "../../redux/Reports/types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DropItem } from "../../components/dropitem/DropItem";
import { BdolyticsTooltipTypes } from "../../types/Bdolytics/TooltipTypes";
import { DropItemText } from "../Grindspot/Grindspot";

function LastReports() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allReports = useAppSelector(getAllReports);
    const [reports, setReports] = useState<Report[]>(allReports);
    const [globalFilters, setGlobalFilters] = useState<{ [key: string]: any }>({});
    const [characterOptions, setCharacterOptions] = useState<JSX.Element[]>([]);
    const [grindspotOptions, setGrindspotOptions] = useState<JSX.Element[]>([]);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [displayDeleteDialog, setDisplayDeleteDialog] = useState<boolean>(false);
    const [expandedRows, setExpandedRows] = useState(null);
    
    useEffect(() => {
        setReports(allReports);
    }, [allReports]);

    const onDetailsButtonClick = (data: Report) => {
        navigate("/report/" + data.id);
    };

    const onDeleteButtonClick = (data: Report) => {
        setSelectedReport(data);
        setDisplayDeleteDialog(true);
    };

    const onDeleteConfirmed = () => {
        dispatch(removeReport(selectedReport!.id));
        setDisplayDeleteDialog(false);
    };

    const onFilter = (e: React.FormEvent<HTMLSelectElement>) => {
        const { name, value } = e.currentTarget;
        setGlobalFilters({ ...globalFilters, [name]: value });
    };

    useEffect(() => {
        const uniqueCharacterNames = Array.from(new Set(reports.map(report => report.characterName)));
        const uniqueGrindspotNames = Array.from(new Set(reports.map(report => report.grindspotName)));

        const characterOptions = uniqueCharacterNames.map((name) => (
            <option key={name} value={name}>{name}</option>
        ));

        const grindspotOptions = uniqueGrindspotNames.map((name) => (
            <option key={name} value={name}>{name}</option>
        ));

        setCharacterOptions(characterOptions);
        setGrindspotOptions(grindspotOptions);
    }, [reports]);

    const rowExpansionTemplate = (data: Report) => {
        console.log(data)
        return (
            <div>
                <DataTable value={data.items} className="p-datatable-striped">
                    <Column field="name" header="Item Name" body={(data: Item, options) => {
                        return (
                            <div>
                                <DropItem
                                    type={BdolyticsTooltipTypes.ITEM}
                                    drop={{
                                        id: data.id,
                                        name: data.itemName,
                                        image: data.itemImage,
                                        grade_type: data.itemGrade
                                    }}
                                    containerStyle={{
                                        height: 40,
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingLeft: 10,
                                        textDecoration: "none"
                                    }}
                                    inlineElement={<DropItemText name={data.itemName} grade={data.itemGrade} />}
                                />
                            </div>
                        )
                    }}></Column>
                    <Column field="amount" header="Amount" body={(data, options) => {
                        return data.amount
                    }}></Column>
                    <Column field="perSilver" header="Silver Per Item"></Column>
                </DataTable>
            </div>
        );
    };



    const header = (
        <div>
            <h5>Reports</h5>
            <div>
                <label htmlFor="characterFilter">Character Name: </label>
                <select id="characterFilter" name="characterName" onChange={onFilter}>
                    <option value="">All Characters</option>
                    {characterOptions}
                </select>
            </div>
            <div>
                <label htmlFor="grindspotFilter">Grindspot Name: </label>
                <select id="grindspotFilter" name="grindspotName" onChange={onFilter}>
                    <option value="">All Grindspots</option>
                    {grindspotOptions}
                </select>
            </div>
        </div>
    );


    const filteredReports = reports.filter(report => {
        for (let key in globalFilters) {
            //@ts-ignore
            if (globalFilters[key] && report[key] && report[key] !== globalFilters[key]) {
                return false;
            }
        }
        return true;
    });

    
    return (
        <div>
            <DataTable 
                value={filteredReports} 
                className="p-datatable-striped" 
                header={header} 
                emptyMessage="No records found"
                //@ts-ignore
                expandedRows={expandedRows} 
                //@ts-ignore
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate}
            >
                <Column expander style={{ width: '3em' }} />
                { /* @ts-ignore */}
                <Column field="date" header="Date" sortable body={(data, options) => {
                    return formatDate(data.date)
                }}></Column>
                { /* @ts-ignore */}
                <Column field="characterName" header="Character Name" sortable></Column>
                { /* @ts-ignore */}
                <Column field="grindspotName" header="Grindspot Name" sortable></Column>
                { /* @ts-ignore */}
                <Column field="totalSilver" header="Total Silver" sortable body={(data, options) => {
                    return formatValueToK(data.totalSilver);
                }}></Column>
                { /* @ts-ignore */}
                <Column field="seconds" header="Time (Hours)" sortable body={(data, options) => {
                    return formatTime(data.seconds);
                }}></Column>
                <Column field="delete" header="Delete" body={(data, options) => {
                    return <button className="settings-tab-ays no" onClick={() => onDeleteButtonClick(data)}>Delete</button>
                }}></Column>
            </DataTable>
            <Dialog visible={displayDeleteDialog} onHide={() => setDisplayDeleteDialog(false)} header="Are you sure?" modal style={{ width: '350px' }}>
                <div>Do you want to delete this report?</div>
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 10
                }}>
                    <button onClick={() => onDeleteConfirmed()} className="settings-tab-ays yes">Yes</button>
                    <button onClick={() => setDisplayDeleteDialog(false)} className="settings-tab-ays no">No</button>
                </div>
            </Dialog>
        </div>
    )
}

export default LastReports;
