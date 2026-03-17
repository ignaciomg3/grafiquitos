import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function AprobacionChart() {
    const data = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Desaprueba',
                data: [45, 48, 52, 50, 47, 49],
                borderColor: '#ef4444',
                tension: 0.3,
                fill: false
            },
            {
                label: 'Aprueba',
                data: [42, 40, 38, 41, 45, 44],
                borderColor: '#3b82f6',
                tension: 0.3,
                fill: false
            }
        ]
    };

    return <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />;
}
