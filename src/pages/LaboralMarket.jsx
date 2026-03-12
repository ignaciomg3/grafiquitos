import React from 'react';
import RankingChart from '../components/Charts/RankingChart';
import GapChart from '../components/Charts/GapChart';

export default function LaboralMarket() {
    return (
        <div className="text-slate-800">
            {/* Portada / Cabecera */}
            <header className="bg-blue-900 text-white py-12 md:py-16 px-4 md:px-8 text-center shadow-md rounded-2xl mb-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">El Futuro del Trabajo</h1>
                    <p className="text-lg md:text-xl text-blue-200 font-light">
                        Análisis de la demanda, oferta y proyección de los puestos más críticos.
                    </p>
                </div>
            </header>

            <div className="space-y-8 md:space-y-16">
                {/* Página 1: Top 10 Puestos */}
                <section className="bg-white rounded-2xl shadow-sm p-4 md:p-8 border border-slate-100">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
                        1. Los 10 puestos más demandados (Actualidad)
                    </h2>
                    <p className="text-slate-500 mb-6">Ranking basado en el volumen de vacantes globales abiertas (en miles).</p>

                    <div className="h-72 md:h-96 w-full mb-6">
                        <RankingChart />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                        <p className="text-sm text-slate-700">
                            <strong>Fuentes de información:</strong> Datos estimados basados en el reporte <em>Future of Jobs</em> del Foro Económico Mundial y tendencias del <em>LinkedIn Economic Graph</em>.
                        </p>
                    </div>
                </section>

                {/* Página 2: Demanda vs Oferta */}
                <section className="bg-white rounded-2xl shadow-sm p-4 md:p-8 border border-slate-100">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">2. Brecha de Talento: Demanda vs. Oferta</h2>
                    <p className="text-slate-500 mb-6 font-sm">
                        Comparativa entre las vacantes disponibles y los profesionales capacitados buscando empleo.
                    </p>

                    <div className="h-72 md:h-96 w-full mb-6">
                        <GapChart />
                    </div>

                    <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                        <p className="text-sm text-slate-700">
                            <strong>Por qué este gráfico:</strong> Elegí un <em>gráfico de barras agrupadas</em> porque permite comparar visualmente dos variables contrastantes (demanda y oferta) lado a lado para cada categoría, evidenciando rápidamente el déficit.
                        </p>
                    </div>
                </section>
            </div>

            <footer className="text-center py-8 text-slate-400 text-sm">
                <p>Diseño portado exitosamente a componentes de React 🚀</p>
            </footer>
        </div>
    );
}
