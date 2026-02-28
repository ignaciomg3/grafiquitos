import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GenerativeAiChart() {
    const data = {
        labels: ['A gran escala', 'Piloto', 'En evaluación', 'Sin planes'],
        datasets: [{
            data: [25, 35, 30, 10],
            backgroundColor: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ede9fe'],
            borderWidth: 0
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false
    };

    return <Doughnut data={data} options={options} />;
}
