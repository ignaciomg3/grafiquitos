import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend);

const inflationLabels = [
    'Ene 19', 'Feb 19', 'Mar 19', 'Abr 19', 'May 19', 'Jun 19', 'Jul 19', 'Ago 19', 'Sep 19', 'Oct 19', 'Nov 19', 'Dic 19',
    'Ene 20', 'Feb 20', 'Mar 20', 'Abr 20', 'May 20', 'Jun 20', 'Jul 20', 'Ago 20', 'Sep 20', 'Oct 20', 'Nov 20', 'Dic 20',
    'Ene 21', 'Feb 21', 'Mar 21', 'Abr 21', 'May 21', 'Jun 21', 'Jul 21', 'Ago 21', 'Sep 21', 'Oct 21', 'Nov 21', 'Dic 21',
    'Ene 22', 'Feb 22', 'Mar 22', 'Abr 22', 'May 22', 'Jun 22', 'Jul 22', 'Ago 22', 'Sep 22', 'Oct 22', 'Nov 22', 'Dic 22',
    'Ene 23', 'Feb 23', 'Mar 23', 'Abr 23', 'May 23', 'Jun 23', 'Jul 23', 'Ago 23', 'Sep 23', 'Oct 23', 'Nov 23', 'Dic 23',
    'Ene 24', 'Feb 24', 'Mar 24', 'Abr 24', 'May 24', 'Jun 24', 'Jul 24', 'Ago 24', 'Sep 24', 'Oct 24', 'Nov 24', 'Dic 24',
    'Ene 25', 'Feb 25', 'Mar 25', 'Abr 25', 'May 25', 'Jun 25', 'Jul 25', 'Ago 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dic 25',
    'Ene 26'
];

const inflationData = [
    2.9, 3.8, 4.7, 3.4, 3.1, 2.7, 2.2, 4.0, 5.9, 3.3, 4.3, 3.7,
    2.3, 2.0, 3.3, 1.5, 1.5, 2.2, 1.9, 2.7, 2.8, 3.8, 3.2, 4.0,
    4.0, 3.6, 4.8, 4.1, 3.3, 3.2, 3.0, 2.5, 3.5, 3.5, 2.5, 3.8,
    3.9, 4.7, 6.7, 6.0, 5.1, 5.3, 7.4, 7.0, 6.2, 6.3, 4.9, 5.1,
    6.0, 6.6, 7.7, 8.4, 7.8, 6.0, 6.3, 12.4, 12.7, 8.3, 12.8, 25.5,
    20.6, 13.2, 11.0, 8.8, 4.2, 4.6, 4.0, 4.2, 3.5, 2.7, 2.4, 2.7,
    2.2, 2.4, 3.7, 2.8, 1.5, 1.6, 1.9, 1.9, 2.1, 2.3, 2.5, 2.8,
    2.9
];

export default function InflacionChart() {
    const data = {
        labels: inflationLabels,
        datasets: [{
            label: 'Inflación Mensual %',
            data: inflationData,
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            fill: true,
            tension: 0.3,
            borderWidth: 2,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#ef4444',
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHitRadius: 10
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    maxTicksLimit: 12,
                    color: '#64748b',
                    font: { size: 11 }
                }
            },
            y: {
                beginAtZero: true,
                grid: { color: '#f1f5f9' },
                ticks: {
                    color: '#64748b',
                    font: { size: 11 },
                    callback: (value) => value + '%'
                }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    label: (context) => ` Inflación: ${context.parsed.y}%`
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    };

    return <Line data={data} options={options} />;
}
