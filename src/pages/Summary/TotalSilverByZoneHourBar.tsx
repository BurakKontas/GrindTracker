import React from "react";
import { Bar } from 'react-chartjs-2';
import { useAppSelector } from "../../redux/hooks";
import { getReportsByGrindzones } from "../../redux/Reports/slice";
import { colors } from "../../helpers/colors";
import { replaceAll } from "../../helpers/replaceAll";
import { formatValueToK } from "../../helpers/formatValueToK";

export const truncateLabel = (label: string | number, maxChars: number) => {
    if (typeof label === 'number') return label;
    return label.length > maxChars ? label.substr(0, maxChars) + '...' : label;
};

function TotalSilverByZoneHourBar() {
    const reports = useAppSelector(getReportsByGrindzones);
    const [data, setData] = React.useState<any[]>([])
    React.useEffect(() => {
        const data = Object.values(reports).map(data => {
            let totalSilver = data.reduce((acc, r) => acc + r.totalSilver, 0)
            let totalSeconds = data.reduce((acc, r) => acc + r.seconds, 0)
            return {
                totalSilver,
                totalSeconds,
                grindspot: data[0].grindspotId,
                division: totalSilver / (totalSeconds / 3600)
            }
        });
        setData(data)
    }, [reports])

    const totalSilverSum = Object.values(reports).reduce((acc, data) => {
        return acc + data.reduce((acc, r) => acc + r.totalSilver, 0)
    }, 0);
    const totalSecondsSum = Object.values(reports).reduce((acc, data) => {
        return acc + data.reduce((acc, r) => acc + r.seconds, 0)
    }, 0);

    const averageSilverPerHour = totalSilverSum / (totalSecondsSum / 3600);

    return (
        <>
            <div className="summary-chart-title">
                Total Silver Gain By Hour
                <span>
                {" "}({formatValueToK(averageSilverPerHour)} Silver/Hour)
                </span>              
            </div>
            <Bar
                data={{
                    labels: Object.values(reports).map(grindspot => grindspot[0].grindspotName), // Her grindzone için sadece bir etiket alıyoruz
                    datasets: [
                        {
                            label: 'Total Silver By Hour',
                            data: data.map(data => data.division), // Her grindzone için toplam silver miktarını alıyoruz
                            backgroundColor: Object.values(reports).map((grindspot) => colors[grindspot[0].grindspotId]),
                            borderColor: Object.values(reports).map((grindspot) => colors[grindspot[0].grindspotId]), 
                            borderWidth: 1
                        }
                    ]
                }}
                options={{
                    onClick: function (event, elements) {
                        if (elements && elements.length > 0) {
                            // Tıklanan öğeyi işle
                            const clickedElementIndex = elements[0].index;
                            const clickedElementData = Object.values(reports)[clickedElementIndex];
                            // İşlem yapılacak fonksiyonu burada çağır
                            console.log(clickedElementData)
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            ticks: {
                                callback: (value: number | string) => formatValueToK(parseInt(value.toString()))
                            }
                        },
                        y: {
                            ticks: {
                                callback: (value: string | number, index, ticks) => truncateLabel(Object.values(reports)[index][0].grindspotName, 12)
                            }
                        }
                    },
                    indexAxis: 'y',
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    let number = replaceAll(context.formattedValue, ",", "")
                                    return `  ${formatValueToK(parseInt(number))} Silver`
                                },
                            }
                        }
                    }
                }}
            />
        </>
    )
}

export default TotalSilverByZoneHourBar;
