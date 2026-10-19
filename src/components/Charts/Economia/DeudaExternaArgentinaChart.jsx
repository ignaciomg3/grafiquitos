import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from 'chart.js';
import debtData from '../../../../Base_Datos/deuda_externa_argentina_1976_2026.json';
import branding from '../../../theme/branding';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const records = Array.isArray(debtData.datos) ? debtData.datos : [];
const availableRecords = records.filter((item) => typeof item.deuda_externa_usd === 'number');
const presidentByYear = {
    1976: 'Jorge Rafael Videla',
    1986: 'Raúl Alfonsín',
    1996: 'Carlos Menem',
    2006: 'Néstor Kirchner',
    2016: 'Mauricio Macri',
    2026: 'No disponible'
};

function formatUsd(value) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 1
    }).format(value);
}

function getPresidentLabel(year) {
    return presidentByYear[year] ?? 'Sin presidente identificado';
}

export default function DeudaExternaArgentinaChart() {
    if (records.length === 0) {
        return <p className="text-sm text-slate-500">No hay datos disponibles para mostrar.</p>;
    }

    const data = {
        labels: records.map((item) => {
            const president = getPresidentLabel(item.anio);
            return president === 'No disponible' ? String(item.anio) : `${item.anio} · ${president}`;
        }),
        datasets: [
            {
                label: 'Deuda externa total',
                data: records.map((item) => item.deuda_externa_usd),
                borderColor: branding.charts.economia.deuda,
                backgroundColor: branding.charts.economia.deudaFill,
                pointBackgroundColor: records.map((item) => (
                    item.deuda_externa_usd === null ? '#94a3b8' : branding.charts.economia.deuda
                )),
                pointBorderColor: branding.charts.white,
                pointBorderWidth: 2,
                pointRadius: records.map((item) => (
                    item.deuda_externa_usd === null ? 5 : 4
                )),
                pointHoverRadius: 6,
                borderWidth: 3,
                tension: 0.25,
                spanGaps: false,
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
                display: false
            },
            tooltip: {
                backgroundColor: branding.charts.tooltipBg,
                padding: 12,
                callbacks: {
                    title: (context) => {
                        const record = records[context[0].dataIndex];
                        return `${record.anio} · ${getPresidentLabel(record.anio)}`;
                    },
                    label: (context) => {
                        const record = records[context.dataIndex];
                        return record.deuda_externa_usd === null
                            ? 'Dato no disponible'
                            : `Deuda: ${formatUsd(record.deuda_externa_usd)}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: branding.charts.axis,
                    font: { size: 12, weight: 'bold' },
                    autoSkip: false,
                    maxRotation: 0,
                    callback: (value, index) => {
                        const record = records[index];
                        if (!record) return '';
                        const president = getPresidentLabel(record.anio);
                        return president === 'No disponible' ? String(record.anio) : `${record.anio} · ${president}`;
                    }
                }
            },
            y: {
                beginAtZero: true,
                grid: { color: branding.charts.grid },
                ticks: {
                    color: branding.charts.axis,
                    callback: (value) => formatUsd(value)
                }
            }
        }
    };

    return (
        <div className="h-full w-full" aria-label={`${debtData.Titulo}. ${availableRecords.length} valores observados.`}>
            <Line data={data} options={options} />
        </div>
    );
}
