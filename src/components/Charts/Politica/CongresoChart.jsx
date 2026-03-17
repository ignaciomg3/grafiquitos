import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CongresoChart() {
    const data = {
        labels: ['Oficialismo', 'Oposición Principal', 'Tercera Vía', 'Independientes'],
        datasets: [{
            data: [120, 95, 30, 12],
            backgroundColor: ['#2e1065', '#fbbf24', '#0ea5e9', '#94a3b8'],
            borderWidth: 1
        }]
    };

    return <Pie data={data} options={{ responsive: true, maintainAspectRatio: false }} />;
}
