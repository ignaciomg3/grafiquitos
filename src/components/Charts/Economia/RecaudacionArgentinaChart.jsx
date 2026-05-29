import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import recaudacionAnualArgentina from '../../../../Base_Datos/RecaudacionAnualArgentina.json';

ChartJS.register(ArcElement, Tooltip, Legend);

const detallesRecaudacionAnual = recaudacionAnualArgentina.detalles.map((detalle) => ({
    finalidad: detalle.concepto,
    descripcion: detalle.categoria,
    porcentaje: detalle.porcentaje_aproximado,
    montoUsd: detalle.monto_usd_aproximado
}));

const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
});

const formatBillions = (value) => `$${(value / 1_000_000_000).toFixed(1)}B`;

const totalRecaudacionUsd = recaudacionAnualArgentina.recaudacion_total_anual_aproximada;
const itemPrincipal = detallesRecaudacionAnual.reduce((max, detalle) => (
    detalle.porcentaje > max.porcentaje ? detalle : max
), detallesRecaudacionAnual[0]);

const chartColors = ['#0f766e', '#2563eb', '#dc2626', '#f59e0b', '#7c3aed', '#475569'];
const softChartColors = ['#ccfbf1', '#dbeafe', '#fee2e2', '#fef3c7', '#ede9fe', '#e2e8f0'];

const centerLabelPlugin = {
    id: 'recaudacionCenterLabel',
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
        ctx.font = '700 22px Inter, sans-serif';
        ctx.fillText(`${itemPrincipal.porcentaje}%`, x, y - 12);

        ctx.fillStyle = '#64748b';
        ctx.font = '600 11px Inter, sans-serif';
        ctx.fillText('Principal', x, y + 9);

        ctx.fillStyle = '#0f766e';
        ctx.font = '700 10px Inter, sans-serif';
        ctx.fillText(formatBillions(totalRecaudacionUsd), x, y + 27);
        ctx.restore();
    }
};

const chartData = {
    labels: detallesRecaudacionAnual.map((detalle) => detalle.finalidad),
    datasets: [
        {
            data: detallesRecaudacionAnual.map((detalle) => detalle.porcentaje),
            backgroundColor: chartColors,
            borderColor: '#f8fafc',
            borderRadius: 6,
            borderWidth: 4,
            hoverBorderColor: '#ffffff',
            hoverOffset: 14,
            spacing: 3
        }
    ]
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '66%',
    rotation: -75,
    layout: {
        padding: 8
    },
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            borderColor: 'rgba(148, 163, 184, 0.35)',
            borderWidth: 1,
            displayColors: false,
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
                    const detalle = detallesRecaudacionAnual[context.dataIndex];
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

export default function RecaudacionArgentinaChart() {
    return (
        <div className="h-full w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] gap-5 lg:gap-8">
            <div className="min-h-72 lg:min-h-0 rounded-xl bg-gradient-to-br from-slate-50 via-white to-teal-50/70 border border-slate-100 p-4">
                <Doughnut data={chartData} options={chartOptions} plugins={[centerLabelPlugin]} />
            </div>

            <div className="min-h-0 flex flex-col">
                <div className="mb-4 border-l-4 border-teal-500 pl-4">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-teal-700">
                        Total estimado
                    </p>
                    <p className="text-2xl font-black text-slate-900">
                        {formatBillions(totalRecaudacionUsd)}
                    </p>
                    <p className="text-xs text-slate-500">
                        Mayor aporte: {itemPrincipal.finalidad}
                    </p>
                </div>

                <div className="min-h-0 overflow-y-auto pr-1 space-y-3">
                    {detallesRecaudacionAnual.map((detalle, index) => (
                        <div
                            className="group rounded-lg border border-slate-200 bg-white/80 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                            key={detalle.finalidad}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex min-w-0 items-start gap-3">
                                    <span
                                        aria-hidden="true"
                                        className="mt-1 h-3 w-3 shrink-0 rounded-full ring-4"
                                        style={{
                                            backgroundColor: chartColors[index],
                                            '--tw-ring-color': softChartColors[index]
                                        }}
                                    />
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold leading-snug text-slate-800">
                                            {detalle.finalidad}
                                        </p>
                                        <p className="mt-1 text-xs leading-snug text-slate-500">
                                            {detalle.descripcion}
                                        </p>
                                    </div>
                                </div>
                                <div className="shrink-0 text-right">
                                    <p className="text-sm font-black text-slate-900">{detalle.porcentaje}%</p>
                                    <p className="text-[11px] font-semibold text-slate-500">
                                        {formatBillions(detalle.montoUsd)}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${detalle.porcentaje}%`,
                                        backgroundColor: chartColors[index]
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
