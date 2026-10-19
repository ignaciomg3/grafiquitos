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
import branding from '../../../theme/branding';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const normalizedData = oilData
    .map((item) => ({
        anio: item.anio,
        precio: item.precio_usd ?? null,
        contexto: item.descripcion ?? 'Sin contexto'
    }))
    .filter((item) => item.precio !== null);

const prices = normalizedData.map((item) => item.precio);
const minPrice = Math.min(...prices);
const maxPrice = Math.max(...prices);
const yAxisMin = Math.floor(minPrice / 20) * 20;
const yAxisMax = Math.ceil(maxPrice / 20) * 20;

function priceToColor(price) {
    if (maxPrice === minPrice) {
        return branding.charts.economia.oilLow;
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
                        return branding.charts.economia.oilFillLow;
                    }

                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, branding.charts.economia.oilGradientHigh);
                    gradient.addColorStop(0.5, branding.charts.economia.oilGradientMid);
                    gradient.addColorStop(1, branding.charts.economia.oilGradientLow);
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
                backgroundColor: branding.charts.tooltipBg,
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
                    color: branding.charts.axis,
                    font: { size: 12, weight: 'bold' }
                }
            },
            y: {
                beginAtZero: false,
                min: yAxisMin,
                max: yAxisMax,
                grid: { color: branding.charts.grid },
                ticks: {
                    stepSize: 20,
                    color: branding.charts.axis,
                    font: { size: 12, weight: 'normal' },
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