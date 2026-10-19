import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import branding from '../../../theme/branding';

ChartJS.register(ArcElement, Tooltip, Legend);

const bloques = [
    { label: 'La Libertad Avanza', bancas: 95, color: branding.charts.politica.bloques[0], softColor: branding.charts.politica.softBloques[0] },
    { label: 'Fuerza Patria', bancas: 93, color: branding.charts.politica.bloques[2], softColor: branding.charts.politica.softBloques[2] },
    { label: 'PRO / Fuerza Cambio', bancas: 22, color: branding.charts.politica.bloques[1], softColor: branding.charts.politica.softBloques[1] },
    { label: 'Unidos (UCR/Fed.)', bancas: 22, color: branding.charts.politica.bloques[4], softColor: branding.charts.politica.softBloques[4] },
    { label: 'Innovacion Federal', bancas: 9, color: branding.charts.politica.bloques[5], softColor: branding.charts.politica.softBloques[5] },
    { label: 'MID / Coherencia', bancas: 7, color: branding.charts.politica.bloques[7], softColor: branding.charts.politica.softBloques[7] },
    { label: 'FIT-U', bancas: 4, color: branding.charts.politica.bloques[6], softColor: branding.charts.politica.softBloques[6] },
    { label: 'Otros Provinciales', bancas: 5, color: branding.charts.politica.bloques[3], softColor: branding.charts.politica.softBloques[3] }
];

const totalBancas = bloques.reduce((sum, bloque) => sum + bloque.bancas, 0);
const bloquePrincipal = bloques.reduce((max, bloque) => (
    bloque.bancas > max.bancas ? bloque : max
), bloques[0]);

const formatPct = (bancas) => `${((bancas / totalBancas) * 100).toFixed(1)}%`;

const centerLabelPlugin = {
    id: 'diputadosCenterLabel',
    afterDraw(chart) {
        const { ctx } = chart;
        const meta = chart.getDatasetMeta(0);

        if (!meta?.data?.length) {
            return;
        }

        const { x, y } = meta.data[0];

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = branding.colors.text.primary;
        ctx.font = '800 22px Inter, sans-serif';
        ctx.fillText(totalBancas, x, y - 10);
        ctx.fillStyle = branding.colors.text.muted;
        ctx.font = '700 11px Inter, sans-serif';
        ctx.fillText('bancas', x, y + 10);
        ctx.fillStyle = branding.charts.politica.bloques[0];
        ctx.font = '700 10px Inter, sans-serif';
        ctx.fillText('Diputados', x, y + 28);
        ctx.restore();
    }
};

const data = {
    labels: bloques.map((bloque) => bloque.label),
    datasets: [{
        data: bloques.map((bloque) => bloque.bancas),
        backgroundColor: bloques.map((bloque) => bloque.color),
        borderColor: branding.colors.text.inverse,
        borderRadius: 5,
        borderWidth: 3,
        hoverBorderColor: branding.charts.white,
        hoverOffset: 12,
        spacing: 2
    }]
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '64%',
    rotation: -80,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            backgroundColor: branding.charts.tooltipBg,
            borderColor: branding.charts.tooltipBorder,
            borderWidth: 1,
            displayColors: false,
            titleFont: { size: 13, weight: 'bold' },
            bodyFont: { size: 12 },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
                label: (ctx) => {
                    const bancas = ctx.parsed;
                    return ` ${bancas} bancas (${formatPct(bancas)})`;
                }
            }
        }
    }
};

export default function DiputadosChart() {
    return (
        <div className="h-full w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_13rem] gap-4">
            <div className="min-h-0 rounded-xl bg-gradient-to-br from-slate-50 via-white to-violet-50/70 border border-slate-100 p-3">
                <Doughnut data={data} options={options} plugins={[centerLabelPlugin]} />
            </div>

            <div className="min-h-0 overflow-y-auto pr-1">
                <div className="mb-3 border-l-4 border-violet-500 pl-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-violet-700">
                        Bloque principal
                    </p>
                    <p className="truncate text-sm font-black text-slate-900">{bloquePrincipal.label}</p>
                    <p className="text-xs font-semibold text-slate-500">
                        {bloquePrincipal.bancas} bancas - {formatPct(bloquePrincipal.bancas)}
                    </p>
                </div>

                <div className="space-y-2">
                    {bloques.map((bloque) => (
                        <div className="rounded-lg border border-slate-200 bg-white/80 p-2 shadow-sm" key={bloque.label}>
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex min-w-0 items-center gap-2">
                                    <span
                                        aria-hidden="true"
                                        className="h-2.5 w-2.5 shrink-0 rounded-full ring-4"
                                        style={{
                                            backgroundColor: bloque.color,
                                            '--tw-ring-color': bloque.softColor
                                        }}
                                    />
                                    <p className="truncate text-xs font-bold text-slate-700">{bloque.label}</p>
                                </div>
                                <p className="shrink-0 text-xs font-black text-slate-900">{bloque.bancas}</p>
                            </div>
                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: formatPct(bloque.bancas),
                                        backgroundColor: bloque.color
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
