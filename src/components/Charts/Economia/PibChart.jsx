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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function PibChart() {
    const data = (canvas) => {
        const ctx = canvas.getContext('2d');
        const gradientPib = ctx.createLinearGradient(0, 0, 0, 400);
        gradientPib.addColorStop(0, '#34d399');
        gradientPib.addColorStop(1, '#059669');

        return {
            labels: ['EE.UU.', 'Eurozona', 'China', 'Japón', 'Latam'],
            datasets: [{
                label: 'Crecimiento Estimado %',
                data: [2.1, 0.8, 4.6, 0.9, 1.5],
                backgroundColor: gradientPib,
                barPercentage: 0.6
            }]
        };
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { display: false } },
            y: { grid: { color: '#f1f5f9' } }
        }
    };

    return <Bar data={data} options={options} />;
}
