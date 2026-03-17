import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import OfertaDemandaChart from '../components/Charts/PuestosDemandados/OfertaDemandaChart';
import MapaDispersionChart from '../components/Charts/InformeMercado/MapaDispersionChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
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
  opportunity: '#17be65ff',
  grid: 'rgba(51, 65, 85, 0.4)',
  text: '#94A3B8'
};

const commonOptions = {
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

export default function InformeMercado() {
  const opportunityData = {
    labels: chartLabels,
    datasets: [{
      label: 'Oportunidad (Brecha de Puestos)',
      data: processedData.map(d => d.oportunidad),
      backgroundColor: chartColors.opportunity,
      borderRadius: 6,
      borderWidth: 0
    }]
  };

  return (
    <div className="bg-[#0F172A] text-[#F8FAFC] antialiased min-h-screen pb-20 -mx-4 md:-mx-8 -my-4 md:-my-8 px-4 md:px-8 pt-10">
      <header className="pt-16 pb-12 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-block px-4 py-1 rounded-full bg-blue-900/50 text-blue-400 font-semibold text-sm mb-4 border border-blue-800">
          📊 Reporte de Mercado Global 2024-2026
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          La Matriz de Oportunidad <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#10B981]">Talento Tech Global</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Un análisis detallado de la disparidad entre la demanda corporativa y la oferta de profesionales capacitados
          en el sector tecnológico. Hemos calculado la <strong>Oportunidad</strong> (Demanda - Oferta) para
          identificar los roles más críticos y lucrativos del futuro cercano.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <section className="bg-slate-800/70 border border-slate-700/50 backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-2xl">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
              <span className="text-3xl">🚀</span> Ranking de Oportunidad
            </h2>
            <p className="text-slate-400">
              Este gráfico ordena los puestos tecnológicos desde la mayor brecha de talento hasta la menor. La
              "Oportunidad" representa el numbero neto de puestos de trabajo globales que no pueden ser cubiertos
              por la oferta actual de profesionales.
            </p>
          </div>

          <div className="h-[450px] md:h-[600px] w-full">
            <Bar
              data={opportunityData}
              options={{
                ...commonOptions,
                indexAxis: 'y',
                plugins: {
                  ...commonOptions.plugins,
                  legend: { display: false }
                },
                scales: {
                  x: {
                    ...commonOptions.scales.x,
                    title: { display: true, text: 'Cantidad de Puestos', color: chartColors.text }
                  },
                  y: {
                    ...commonOptions.scales.y,
                    ticks: { ...commonOptions.scales.y.ticks, autoSkip: false }
                  }
                }
              }}
            />
          </div>
        </section>

        <section className="bg-slate-800/70 border border-slate-700/50 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="text-2xl">⚖️</span> Oferta vs. Demanda Bruta
            </h2>
            <p className="text-slate-400 text-sm">
              Comparación directa de los volúmenes totales. Aunque algunos puestos tienen una demanda masiva
              (como Full Stack Developer), también poseen una oferta inmensa. Otros roles son más de nicho
              pero críticos.
            </p>
          </div>

          <div className="h-[350px] md:h-[450px] w-full">
            <OfertaDemandaChart />
          </div>
        </section>

        <section className="bg-slate-800/70 border border-slate-700/50 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="text-2xl">🎯</span> Mapa de Dispersión del Mercado
            </h2>
            <p className="text-slate-400 text-sm mb-8">
              Visualización del ecosistema. El Eje X representa la Oferta y el Eje Y la Demanda. Los puntos
              más alejados hacia la esquina superior izquierda representan las mayores crisis de talento.
            </p>
          </div>

          <div className="h-[350px] md:h-[450px] w-full">
            <MapaDispersionChart />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-10">Conclusiones Clave</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-rose-500/10 to-transparent border border-rose-500/20 rounded-xl p-6 transition transform hover:-translate-y-1">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2 text-rose-400">Crisis en Ciberseguridad</h3>
              <p className="text-slate-300 text-sm">
                Con un déficit de 2.5 millones de profesionales, la ciberseguridad es el área más crítica. La
                digitalización acelerada superó con creces la formación de expertos en seguridad.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl p-6 transition transform hover:-translate-y-1">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-bold mb-2 text-blue-400">La Paradoja Full Stack</h3>
              <p className="text-slate-300 text-sm">
                A pesar de ser el rol con mayor cantidad de profesionales (3.5M), la demanda es tan gigantesca
                (5M) que sigue presentando la segunda mayor oportunidad absoluta del mercado.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-xl p-6 transition transform hover:-translate-y-1">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-2 text-emerald-400">El Boom de la IA y Datos</h3>
              <p className="text-slate-300 text-sm">
                Data Scientists y AI/ML Engineers combinados representan un déficit de 2.3 millones de puestos.
                La explosión de la IA generativa está secando rápidamente el talento disponible.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
