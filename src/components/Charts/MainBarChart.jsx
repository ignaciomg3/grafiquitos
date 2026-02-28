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

const jobData = [
    { puesto: "AI / Machine Learning Engineer", demanda: 150000, oferta: 45000, desc: "Desarrollo de modelos LLM y algoritmos predictivos." },
    { puesto: "Data Scientist", demanda: 120000, oferta: 80000, desc: "Análisis de big data para toma de decisiones." },
    { puesto: "Cybersecurity Specialist", demanda: 100000, oferta: 60000, desc: "Protección de infraestructura y datos críticos." },
    { puesto: "Cloud Architect", demanda: 90000, oferta: 55000, desc: "Diseño de soluciones escalables en AWS/Azure." },
    { puesto: "Full Stack Developer", demanda: 85000, oferta: 82000, desc: "Desarrollo web integral (Frontend & Backend)." },
    { puesto: "DevOps Engineer", demanda: 75000, oferta: 50000, desc: "Automatización de CI/CD y gestión de servidores." },
    { puesto: "UX/UI Designer", demanda: 60000, oferta: 55000, desc: "Diseño de interfaces y experiencia de usuario." },
    { puesto: "Digital Marketing Growth", demanda: 55000, oferta: 65000, desc: "Estrategias de adquisición y retención digital." },
    { puesto: "Blockchain Developer", demanda: 40000, oferta: 15000, desc: "Desarrollo de contratos inteligentes y dApps." },
    { puesto: "Sustainability Manager", demanda: 35000, oferta: 10000, desc: "Gestión de cumplimiento ESG y huella de carbono." }
];

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

export { jobData };

export default function MainBarChart() {
    const labelsWrapped = jobData.map(j => wrapLabel(j.puesto, 16));

    const data = {
        labels: labelsWrapped,
        datasets: [
            {
                label: ' Demanda (Vacantes)',
                data: jobData.map(j => j.demanda),
                backgroundColor: '#5088D4',
                borderRadius: 4,
                barPercentage: 0.6,
                categoryPercentage: 0.8
            },
            {
                label: ' Oferta (Profesionales)',
                data: jobData.map(j => j.oferta),
                backgroundColor: '#8B0000',
                borderRadius: 4,
                barPercentage: 0.6,
                categoryPercentage: 0.8
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
                title: { display: true, text: 'Cantidad de Puestos' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#000000', font: { weight: 'bold', size: 13 } }
            }
        }
    };

    return <Bar data={data} options={options} />;
}
