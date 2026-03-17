import React, { useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const legendBottomSpacingPlugin = {
    id: 'legendBottomSpacingPlugin',
    beforeInit(chart) {
        if (!chart.legend) return;
        const originalFit = chart.legend.fit;
        chart.legend.fit = function fit() {
            originalFit.bind(this)();
            this.height += 14;
        };
    }
};

const historicalData = [
    { year: 1994, salaryUsd: 1290, rentUsd: 450 },
    { year: 2002, salaryUsd: 402, rentUsd: 150 },
    { year: 2012, salaryUsd: 1150, rentUsd: 510 },
    { year: 2017, salaryUsd: 1200, rentUsd: 480 },
    { year: 2021, salaryUsd: 550, rentUsd: 250 },
    { year: 2024, salaryUsd: 680, rentUsd: 450 },
    { year: 2026, salaryUsd: 1060, rentUsd: 540 }
];

const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
});

const labels = historicalData.map((item) => item.year);
const salarySeries = historicalData.map((item) => item.salaryUsd);
const rentSeries = historicalData.map((item) => item.rentUsd);

export default function SalarioAlquilerChart() {
    const [screenWidth, setScreenWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1024
    );

    useEffect(() => {
        const onResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const sizes = useMemo(() => {
        if (screenWidth < 420) {
            return {
                legend: 10,
                tick: 10,
                tooltipTitle: 11,
                tooltipBody: 10,
                tooltipPadding: 10,
                legendPadding: 10,
                point: 2,
                hoverPoint: 4,
                lineWidth: 2
            };
        }

        if (screenWidth < 640) {
            return {
                legend: 11,
                tick: 11,
                tooltipTitle: 12,
                tooltipBody: 11,
                tooltipPadding: 12,
                legendPadding: 12,
                point: 3,
                hoverPoint: 5,
                lineWidth: 2
            };
        }

        if (screenWidth < 1024) {
            return {
                legend: 12,
                tick: 12,
                tooltipTitle: 13,
                tooltipBody: 12,
                tooltipPadding: 14,
                legendPadding: 16,
                point: 3,
                hoverPoint: 5,
                lineWidth: 3
            };
        }

        return {
            legend: 14,
            tick: 13,
            tooltipTitle: 14,
            tooltipBody: 13,
            tooltipPadding: 16,
            legendPadding: 20,
            point: 4,
            hoverPoint: 6,
            lineWidth: 3
        };
    }, [screenWidth]);

    const data = {
        labels,
        datasets: [
            {
                label: '\u{1F4B5} Salario promedio',
                data: salarySeries,
                borderColor: '#0f766e',
                backgroundColor: '#0f766e',
                borderWidth: sizes.lineWidth,
                pointRadius: sizes.point,
                pointHoverRadius: sizes.hoverPoint,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#0f766e',
                pointBorderWidth: 2,
                tension: 0.25
            },
            {
                label: '\u{1F3E0} Alquiler 2 amb. CABA',
                data: rentSeries,
                borderColor: '#ea580c',
                backgroundColor: '#ea580c',
                borderWidth: sizes.lineWidth,
                pointRadius: sizes.point,
                pointHoverRadius: sizes.hoverPoint,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#ea580c',
                pointBorderWidth: 2,
                tension: 0.25
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
            mode: 'index'
        },
        plugins: {
            legend: {
                position: 'top',
                align: 'start',
                labels: {
                    usePointStyle: true,
                    boxWidth: 12,
                    padding: sizes.legendPadding,
                    color: '#334155',
                    font: {
                        size: sizes.legend,
                        weight: 600
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.94)',
                padding: sizes.tooltipPadding,
                cornerRadius: 10,
                titleColor: '#f8fafc',
                bodyColor: '#e2e8f0',
                titleFont: {
                    size: sizes.tooltipTitle,
                    weight: 700
                },
                bodyFont: {
                    size: sizes.tooltipBody
                },
                callbacks: {
                    title: (context) => `A\u00f1o ${context[0].label}`,
                    label: (context) => `${context.dataset.label}: ${usdFormatter.format(context.parsed.y)}`
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        size: sizes.tick
                    },
                    maxRotation: 0,
                    autoSkip: false,
                    callback(value, index) {
                        const year = labels[index];
                        if (this.chart.width < 420) {
                            return index % 2 === 0 ? year : '';
                        }
                        return year;
                    }
                }
            },
            y: {
                beginAtZero: true,
                suggestedMax: 1400,
                grid: {
                    color: '#e2e8f0'
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        size: sizes.tick
                    },
                    callback: (value) => usdFormatter.format(value)
                }
            }
        }
    };

    return <Line data={data} options={options} plugins={[legendBottomSpacingPlugin]} />;
}
