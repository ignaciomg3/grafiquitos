import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from 'chart.js';
import birthsData from '../../../../Base_Datos/nacimientos_argentina_1975_2025.json';
import branding from '../../../theme/branding';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const records = Array.isArray(birthsData.datos) ? birthsData.datos : [];

function formatNumber(value) {
    return new Intl.NumberFormat('es-AR', {
        maximumFractionDigits: 0
    }).format(value);
}

export default function NacimientosArgentinaChart() {
    if (records.length === 0) {
        return <p className="text-sm text-slate-500">No hay datos disponibles para mostrar.</p>;
    }

    const data = {
        labels: records.map((item) => String(item.anio)),
        datasets: [
            {
                label: 'Nacimientos',
                data: records.map((item) => item.nacimientos),
                backgroundColor: branding.charts.economia.nacimientos,
                borderRadius: 8,
                borderSkipped: false,
                maxBarThickness: branding.charts.economia.nacimientosBarMaxWidth
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
                callbacks: {
                    label: (context) => `Nacimientos: ${formatNumber(context.parsed.y)}`
                }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: branding.charts.axis,
                    font: { size: branding.charts.fontSizes.axisTick, weight: 'bold' }
                }
            },
            y: {
                beginAtZero: true,
                suggestedMin: 0,
                ticks: {
                    stepSize: 200000,
                    color: branding.charts.axis,
                    callback: (value) => formatNumber(value)
                },
                grid: { color: branding.charts.grid },
            }
        }
    };

    return (
        <div className="h-full w-full" aria-label={`Nacimientos en Argentina. ${records.length} intervalos observados.`}>
            <Bar data={data} options={options} />
        </div>
    );
}
