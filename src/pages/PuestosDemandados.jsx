import React, { useState } from 'react';
import OfertaDemandaChart from '../components/Charts/PuestosDemandados/OfertaDemandaChart';
import ScatterGapChart from '../components/Charts/PuestosDemandados/ScatterGapChart';

const jobData = [
    { puesto: "Cybersecurity Specialist", demanda: 3500000, oferta: 1000000, desc: "Protección de infraestructura y datos críticos." },
    { puesto: "Full Stack Developer", demanda: 5000000, oferta: 3500000, desc: "Desarrollo web integral (Frontend & Backend)." },
    { puesto: "Data Scientist", demanda: 2000000, oferta: 800000, desc: "Análisis de big data para toma de decisiones." },
    { puesto: "Cloud Architect", demanda: 1800000, oferta: 600000, desc: "Diseño de soluciones escalables en AWS/Azure." },
    { puesto: "AI / Machine Learning Engineer", demanda: 1500000, oferta: 400000, desc: "Desarrollo de modelos LLM y algoritmos predictivos." },
    { puesto: "DevOps Engineer", demanda: 1200000, oferta: 500000, desc: "Automatización de CI/CD y gestión de servidores." },
    { puesto: "Digital Marketing Growth", demanda: 2500000, oferta: 2200000, desc: "Estrategias de adquisición y retención digital." },
    { puesto: "Sustainability Manager", demanda: 400000, oferta: 150000, desc: "Gestión de cumplimiento ESG y huella de carbono." },
    { puesto: "UX/UI Designer", demanda: 1000000, oferta: 850000, desc: "Diseño de interfaces y experiencia de usuario." },
    { puesto: "Blockchain Developer", demanda: 300000, oferta: 150000, desc: "Desarrollo de contratos inteligentes y dApps." }
];

const formattedJson = jobData.map(({ puesto, demanda, oferta }) => ({ puesto, demanda, oferta }));

function JobCard({ job, index }) {
    const gap = job.demanda - job.oferta;
    const percentage = Math.round((job.oferta / job.demanda) * 100);
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-800 text-lg">{job.puesto}</h4>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded whitespace-nowrap ml-2">Top {index + 1}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{job.desc}</p>
            </div>
            <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-gray-600">Cobertura de Talento</span>
                    <span className={`font-bold ${percentage < 50 ? 'text-red-500' : 'text-green-500'}`}>{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <p className="text-xs text-right mt-1 text-gray-400">Faltan {gap.toLocaleString()} profesionales</p>
            </div>
        </div>
    );
}

export default function PuestosDemandados() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(formattedJson, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="text-gray-800">
            {/* Hero */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-6 text-center rounded-2xl mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Los puestos más demandados</h1>
                <p className="text-xl text-blue-100 max-w-5xl mx-auto">
                    Análisis de la brecha crítica entre la oferta profesional y la demanda del mercado tecnológico actual.
                </p>
                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                        <p className="text-3xl font-bold">19.2M</p>
                        <p className="text-sm text-blue-200 uppercase tracking-wide">Vacantes Totales</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                        <p className="text-3xl font-bold text-amber-400">47%</p>
                        <p className="text-sm text-blue-200 uppercase tracking-wide">Déficit Promedio</p>
                    </div>
                </div>
            </section>

            {/* Section 1: Bar Chart */}
            <section className="py-8">
                <div className="mb-8 text-center max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Oferta vs. Demanda Global</h2>
                    <p className="text-gray-600">
                        Comparativa del volumen de vacantes abiertas (Demanda) contra profesionales calificados disponibles (Oferta).
                        La diferencia visual representa la oportunidad de inserción laboral.
                    </p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 shadow-inner border border-gray-100">
                    <div className="h-96 w-full">
                        <OfertaDemandaChart />
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-4 italic">Fuente: Estimaciones de mercado global Q1 2026</p>
                </div>
            </section>

            {/* Section 2: Cards */}
            <section className="py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Análisis de Oportunidad</h2>
                        <p className="text-gray-600 mb-6">
                            Los roles relacionados con <strong>Inteligencia Artificial</strong> y <strong>Ciberseguridad</strong> presentan
                            las brechas más críticas. Esto indica que la especialización requerida supera la velocidad de capacitación del mercado.
                        </p>
                        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-amber-500">
                            <h4 className="font-bold text-lg mb-2">Insight Clave</h4>
                            <p className="text-sm text-gray-600">
                                El puesto de <strong>AI Engineer</strong> tiene un ratio de cobertura de solo el 30%, lo que significa
                                que por cada 3 vacantes, solo hay 1 candidato calificado.
                            </p>
                        </div>
                    </div>
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {jobData.map((job, i) => <JobCard key={job.puesto} job={job} index={i} />)}
                    </div>
                </div>
            </section>

            {/* Section 3: Scatter */}
            <section className="py-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Matriz de Escasez de Talento</h2>
                <p className="text-gray-600 text-center max-w-6xl mx-auto mb-8">
                    El eje Y representa la Demanda, el eje X la Oferta.{' '}
                    <strong>Burbujas más grandes y altas</strong> indican mayor urgencia y mejores salarios potenciales debido a la escasez.
                </p>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-3/4 h-96">
                        <ScatterGapChart />
                    </div>
                    <div className="w-full md:w-1/4 space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <span className="block text-2xl font-bold text-blue-700">Alta Demanda</span>
                            <span className="text-sm text-blue-900">Puestos en la parte superior del gráfico son los más solicitados.</span>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                            <span className="block text-2xl font-bold text-purple-700">Alta Escasez</span>
                            <span className="text-sm text-purple-900">Puestos a la izquierda tienen menos competencia profesional.</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: JSON */}
            <section className="py-8 bg-gray-900 rounded-2xl px-6 mt-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Dataset Fuente (JSON)</h2>
                        <p className="text-gray-400 text-sm">Los datos utilizados para generar este informe.</p>
                    </div>
                    <button
                        onClick={handleCopy}
                        className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold text-white transition flex items-center gap-2"
                    >
                        {copied ? '✅ Copiado!' : '📋 Copiar JSON'}
                    </button>
                </div>
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25" />
                    <pre className="relative bg-slate-800 text-green-300 font-mono text-sm p-4 rounded-lg overflow-auto h-80">
                        {JSON.stringify(formattedJson, null, 2)}
                    </pre>
                </div>
            </section>

            <footer className="text-center py-8 text-slate-400 text-sm mt-4">
                <p>Monitor de Talento © 2026 — Migrado a React 🚀</p>
            </footer>
        </div>
    );
}
