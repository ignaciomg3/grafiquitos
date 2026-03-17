import React from 'react';
import InflacionChart from '../components/Charts/Economia/InflacionChart';
import PibChart from '../components/Charts/Economia/PibChart';
import PetroleoChart from '../components/Charts/Economia/PetroleoChart';
import SalarioAlquilerChart from '../components/Charts/Economia/SalarioAlquilerChart';
import TopPbiChart from '../components/Charts/Economia/TopPbiChart';

export default function Economia() {
    return (
        <div className="w-full text-slate-800">
            <header className="mb-6 md:mb-12">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Panorama Economico</h1>
                <p className="text-sm sm:text-base text-slate-500">Indicadores clave de la economia global y regional.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Top PBI Mundial - full width */}
                <section className="bg-white rounded-2xl shadow-sm p-4 md:p-8 border border-slate-100 md:col-span-2">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-1">Top 7 Economias del Mundo</h2>
                            <p className="text-slate-500 text-xs sm:text-sm">PBI nominal estimado 2026 - en billones de USD (Trillions)</p>
                        </div>
                        <span className="mt-3 md:mt-0 bg-emerald-50 text-emerald-700 font-semibold px-3 py-1 rounded-full text-xs uppercase tracking-wider border border-emerald-200 whitespace-nowrap">
                            FMI 2026
                        </span>
                    </div>

                    {/* Chart */}
                    <div className="h-72 sm:h-80 md:h-96 w-full">
                        <TopPbiChart />
                    </div>

                    {/* Contexto + Nota */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-slate-400">
                            <p className="text-sm text-slate-600">
                                <strong className="text-slate-800">Contexto:</strong> Datos expresados en Trillions (billones de USD)
                                segun proyecciones del FMI para el cierre de 2026.
                            </p>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                            <p className="text-sm text-slate-600">
                                <span className="text-amber-600 font-bold">Nota destacada:</span> India consolida su ascenso
                                superando a Japon como la <strong>4ta economia mundial</strong> en este periodo.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-white rounded-2xl shadow-sm p-4 md:p-6 border border-slate-100 md:col-span-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                        <div>
                            <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 mb-1">{'\u{1F3E0}\u{1F4B5} Salario vs Alquiler en USD'}</h2>
                            <p className="text-slate-500 text-xs sm:text-sm">Argentina (1994-2026) - Referencia: departamento de 2 ambientes en CABA.</p>
                        </div>
                        <span className="inline-flex w-fit bg-orange-50 text-orange-700 font-semibold px-3 py-1 rounded-full text-[11px] sm:text-xs border border-orange-200">
                            Serie historica
                        </span>
                    </div>

                    <div className="h-72 sm:h-80 md:h-96 w-full">
                        <SalarioAlquilerChart />
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-500 mt-4 leading-relaxed">
                        Nota: Los datos de 2024-2026 son estimaciones basadas en tipo de cambio de mercado.
                        El salario usa base RIPTE/Hogares y el alquiler el promedio de CABA.
                    </p>
                </section>

                <section className="bg-white rounded-2xl shadow-sm p-4 md:p-6 border border-slate-100 md:col-span-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                        <div>
                            <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 mb-1">{'\u{1F6E2}'} Precio del Petroleo (USD/barril)</h2>
                            <p className="text-slate-500 text-xs sm:text-sm"></p>
                        </div>
                        <span className="inline-flex w-fit bg-cyan-50 text-cyan-700 font-semibold px-3 py-1 rounded-full text-[11px] sm:text-xs border border-cyan-200">
                            Energia y Commodities
                        </span>
                    </div>

                    <div className="h-72 sm:h-80 md:h-96 w-full">
                        <PetroleoChart />
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-500 mt-4 leading-relaxed">
                        
                    </p>
                </section>

                {/* PIB - full width */}
                {/* <section className="bg-white rounded-2xl shadow-sm p-4 md:p-6 border border-slate-100 md:col-span-2">
                    <h2 className="text-lg md:text-xl font-bold mb-1">Crecimiento del PIB</h2>
                    <p className="text-slate-500 text-sm mb-4">Crecimiento estimado por bloque economico (%) - <span className="text-emerald-700 font-semibold italic">Proyecciones 2026</span></p>
                    <div className="h-72 w-full">
                        <PibChart />
                    </div>
                </section> */}

                {/* Inflacion - full width */}
                <section className="bg-white rounded-2xl shadow-sm p-4 md:p-6 border border-slate-100 md:col-span-2">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold mb-1">Inflacion Mensual Argentina</h2>
                    <p className="text-slate-500 text-xs sm:text-sm mb-4">Variacion porcentual mensual del IPC (2019-2026)</p>
                    <div className="h-72 sm:h-80 md:h-96 w-full">
                        <InflacionChart />
                    </div>
                </section>
            </div>
        </div>
    );
}