import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import branding from '../../../theme/branding';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GenerativeAiChart() {
    const data = {
        labels: ['A gran escala', 'Piloto', 'En evaluación', 'Sin planes'],
        datasets: [{
            data: [25, 35, 30, 10],
            backgroundColor: branding.charts.violetScale,
            borderWidth: 0
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false
    };

    return <Doughnut data={data} options={options} />;
}
