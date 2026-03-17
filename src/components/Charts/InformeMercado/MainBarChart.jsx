import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const rawData = [
    { puesto: "Cybersecurity Specialist", demanda: 3500000, oferta: 1000000 },
    { puesto: "Full Stack Developer", demanda: 5000000, oferta: 3500000 },
    { puesto: "Data Scientist", demanda: 2000000, oferta: 800000 },
    { puesto: "Cloud Architect", demanda: 1800000, oferta: 600000 },
    { puesto: "AI / Machine Learning Engineer", demanda: 1500000, oferta: 400000 },
    { puesto: "DevOps Engineer", demanda: 1200000, oferta: 500000 },
    { puesto: "Digital Marketing Growth", demanda: 2500000, oferta: 2200000 },
    { puesto: "Sustainability Manager", demanda: 400000, oferta: 150000 },
    { puesto: "UX/UI Designer", demanda: 1000000, oferta: 850000 },
    { puesto: "Blockchain Developer", demanda: 300000, oferta: 150000 }
];

const processedData = rawData.map(item => ({
    ...item,
    oportunidad: item.demanda - item.oferta
})).sort((a, b) => b.oportunidad - a.oportunidad);

function wrapLabel(str, maxChars) {
    if (str.length <= maxChars) return str;
    const words = str.split(' ');
    const lines = [];
    let currentLine = words[0];
    for (let i = 1; i < words.length; i++) {
        if ((currentLine + ' ' + words[i]).length < maxChars) {
            currentLine += ' ' + words[i];
        } else {
            lines.push(currentLine);
            currentLine = words[i];
        }
    }
    lines.push(currentLine);
    return lines;
}

export default function MainBarChart() {
    const labelsWrapped = processedData.map(j => wrapLabel(j.puesto, 20));

    const data = {
        labels: labelsWrapped,
        datasets: [
            {
                label: ' Demanda',
                data: processedData.map(j => j.demanda),
                backgroundColor: '#00b0dcff',
                borderRadius: 4,
            },
            {
                label: ' Oferta',
                data: processedData.map(j => j.oferta),
                backgroundColor: '#8864b5ff',
                borderRadius: 4,
            },
            {
                label: ' Oportunidad',
                data: processedData.map(j => j.oportunidad),
                backgroundColor: '#74bd7fff',
                borderRadius: 4,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: { usePointStyle: true, boxWidth: 8, font: { size: 14, weight: 'bold' } }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    title: (items) => {
                        const label = items[0].chart.data.labels[items[0].dataIndex];
                        return Array.isArray(label) ? label.join(' ') : label;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: '#e5e7eb' },
                title: { display: true, text: 'Cantidad de Puestos', font: { size: 14, weight: 'bold' } },
                ticks: { font: { size: 12 } }
            },
            x: {
                grid: { display: false },
                ticks: {
                    color: '#4b5563',
                    font: { weight: 'bold', size: 12 },
                    maxRotation: 45,
                    minRotation: 0,
                    padding: 4
                }
            }
        }
    };

    return <Bar data={data} options={options} />;
}
