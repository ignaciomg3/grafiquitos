import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import gastoAnualArgentina from '../../../../Base_Datos/GastoAnualArgentina.json';
import branding from '../../../theme/branding';

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

const getEmoji = (label) => {
    const s = String(label || '').toLowerCase();
    if (
        s.includes('jubi') ||
        s.includes('jubil') ||
        s.includes('aporte') ||
        s.includes('aportes') ||
        s.includes('previs') ||
        s.includes('previsional')
    ) return '🧓';
    if (s.includes('petr') || s.includes('oil') || s.includes('crudo')) return '🛢️';
    if (s.includes('comerc') || s.includes('export') || s.includes('import') || s.includes('aduan')) return '🌎';
    if (s.includes('impu') || s.includes('tax')) return '💸';
    if (s.includes('salud') || s.includes('health')) return '🏥';
    if (s.includes('educ') || s.includes('school')) return '🎓';
    if (s.includes('energ') || s.includes('electric') || s.includes('gas')) return '⚡';
    if (s.includes('defen') || s.includes('milit')) return '🛡️';
    if (s.includes('trans') || s.includes('viaj') || s.includes('truck')) return '🚆';
    if (s.includes('turis') || s.includes('vacac')) return '🏖️';
    if (s.includes('agric') || s.includes('campo') || s.includes('rural')) return '🌾';
    if (s.includes('indus') || s.includes('fabr')) return '🏭';
    return '🔸';
};

const chartColors = branding.charts.series;
const softChartColors = branding.charts.softSeries;

const centerLabelPlugin = {
    id: 'gastoCenterLabel',
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

        ctx.fillStyle = branding.colors.text.primary;
        ctx.font = '700 26px Inter, sans-serif';
        ctx.fillText(`${itemPrincipal.porcentaje}%`, x, y - 14);

        ctx.fillStyle = branding.colors.text.muted;
        ctx.font = '600 12px Inter, sans-serif';
        ctx.fillText('Mayor peso', x, y + 10);

        ctx.fillStyle = branding.colors.section.mercado;
        ctx.font = '700 12px Inter, sans-serif';
        ctx.fillText(formatBillions(totalGastoUsd), x, y + 30);
        ctx.restore();
    }
};

const chartData = {
    labels: detallesGastoAnual.map((detalle) => detalle.finalidad),
    datasets: [
        {
            data: detallesGastoAnual.map((detalle) => detalle.porcentaje),
            backgroundColor: chartColors,
            borderColor: branding.colors.text.inverse,
            borderRadius: 6,
            borderWidth: 4,
            hoverBorderColor: branding.charts.white,
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
            backgroundColor: branding.charts.tooltipBg,
            borderColor: branding.charts.tooltipBorder,
            borderWidth: 1,
            displayColors: false,
            titleFont: {
                size: 14,
                weight: 'bold'
            },
            bodyFont: {
                size: 13
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
        <div className="h-full w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] gap-5 lg:gap-8">
            <div className="min-h-72 lg:min-h-0 rounded-xl bg-gradient-to-br from-slate-50 via-white to-blue-50/60 border border-slate-100 p-4">
                <Doughnut data={chartData} options={chartOptions} plugins={[centerLabelPlugin]} />
            </div>

            <div className="min-h-0 flex flex-col">
                <div className="mb-4 border-l-4 border-blue-500 pl-4">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-blue-700">
                        Total estimado
                    </p>
                    <p className="text-2xl font-black text-slate-900">
                        {formatBillions(totalGastoUsd)}
                    </p>
                    <p className="text-xs text-slate-500">
                        Mayor peso: {getEmoji(itemPrincipal.finalidad)} {itemPrincipal.finalidad}
                    </p>
                </div>

                <div className="min-h-0 overflow-y-auto pr-1 space-y-3">
                    {detallesGastoAnual.map((detalle, index) => (
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
                                            <span className="mr-2 inline-block align-middle">{getEmoji(detalle.finalidad)}</span>
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