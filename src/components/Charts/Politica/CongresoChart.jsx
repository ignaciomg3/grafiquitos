import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const grupos = [
    { label: 'Oficialismo', bancas: 120, color: '#7c3aed', softColor: '#ede9fe' },
    { label: 'Oposicion principal', bancas: 95, color: '#f59e0b', softColor: '#fef3c7' },
    { label: 'Tercera via', bancas: 30, color: '#0284c7', softColor: '#e0f2fe' },
    { label: 'Independientes', bancas: 12, color: '#64748b', softColor: '#e2e8f0' }
];

const totalBancas = grupos.reduce((sum, grupo) => sum + grupo.bancas, 0);
const formatPct = (bancas) => `${((bancas / totalBancas) * 100).toFixed(1)}%`;

const centerLabelPlugin = {
    id: 'congresoCenterLabel',
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
        ctx.fillText(totalBancas, x, y - 8);
        ctx.fillStyle = '#64748b';
        ctx.font = '700 11px Inter, sans-serif';
        ctx.fillText('bancas', x, y + 12);
        ctx.restore();
    }
};

const data = {
    labels: grupos.map((grupo) => grupo.label),
    datasets: [{
        data: grupos.map((grupo) => grupo.bancas),
        backgroundColor: grupos.map((grupo) => grupo.color),
        borderColor: '#f8fafc',
        borderRadius: 6,
        borderWidth: 4,
        hoverBorderColor: '#ffffff',
        hoverOffset: 12,
        spacing: 3
    }]
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '62%',
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            borderColor: 'rgba(148, 163, 184, 0.35)',
            borderWidth: 1,
            displayColors: false,
            padding: 12,
            cornerRadius: 8,
            callbacks: {
                label(context) {
                    const bancas = context.parsed;
                    return ` ${bancas} bancas (${formatPct(bancas)})`;
                }
            }
        }
    }
};

export default function CongresoChart() {
    return (
        <div className="h-full w-full grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_12rem] gap-4 rounded-xl border border-slate-100 bg-gradient-to-br from-slate-50 via-white to-amber-50/60 p-3">
            <div className="min-h-0">
                <Doughnut data={data} options={options} plugins={[centerLabelPlugin]} />
            </div>

            <div className="min-h-0 overflow-y-auto pr-1 space-y-2">
                {grupos.map((grupo) => (
                    <div className="rounded-lg border border-slate-200 bg-white/85 p-2 shadow-sm" key={grupo.label}>
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex min-w-0 items-center gap-2">
                                <span
                                    aria-hidden="true"
                                    className="h-2.5 w-2.5 shrink-0 rounded-full ring-4"
                                    style={{
                                        backgroundColor: grupo.color,
                                        '--tw-ring-color': grupo.softColor
                                    }}
                                />
                                <p className="truncate text-xs font-bold text-slate-700">{grupo.label}</p>
                            </div>
                            <p className="shrink-0 text-xs font-black text-slate-900">{grupo.bancas}</p>
                        </div>
                        <p className="mt-1 text-[11px] font-semibold text-slate-500">{formatPct(grupo.bancas)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
