import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export default function IotChart() {
    const data = {
        labels: ['2022', '2023', '2024', '2025', '2026'],
        datasets: [{
            label: 'Miles de Millones',
            data: [13.1, 15.1, 17.5, 20.2, 23.4],
            borderColor: '#06b6d4',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            fill: true,
            tension: 0.3
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false
    };

    return <Line data={data} options={options} />;
}
