import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import gastoAnualArgentina from '../../../../Base_Datos/GastoAnualArgentina.json';

ChartJS.register(ArcElement, Tooltip, Legend);

const detallesGastoAnual = gastoAnualArgentina.detalles.map((detalle) => ({
    finalidad: detalle.finalidad,
    descripcion: detalle.descripcion,
    porcentaje: detalle.porcentaje_aproximado,
    montoUsd: detalle.monto_usd_aproximado
}));

const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
});

const formatBillions = (value) => `$${(value / 1_000_000_000).toFixed(1)}B`;

const totalGastoUsd = gastoAnualArgentina.gasto_total_anual_base;
const itemPrincipal = detallesGastoAnual.reduce((max, detalle) => (
    detalle.porcentaje > max.porcentaje ? detalle : max
), detallesGastoAnual[0]);

const chartColors = ['#1d4ed8', '#0891b2', '#16a34a', '#f59e0b', '#8b5cf6', '#ef4444', '#f97316'];

const centerLabelPlugin = {
    id: 'centerLabelPlugin',
    afterDraw(chart) {
        const { ctx } = chart;
        const meta = chart.getDatasetMeta(0);

        if (!meta || !meta.data || meta.data.length === 0) {
            return;
        }

        const { x, y } = meta.data[0];

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillStyle = '#0f172a';
        ctx.font = '700 18px Inter, sans-serif';
        ctx.fillText(`${itemPrincipal.porcentaje}%`, x, y - 8);

        ctx.fillStyle = '#64748b';
        ctx.font = '600 10px Inter, sans-serif';
        ctx.fillText('Mayor peso', x, y + 12);
        ctx.restore();
    }
};

const chartData = {
    labels: detallesGastoAnual.map((detalle) => detalle.finalidad),
    datasets: [
        {
            data: detallesGastoAnual.map((detalle) => detalle.porcentaje),
            backgroundColor: chartColors,
            borderColor: '#ffffff',
            borderWidth: 3,
            hoverOffset: 12
        }
    ]
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '0%',
    plugins: {
        legend: {
            position: 'right',
            labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                boxWidth: 10,
                boxHeight: 10,
                padding: 16,
                color: '#334155',
                font: {
                    size: 11,
                    family: 'Inter, sans-serif'
                },
                generateLabels: (chart) =>
                    chart.data.labels.map((label, index) => {
                        const detalle = detallesGastoAnual[index];
                        return {
                            text: `${label} · ${detalle.porcentaje}% · ${formatBillions(detalle.montoUsd)}`,
                            fillStyle: chartColors[index],
                            strokeStyle: '#ffffff',
                            lineWidth: 2,
                            pointStyle: 'circle',
                            hidden: false,
                            index
                        };
                    })
            }
        },
        tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleFont: {
                size: 13,
                weight: 'bold'
            },
            bodyFont: {
                size: 12
            },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
                label(context) {
                    const detalle = detallesGastoAnual[context.dataIndex];
                    return [
                        ` ${detalle.porcentaje}% del total`,
                        ` ${usdFormatter.format(detalle.montoUsd)} (${formatBillions(detalle.montoUsd)})`,
                        ` ${detalle.descripcion}`
                    ];
                }
            }
        }
    }
};

export default function GastoAnualArgentinaChart() {
    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex-1 min-h-0">
                <Pie data={chartData} options={chartOptions} plugins={[centerLabelPlugin]} />
            </div>

            <p className="text-center text-xs text-slate-400 mt-3 font-medium tracking-wide uppercase">
                Total estimado: {formatBillions(totalGastoUsd)} · Mayor peso: {itemPrincipal.finalidad}
            </p>
        </div>
    );
}