import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const bloques = [
    { label: 'Union por la Patria', bancas: 22, color: '#075985', softColor: '#e0f2fe' },
    { label: 'La Libertad Avanza', bancas: 21, color: '#7c3aed', softColor: '#ede9fe' },
    { label: 'Union Civica Radical', bancas: 10, color: '#dc2626', softColor: '#fee2e2' },
    { label: 'Impulso Pais', bancas: 7, color: '#f59e0b', softColor: '#fef3c7' },
    { label: 'Conviccion Federal', bancas: 4, color: '#0891b2', softColor: '#cffafe' },
    { label: 'Otros Provinciales', bancas: 8, color: '#64748b', softColor: '#e2e8f0' }
];

const totalBancas = bloques.reduce((sum, bloque) => sum + bloque.bancas, 0);
const bloquePrincipal = bloques.reduce((max, bloque) => (
    bloque.bancas > max.bancas ? bloque : max
), bloques[0]);

const formatPct = (bancas) => `${((bancas / totalBancas) * 100).toFixed(1)}%`;

const centerLabelPlugin = {
    id: 'senadoresCenterLabel',
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
        ctx.fillStyle = '#0f172a';
        ctx.font = '800 22px Inter, sans-serif';
        ctx.fillText(totalBancas, x, y - 10);
        ctx.fillStyle = '#64748b';
        ctx.font = '700 11px Inter, sans-serif';
        ctx.fillText('bancas', x, y + 10);
        ctx.fillStyle = '#075985';
        ctx.font = '700 10px Inter, sans-serif';
        ctx.fillText('Senado', x, y + 28);
        ctx.restore();
    }
};

const data = {
    labels: bloques.map((bloque) => bloque.label),
    datasets: [{
        data: bloques.map((bloque) => bloque.bancas),
        backgroundColor: bloques.map((bloque) => bloque.color),
        borderColor: '#f8fafc',
        borderRadius: 5,
        borderWidth: 3,
        hoverBorderColor: '#ffffff',
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
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            borderColor: 'rgba(148, 163, 184, 0.35)',
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

export default function SenadoresChart() {
    return (
        <div className="h-full w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_13rem] gap-4">
            <div className="min-h-0 rounded-xl bg-gradient-to-br from-slate-50 via-white to-sky-50/70 border border-slate-100 p-3">
                <Doughnut data={data} options={options} plugins={[centerLabelPlugin]} />
            </div>

            <div className="min-h-0 overflow-y-auto pr-1">
                <div className="mb-3 border-l-4 border-sky-700 pl-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-sky-700">
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
