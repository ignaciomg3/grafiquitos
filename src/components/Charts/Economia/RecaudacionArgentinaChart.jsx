import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const detallesRecaudacion = [
    {
        concepto: 'IVA (Impuesto al Valor Agregado)',
        porcentaje: 33.0,
        montoUsd: 33660000000
    },
    {
        concepto: 'Aportes y Contribuciones a la Seguridad Social',
        porcentaje: 22.0,
        montoUsd: 22440000000
    },
    {
        concepto: 'Impuesto a las Ganancias',
        porcentaje: 20.0,
        montoUsd: 20400000000
    },
    {
        concepto: 'Derechos de Comercio Exterior (Retenciones y Aranceles)',
        porcentaje: 10.0,
        montoUsd: 10200000000
    },
    {
        concepto: 'Impuesto a los Créditos y Débitos (Cheque)',
        porcentaje: 7.0,
        montoUsd: 7140000000
    },
    {
        concepto: 'Otros Impuestos y Tasas (Combustibles, PAIS, etc.)',
        porcentaje: 8.0,
        montoUsd: 8160000000
    }
];

const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
});

export default function RecaudacionArgentinaChart() {
    const data = {
        labels: detallesRecaudacion.map((detalle) => detalle.concepto),
        datasets: [
            {
                data: detallesRecaudacion.map((detalle) => detalle.porcentaje),
                backgroundColor: ['#1d4ed8', '#0891b2', '#16a34a', '#f59e0b', '#8b5cf6', '#ef4444'],
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
                        const detalle = detallesRecaudacion[context.dataIndex];
                        return `${detalle.porcentaje}% - ${usdFormatter.format(detalle.montoUsd)}`;
                    }
                }
            }
        }
    };

    return <Pie data={data} options={options} />;
}
