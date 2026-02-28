import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const labelsJobs = [
    'Ingeniero de IA / Machine Learning',
    'Científico de Datos',
    'Especialista en Ciberseguridad',
    'Arquitecto Cloud',
    'Desarrollador Full Stack',
    'Técnico en Energías Renovables',
    'Especialista en Automatización',
    'Coordinador de Telemedicina',
    'Experto en UX/UI',
    'Analista de Sostenibilidad'
];

export default function GapChart() {
    const [showTicks, setShowTicks] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const handleResize = () => setShowTicks(window.innerWidth >= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const data = {
        labels: labelsJobs,
        datasets: [
            {
                label: 'Demanda (Vacantes)',
                data: [450, 380, 350, 310, 290, 240, 210, 180, 160, 120],
                backgroundColor: '#1e3a8a',
                borderRadius: 4
            },
            {
                label: 'Oferta (Profesionales)',
                data: [120, 150, 110, 180, 250, 130, 90, 140, 130, 60],
                backgroundColor: '#14b8a6',
                borderRadius: 4
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' }
        },
        scales: {
            x: {
                ticks: {
                    display: showTicks
                }
            },
            y: { beginAtZero: true }
        }
    };

    return <Bar data={data} options={options} />;
}
