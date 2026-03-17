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
                borderColor: '#ec4899', // Pink
                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                pointBackgroundColor: '#ec4899',
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
                borderColor: '#3b82f6', // Blue
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                pointBackgroundColor: '#3b82f6',
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
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
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
                    color: '#4b5563',
                    font: { weight: 'bold', size: 15 }
                }
            },
            y: {
                beginAtZero: false,
                grid: { color: '#e5e7eb' },
                title: { 
                    display: true, 
                    text: 'Esperanza de Vida (años)', 
                    font: { size: 16, weight: 'bold' } 
                },
                ticks: { font: { size: 15 } }
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
