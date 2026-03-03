import React from 'react';
import AprobacionChart from '../components/Charts/AprobacionChart';
import CongresoChart from '../components/Charts/CongresoChart';
import DiputadosChart from '../components/Charts/DiputadosChart';
import SenadoresChart from '../components/Charts/SenadoresChart';

export default function Politica() {
    return (
        <div className="w-full text-slate-800">
            <header className="mb-8 md:mb-12">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Análisis Político</h1>
                <p className="text-slate-500">Métricas de opinión pública y distribución parlamentaria.</p>
            </header>

            

            {/* Cámaras parlamentarias — dos columnas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8">

                {/* Diputados */}
                <section className="bg-white rounded-2xl shadow-sm p-4 md:p-6 border border-slate-100">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-1">Cámara de Diputados</h2>
                            <p className="text-slate-500 text-sm">257 bancas — distribución por bloque</p>
                        </div>
                        <span className="bg-blue-50 text-blue-700 font-semibold px-2 py-1 rounded-full text-xs uppercase tracking-wider border border-blue-200 whitespace-nowrap">
                            Diputados
                        </span>
                    </div>
                    <div className="h-72 w-full">
                        <DiputadosChart />
                    </div>
                </section>

                {/* Senadores */}
                <section className="bg-white rounded-2xl shadow-sm p-4 md:p-6 border border-slate-100">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-1">Senado de la Nación</h2>
                            <p className="text-slate-500 text-sm">72 bancas — distribución por bloque</p>
                        </div>
                        <span className="bg-purple-50 text-purple-700 font-semibold px-2 py-1 rounded-full text-xs uppercase tracking-wider border border-purple-200 whitespace-nowrap">
                            Senadores
                        </span>
                    </div>
                    <div className="h-72 w-full">
                        <SenadoresChart />
                    </div>
                </section>

            </div>

            <div className="mt-4 bg-slate-50 p-4 rounded-lg border-l-4 border-slate-300">
                <p className="text-sm text-slate-600">
                    <strong>Nota:</strong> Composición estimada del Congreso argentino para el período 2026.
                    LLA y Fuerza Patria son las dos fuerzas con mayor representación en ambas cámaras.
                </p>
            </div>
        </div>
    );
}
