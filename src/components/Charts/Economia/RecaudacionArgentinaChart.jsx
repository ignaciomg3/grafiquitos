import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const detallesGastoAnual = [
    {
        finalidad: 'Seguridad Social',
        descripcion: 'Jubilaciones, pensiones, asignaciones y planes sociales',
        porcentaje: 56.5,
        montoUsd: 57630000000
    },
    {
        finalidad: 'Servicios Economicos y Subsidios',
        descripcion: 'Subsidios a energia (luz/gas), transporte y obra publica',
        porcentaje: 11.5,
        montoUsd: 11730000000
    },
    {
        finalidad: 'Deuda Publica',
        descripcion: 'Pago de intereses de la deuda interna y externa',
        porcentaje: 10.0,
        montoUsd: 10200000000
    },
    {
        finalidad: 'Educacion, Ciencia y Tecnica',
        descripcion: 'Universidades nacionales, Conicet y programas educativos',
        porcentaje: 7.0,
        montoUsd: 7140000000
    },
    {
        finalidad: 'Salud',
        descripcion: 'Hospitales federales, PAMI, vacunas y programas sanitarios',
        porcentaje: 5.0,
        montoUsd: 5100000000
    },
    {
        finalidad: 'Defensa y Seguridad',
        descripcion: 'Fuerzas federales, policia, gendarmeria y fronteras',
        porcentaje: 5.0,
        montoUsd: 5100000000
    },
    {
        finalidad: 'Administracion Central y Justicia',
        descripcion: 'Funcionamiento de los Poderes Ejecutivo, Legislativo y Judicial',
        porcentaje: 5.0,
        montoUsd: 5100000000
    }
];

const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
});

export default function RecaudacionArgentinaChart() {
    const data = {
        labels: detallesGastoAnual.map((detalle) => detalle.finalidad),
        datasets: [
            {
                data: detallesGastoAnual.map((detalle) => detalle.porcentaje),
                backgroundColor: ['#1d4ed8', '#0891b2', '#16a34a', '#f59e0b', '#8b5cf6', '#ef4444', '#f97316'],
                borderColor: '#ffffff',
                borderWidth: 2
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            },
            tooltip: {
                callbacks: {
                    label(context) {
                        const detalle = detallesGastoAnual[context.dataIndex];
                        return `${detalle.porcentaje}% - ${usdFormatter.format(detalle.montoUsd)} (${detalle.descripcion})`;
                    }
                }
            }
        }
    };

    return <Pie data={data} options={options} />;
}
