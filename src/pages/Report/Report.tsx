import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useBdolyticsAPI } from "../../hooks/useBdolyticsApi";
import { BdolyticsGrindspotResponse, Item } from "../../types/Bdolytics/Grindspot";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addReport, getReportProps, isReporting, updateReporting } from "../../redux/Reports/slice";
import { formatTime } from "../../helpers/formatTime";
import { GrindHeader } from "../../components/grindheader/GrindHeader";

import "./Report.css";
import { getDefaultCharacter, getRegion } from "../../redux/Settings/slice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { DropItem } from "../../components/dropitem/DropItem";
import { BdolyticsTooltipTypes } from "../../types/Bdolytics/TooltipTypes";
import { DropItemText } from "../Grindspot/Grindspot";

const formatValueToK = (value: number) => {
    const suffixes = ['', 'K', 'M', 'B', 'T']; // Sırasıyla: birim, bin, milyon, milyar, trilyon
    let suffixIndex = 0;

    while (value >= 1000) {
        value /= 1000;
        suffixIndex++;
    }

    // Değerin virgülden sonraki kısmı 3 basamaktan fazlaysa, sadece ilk 3 basamağı alıyoruz.
    const formattedValue = value.toFixed(2);
    const [integerPart, decimalPart] = formattedValue.split('.');

    // Virgülden sonraki kısmı alıyoruz ve tam olarak üç basamağı alıyoruz.
    const truncatedDecimal = decimalPart?.slice(0, 3).padEnd(3, '0') || '';

    // Biçimlendirilmiş sayıyı ve birimi döndürüyoruz.
    return `${integerPart}.${truncatedDecimal}${suffixes[suffixIndex]}`;
};

interface DataTableDataItem {
    item: Item;
    price: number;
    amount: number;
}

function Report() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { getGrindspot, getItem, getMarketPricesData } = useBdolyticsAPI();
    const [grindspot, setGrindspot] = React.useState<BdolyticsGrindspotResponse>();
    const [dataTableData, setDataTableData] = React.useState<DataTableDataItem[]>([])
    const report = useAppSelector(getReportProps)
    const isReport = useAppSelector(isReporting)
    const defaultCharacter = useAppSelector(getDefaultCharacter)
    const [loadingPercent, setLoadingPercent] = React.useState(0);

    React.useEffect(() => {
        if (!isReport) {
            navigate("/");
            return;
        }
        getGrindspot(report.grindspotId).then((response) => {
            setGrindspot(response);
        });
    }, [report])

    React.useEffect(() => {
        if (grindspot === undefined) return;

        const fetchData = async () => {
            let newData = [];
            const totalItems = grindspot.data.items_at_grindspot.length;
            for (let i = 0; i < totalItems; i++) {
                let drop = grindspot.data.items_at_grindspot[i];
                let priceData = await getMarketPricesData(drop.id);
                newData.push({
                    item: drop,
                    price: priceData || 0,
                    amount: 0
                });
                const percent = Math.floor(((i + 1) / totalItems) * 100);
                setLoadingPercent(percent);
            }
            setDataTableData(newData);
        };

        fetchData();
    }, [grindspot]);

    function saveReport() {
        dispatch(addReport({
            grindspotId: report.grindspotId,
            seconds: report.time,
            date: new Date(),
            grindspotName: grindspot!.data.name,
            id: report.id,
            totalSilver: dataTableData.reduce((acc, item) => {
                return acc + (item.price * item.amount);
            }, 0),
            characterName: defaultCharacter.name,
            
            items: dataTableData.map((item) => {
                return {
                    id: item.item.id,
                    amount: item.amount,
                    itemGrade: item.item.grade_type,
                    itemName: item.item.name,
                    perSilver: item.price,
                    itemImage: item.item.icon_image
                }
            })
        }))
        dispatch(updateReporting(false))
        navigate("/summary");
    }

    function GrindHeaderInlineElements() {
        if (grindspot === undefined) return null;
        return (
            <>
                <div>
                    <span>Recommended AP: </span>
                    <span style={{ color: (defaultCharacter.ap > grindspot!.data.ap + 10) ? "#00af00" : (defaultCharacter.ap < grindspot!.data.ap - 10) ? "#b00000" : "#fff" }}>
                        {grindspot!.data.ap}
                    </span>
                </div>
                <div>
                    <span>Recommended DP: </span>
                    <span style={{ color: (defaultCharacter.dp > grindspot!.data.dp + 20) ? "#00af00" : (defaultCharacter.dp < grindspot!.data.dp - 20) ? "#b00000" : "#fff" }}>
                        {grindspot!.data.dp}
                    </span>
                </div>
                <p>Time: {formatTime(report.time)}</p>
                <p>Total Silver: {formatValueToK(dataTableData.reduce((total, data) => {
                    return total + (data.price * data.amount);
                }, 0))}</p>
                <button className="settings-tab-ays yes" onClick={saveReport}>Save</button>
            </>
        )
    }

    // Report eklenince homepage yada grind summary sayfasına atacak

    return (
        <div className="report-container">
            <div className="report-left">
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
            <div>
                {/* sol taraf isim ad ap time yazan yer (time input olacak değiştirilebilecek) */}
            </div>
            <div className="report-right">
                {(loadingPercent !== 100) ? (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%"
                    }}>Loading... {loadingPercent}%</div>
                ) : (
                    <DataTable value={dataTableData}>
                        <Column field="item" header="Drop Item" body={(data: DataTableDataItem, options) => {
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
                        <Column field="price" header="Price" editor={(props) => {
                            return (
                                <input
                                    type="number"
                                    value={props.rowData.price}
                                    onChange={(e) => {
                                        let newPrice = parseInt(e.target.value);
                                        props.rowData.price = newPrice;
                                        setDataTableData(prevData => {
                                            return prevData.map((item) => {
                                                if (item.item.id === props.rowData.item.id) {
                                                    return {
                                                        ...item,
                                                        price: (isNaN(newPrice) ? 0 : newPrice)
                                                    }
                                                }
                                                return item;
                                            })
                                        })
                                    }}
                                />
                            );
                        }} style={{ width: '30%' }}></Column>
                        <Column field="amount" header="Amount" editor={(props) => {
                            return (
                                <input
                                    type="number"
                                    value={props.rowData.amount}
                                    onChange={(e) => {
                                        let newAmount = parseInt(e.target.value);
                                        props.rowData.amount = newAmount;
                                        setDataTableData(prevData => {
                                            return prevData.map((item) => {
                                                if (item.item.id === props.rowData.item.id) {
                                                    return {
                                                        ...item,
                                                        amount: isNaN(newAmount) ? 0 : newAmount
                                                    }
                                                }
                                                return item;
                                            })
                                        })
                                    }}
                                />
                            );
                        }} style={{ width: '30%' }}></Column>
                    </DataTable>
                )}
                {/* burada tüm droplar satır satır olacak ve yanlarında input şeklinde fiyat + amount olacak */}
                {/* en altta additional silver olacak 2 tane biri + biri - için girilebilecek */}
            </div>
        </div>
    );
}

export default Report;
