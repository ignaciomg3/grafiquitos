import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const bloques = [
    { label: 'La Libertad Avanza', bancas: 95, color: '#7D2181' },
    { label: 'Fuerza Patria (K)', bancas: 93, color: '#00ADEF' },
    { label: 'PRO / Fuerza Cambio', bancas: 22, color: '#FFD700' },
    { label: 'Unidos (UCR/Fed.)', bancas: 22, color: '#E10019' },
    { label: 'Innovación Federal', bancas: 9, color: '#00A199' },
    { label: 'MID / Coherencia', bancas: 7, color: '#003366' },
    { label: 'FIT-U (Izquierda)', bancas: 4, color: '#CC0000' },
    { label: 'Otros Provinciales', bancas: 5, color: '#A0A0A0' },
];

const totalBancas = bloques.reduce((sum, b) => sum + b.bancas, 0);

const data = {
    labels: bloques.map(b => b.label),
    datasets: [{
        data: bloques.map(b => b.bancas),
        backgroundColor: bloques.map(b => b.color),
        borderColor: '#fff',
        borderWidth: 3,
        hoverOffset: 10,
    }]
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '55%',
    plugins: {
        legend: {
            position: 'right',
            labels: {
                font: { size: 12, family: "'Inter', sans-serif" },
                color: '#1e293b',
                padding: 14,
                usePointStyle: true,
                pointStyleWidth: 10,
                generateLabels: (chart) =>
                    chart.data.labels.map((label, i) => ({
                        text: `${label}  (${bloques[i].bancas})`,
                        fillStyle: bloques[i].color,
                        strokeStyle: '#fff',
                        lineWidth: 2,
                        pointStyle: 'circle',
                        index: i,
                        hidden: false,
                    }))
            }
        },
        tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleFont: { size: 13, weight: 'bold' },
            bodyFont: { size: 12 },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
                label: (ctx) => {
                    const bancas = ctx.parsed;
                    const pct = ((bancas / totalBancas) * 100).toFixed(1);
                    return `  ${bancas} bancas  (${pct}%)`;
                }
            }
        }
    }
};

export default function DiputadosChart() {
    return (
        <div className="h-full w-full flex flex-col">
            {/* Doughnut */}
            <div className="flex-1 min-h-0">
                <Doughnut data={data} options={options} />
            </div>

            {/* Centro label */}
            <p className="text-center text-xs text-slate-400 mt-3 font-medium tracking-wide uppercase">
                Total: {totalBancas} bancas  •  Cámara de Diputados 2026
            </p>
        </div>
    );
}
