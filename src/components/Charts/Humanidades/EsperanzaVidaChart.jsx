import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import lifeExpectancyData from '../../../../Base_Datos/Esperanza_de_vida.json';
import branding from '../../../theme/branding';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function EsperanzaVidaChart() {
    const labels = lifeExpectancyData.map((item) => item.anio);
    const predictionStartIndex = labels.findIndex((year) => year >= 2026);

    const data = {
        labels,
        datasets: [
            {
                label: ' Mujer ',
                data: lifeExpectancyData.map(item => item.mujer),
                borderColor: branding.charts.humanidades.mujer,
                backgroundColor: branding.charts.humanidades.mujerFill,
                pointBackgroundColor: branding.charts.humanidades.mujer,
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                segment: {
                    borderDash: (ctx) => (ctx.p0DataIndex >= predictionStartIndex ? [8, 6] : undefined)
                }
            },
            {
                label: ' Hombre',
                data: lifeExpectancyData.map(item => item.hombre),
                borderColor: branding.charts.humanidades.hombre,
                backgroundColor: branding.charts.humanidades.hombreFill,
                pointBackgroundColor: branding.charts.humanidades.hombre,
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                segment: {
                    borderDash: (ctx) => (ctx.p0DataIndex >= predictionStartIndex ? [8, 6] : undefined)
                }
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    font: { size: 18, weight: 'bold' }
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: branding.charts.tooltipBg,
                padding: 10,
                titleFont: { size: 14 },
                bodyFont: { size: 13 },
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.y} años`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: branding.charts.axis,
                    font: { weight: 'bold', size: 15 }
                }
            },
            y: {
                beginAtZero: false,
                grid: { color: branding.charts.grid },
                title: { 
                    display: true, 
                    text: 'Esperanza de Vida (años)', 
                    font: { size: 16, weight: 'bold' } 
                },
                ticks: { color: branding.charts.axis, font: { size: 15 } }
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    return <Line data={data} options={options} />;
}
