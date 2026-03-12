import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

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

const wrapLabel = (label) => {
  if (label.length <= 16) return label;
  const words = label.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    if (currentLine.length + 1 + words[i].length <= 16) {
      currentLine += ' ' + words[i];
    } else {
      lines.push(currentLine);
      currentLine = words[i];
    }
  }
  lines.push(currentLine);
  return lines;
};

const chartLabels = processedData.map(d => wrapLabel(d.puesto));

const chartColors = {
  demand: '#00b0dcff',
  supply: '#8864b5ff',
  opportunity: '#74bd7fff',
  grid: 'rgba(51, 65, 85, 0.4)',
  text: '#94A3B8'
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  color: chartColors.text,
  plugins: {
    legend: {
      labels: { color: chartColors.text, font: { family: 'Inter', size: 13 } }
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      titleFont: { family: 'Inter', size: 14 },
      bodyFont: { family: 'Inter', size: 13 },
      padding: 12,
      cornerRadius: 8,
      callbacks: {
        title: function (tooltipItems) {
          const item = tooltipItems[0];
          let label = item.chart.data.labels[item.dataIndex];
          if (Array.isArray(label)) {
            return label.join(' ');
          } else {
            return label;
          }
        },
        label: function (context) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat('es-AR').format(context.parsed.y);
          }
          return label;
        }
      }
    }
  },
  scales: {
    x: {
      grid: { color: chartColors.grid, drawBorder: false },
      ticks: { color: chartColors.text, font: { family: 'Inter' } }
    },
    y: {
      grid: { color: chartColors.grid, drawBorder: false },
      ticks: { color: chartColors.text, font: { family: 'Inter' } }
    }
  }
};

const data = {
  labels: chartLabels,
  datasets: [
    {
      label: 'Demanda',
      data: processedData.map(d => d.demanda),
      backgroundColor: chartColors.demand,
      borderRadius: 4
    },
    {
      label: 'Oferta',
      data: processedData.map(d => d.oferta),
      backgroundColor: chartColors.supply,
      borderRadius: 4
    },
    {
      label: 'Oportunidad',
      data: processedData.map(d => d.oportunidad),
      backgroundColor: chartColors.opportunity,
      borderRadius: 4
    }
  ]
};

export default function OfertaDemandaChart() {
  return (
    <div className="h-full w-full">
      <Bar data={data} options={options} />
    </div>
  );
}
