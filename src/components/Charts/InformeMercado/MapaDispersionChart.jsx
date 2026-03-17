import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  PointElement,
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
  opportunity: '#F43F5E',
  grid: 'rgba(51, 65, 85, 0.4)',
  text: '#94A3B8'
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  color: chartColors.text,
  plugins: {
    legend: {
      display: false
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
          const rawLabel = item.chart.data.datasets[item.datasetIndex].data[item.dataIndex].labelRaw;
          if (Array.isArray(rawLabel)) {
            return rawLabel.join(' ');
          }
          return rawLabel;
        },
        label: function (context) {
          return `Oferta: ${new Intl.NumberFormat('es-AR').format(context.parsed.x)} | Demanda: ${new Intl.NumberFormat('es-AR').format(context.parsed.y)}`;
        }
      }
    }
  },
  scales: {
    x: {
      grid: { color: chartColors.grid, drawBorder: false },
      ticks: { color: chartColors.text, font: { family: 'Inter' } },
      title: { display: true, text: 'Oferta (Profesionales)', color: chartColors.text }
    },
    y: {
      grid: { color: chartColors.grid, drawBorder: false },
      ticks: { color: chartColors.text, font: { family: 'Inter' } },
      title: { display: true, text: 'Demanda (Puestos)', color: chartColors.text }
    }
  }
};

const data = {
  datasets: [{
    label: 'Roles Tech',
    data: processedData.map((d, index) => ({
      x: d.oferta,
      y: d.demanda,
      labelRaw: chartLabels[index]
    })),
    backgroundColor: chartColors.opportunity,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    pointRadius: 8,
    pointHoverRadius: 10
  }]
};

export default function MapaDispersionChart() {
  return (
    <div className="h-full w-full">
      <Scatter data={data} options={options} />
    </div>
  );
}
