import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { getTotalHoursByZones } from "../../redux/Reports/slice";
import { formatTime } from "../../helpers/formatTime";
import { colors } from "../../helpers/colors";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { replaceAll } from "../../helpers/replaceAll";
import { useNavigate } from "react-router-dom";

Chart.register(...registerables);

function TotalHoursPie() {
    const totalHoursByZones = useAppSelector(getTotalHoursByZones);
    const navigate = useNavigate();
    const totalSecondsTotal = Object.values(totalHoursByZones).reduce((acc, data) => acc += data.totalSeconds, 0);
    const totalHoursPieData = Object.keys(totalHoursByZones).map((key) => {
        const data = totalHoursByZones[key];
        const percentage = (data.totalSeconds / totalSecondsTotal) * 100;
        return {
            totalSeconds: data.totalSeconds,
            info: data.info,
            name: data.info.grindspotName,
            percentage: percentage.toFixed(2) + "%",
        }
    });

    return (
        <>
            <div className="summary-chart-title">
                Total Hours By Grindzones <span>
                    ({formatTime(totalSecondsTotal)} Hours)
                </span>
            </div>
            <Pie
                data={{
                    labels: totalHoursPieData.map((data) => `${data.name} (${data.percentage})`),
                    datasets: [
                        {
                            backgroundColor: totalHoursPieData.map((data) => colors[data.info.grindspotId]),
                            data: totalHoursPieData.map((data) => data.totalSeconds),
                        },
                    ],
                }}

                options={{
                    onClick: function (event, elements) {
                        if (elements && elements.length > 0) {
                            // Tıklanan öğeyi işle
                            const clickedElementIndex = elements[0].index;
                            const clickedElementData = totalHoursPieData[clickedElementIndex];
                            // İşlem yapılacak fonksiyonu burada çağır
                            navigate(`/brief/${clickedElementData.info.grindspotId}`)
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: "#fff",
                            },
                            position: "top",
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    return `  ${formatTime(context.parsed)} Hours`
                                },
                            },
                        },
                    },
                }}
            />
        </>
    )
}

export default TotalHoursPie;
