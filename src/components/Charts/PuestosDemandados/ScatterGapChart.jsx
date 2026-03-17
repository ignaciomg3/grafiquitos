import React from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const jobData = [
    { puesto: "AI / Machine Learning Engineer", demanda: 150000, oferta: 45000 },
    { puesto: "Data Scientist", demanda: 120000, oferta: 80000 },
    { puesto: "Cybersecurity Specialist", demanda: 100000, oferta: 60000 },
    { puesto: "Cloud Architect", demanda: 90000, oferta: 55000 },
    { puesto: "Full Stack Developer", demanda: 85000, oferta: 82000 },
    { puesto: "DevOps Engineer", demanda: 75000, oferta: 50000 },
    { puesto: "UX/UI Designer", demanda: 60000, oferta: 55000 },
    { puesto: "Digital Marketing Growth", demanda: 55000, oferta: 65000 },
    { puesto: "Blockchain Developer", demanda: 40000, oferta: 15000 },
    { puesto: "Sustainability Manager", demanda: 35000, oferta: 10000 }
];

export default function ScatterGapChart() {
    const scatterData = jobData.map(job => ({
        x: job.oferta,
        y: job.demanda,
        r: Math.max(6, (job.demanda - job.oferta) / 2000),
        jobName: job.puesto,
        gap: job.demanda - job.oferta
    }));

    const data = {
        datasets: [{
            label: 'Puestos (Tamaño = Brecha)',
            data: scatterData,
            backgroundColor: 'rgba(245, 158, 11, 0.7)',
            borderColor: '#F59E0B',
            borderWidth: 1
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    title: () => '',
                    label: (ctx) => {
                        const item = ctx.raw;
                        return [
                            `${item.jobName}`,
                            `Demanda: ${item.y.toLocaleString()}`,
                            `Oferta: ${item.x.toLocaleString()}`,
                            `Brecha: ${item.gap.toLocaleString()} faltantes`
                        ];
                    }
                },
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                padding: 10
            }
        },
        scales: {
            x: {
                title: { display: true, text: 'Oferta de Profesionales (Disponibles)' },
                grid: { color: '#f3f4f6' }
            },
            y: {
                title: { display: true, text: 'Demanda de Mercado (Vacantes)' },
                grid: { color: '#f3f4f6' }
            }
        }
    };

    return <Bubble data={data} options={options} />;
}
