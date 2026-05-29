import React from 'react';
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
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
const aprobacion = [42, 40, 38, 41, 45, 44];
const desaprobacion = [45, 48, 52, 50, 47, 49];

const makeGradient = (context, color) => {
    const { chart } = context;
    const { ctx, chartArea } = chart;

    if (!chartArea) {
        return color;
    }

    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    return gradient;
};

const data = {
    labels,
    datasets: [
        {
            label: 'Desaprueba',
            data: desaprobacion,
            borderColor: '#dc2626',
            backgroundColor: (context) => makeGradient(context, 'rgba(220, 38, 38, 0.22)'),
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#dc2626',
            pointBorderWidth: 3,
            pointHoverRadius: 6,
            pointRadius: 4,
            borderWidth: 3,
            tension: 0.38,
            fill: true
        },
        {
            label: 'Aprueba',
            data: aprobacion,
            borderColor: '#2563eb',
            backgroundColor: (context) => makeGradient(context, 'rgba(37, 99, 235, 0.18)'),
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#2563eb',
            pointBorderWidth: 3,
            pointHoverRadius: 6,
            pointRadius: 4,
            borderWidth: 3,
            tension: 0.38,
            fill: true
        }
    ]
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false
    },
    plugins: {
        legend: {
            position: 'top',
            align: 'end',
            labels: {
                boxWidth: 9,
                boxHeight: 9,
                color: '#334155',
                font: {
                    size: 12,
                    family: 'Inter, sans-serif',
                    weight: '700'
                },
                usePointStyle: true
            }
        },
        tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            borderColor: 'rgba(148, 163, 184, 0.35)',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
                label(context) {
                    return ` ${context.dataset.label}: ${context.parsed.y}%`;
                }
            }
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            },
            ticks: {
                color: '#64748b',
                font: {
                    size: 11,
                    weight: '700'
                }
            },
            border: {
                display: false
            }
        },
        y: {
            min: 30,
            max: 60,
            ticks: {
                color: '#64748b',
                font: {
                    size: 11,
                    weight: '700'
                },
                callback: (value) => `${value}%`
            },
            grid: {
                color: 'rgba(148, 163, 184, 0.18)',
                drawTicks: false
            },
            border: {
                display: false
            }
        }
    }
};

export default function AprobacionChart() {
    const ultimoMes = labels[labels.length - 1];
    const ultimoAprueba = aprobacion[aprobacion.length - 1];
    const ultimoDesaprueba = desaprobacion[desaprobacion.length - 1];

    return (
        <div className="h-full w-full rounded-xl border border-slate-100 bg-gradient-to-br from-slate-50 via-white to-blue-50/60 p-3">
            <div className="mb-2 flex items-end justify-between gap-3">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                        Ultimo dato - {ultimoMes}
                    </p>
                    <p className="text-sm font-black text-slate-900">
                        Aprueba {ultimoAprueba}% / Desaprueba {ultimoDesaprueba}%
                    </p>
                </div>
                <span className="rounded-full border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-bold text-red-700">
                    Brecha {ultimoDesaprueba - ultimoAprueba} pts
                </span>
            </div>
            <div className="h-[calc(100%-2.5rem)] min-h-0">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
