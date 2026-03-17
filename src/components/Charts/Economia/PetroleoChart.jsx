import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import oilData from '../../../../Base_Datos/petroleo.json';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const normalizedData = oilData
    .map((item) => ({
        anio: item.anio,
        precio: item.precio_usd_promedio ?? item.precio_usd_actual ?? null,
        contexto: item.contexto ?? 'Sin contexto'
    }))
    .filter((item) => item.precio !== null);

const prices = normalizedData.map((item) => item.precio);
const minPrice = Math.min(...prices);
const maxPrice = Math.max(...prices);

function priceToColor(price) {
    if (maxPrice === minPrice) {
        return 'rgb(8, 145, 178)';
    }

    // From cyan (low) to red (high)
    const ratio = (price - minPrice) / (maxPrice - minPrice);
    const low = { r: 8, g: 145, b: 178 };
    const high = { r: 220, g: 38, b: 38 };

    const r = Math.round(low.r + (high.r - low.r) * ratio);
    const g = Math.round(low.g + (high.g - low.g) * ratio);
    const b = Math.round(low.b + (high.b - low.b) * ratio);

    return `rgb(${r}, ${g}, ${b})`;
}

export default function PetroleoChart() {
    const priceSeries = normalizedData.map((item) => item.precio);
    const pointColors = priceSeries.map((price) => priceToColor(price));

    const data = {
        labels: normalizedData.map((item) => String(item.anio)),
        datasets: [
            {
                label: 'USD por barril',
                data: priceSeries,
                borderColor: pointColors[0],
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        return 'rgba(8, 145, 178, 0.12)';
                    }

                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(220, 38, 38, 0.24)');
                    gradient.addColorStop(0.5, 'rgba(234, 88, 12, 0.14)');
                    gradient.addColorStop(1, 'rgba(8, 145, 178, 0.08)');
                    return gradient;
                },
                fill: true,
                tension: 0.3,
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: pointColors,
                pointBorderColor: pointColors,
                pointBorderWidth: 2,
                segment: {
                    borderColor: (context) => {
                        const segmentPrice = context.p1.parsed.y;
                        return priceToColor(segmentPrice);
                    }
                }
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.92)',
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    label: (context) => `Precio: $${context.parsed.y.toFixed(2)} USD`,
                    afterLabel: (context) => normalizedData[context.dataIndex].contexto
                }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: '#475569',
                    font: { size: 12, weight: 'bold' }
                }
            },
            y: {
                beginAtZero: false,
                grid: { color: '#e2e8f0' },
                ticks: {
                    color: '#475569',
                    callback: (value) => `$${value}`
                }
            }
        },
        interaction: {
            mode: 'index',
            intersect: false
        }
    };

    return <Line data={data} options={options} />;
}