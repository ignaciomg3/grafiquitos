import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    defaults
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

// Configure defaults
defaults.font.family = "'Aldrich', sans-serif";

export default function RamChartJs() {
    const getFontSize = (isX) => {
        if (typeof window === 'undefined') return 12;
        return window.innerWidth < 768 ? 10 : (isX ? 14 : 12);
    };

    const [fontSizes, setFontSizes] = useState({ x: getFontSize(true), y: getFontSize(false) });

    useEffect(() => {
        const handleResize = () => {
            setFontSizes({ x: getFontSize(true), y: getFontSize(false) });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const data = {
        labels: ["2020", "2021", "2022", "2023", "2024", "2025", "2026"],
        datasets: [
            {
                label: 'RAM USD',
                data: [4.50, 5.15, 3.90, 2.60, 3.10, 7.50, 12.50],
                backgroundColor: 'rgba(0, 255, 198, 0.1)',
                borderColor: "#00FFC6",
                borderWidth: 3,
                tension: 0.3,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: "#00FFC6",
                pointBorderColor: "#ffffff",
                pointHoverRadius: 7
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: "rgba(17, 17, 17, 0.9)",
                titleColor: "#00FFC6",
                bodyColor: "#fff",
                padding: 12,
                cornerRadius: 8,
                titleFont: { family: "'Aldrich', sans-serif" },
                bodyFont: { family: "'Aldrich', sans-serif" }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: "rgba(255, 255, 255, 0.7)",
                    font: {
                        family: "'Aldrich', sans-serif",
                        size: fontSizes.x
                    }
                },
                grid: {
                    color: "rgba(255,255,255,0.05)"
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: "rgba(255, 255, 255, 0.7)",
                    font: {
                        family: "'Aldrich', sans-serif",
                        size: fontSizes.y
                    },
                    callback: (value) => '$' + value
                },
                grid: {
                    color: "rgba(255,255,255,0.05)"
                }
            }
        }
    };

    return <Line data={data} options={options} />;
}
