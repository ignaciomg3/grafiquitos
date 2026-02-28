import React from 'react';
import InflacionChart from '../components/Charts/InflacionChart';
import PibChart from '../components/Charts/PibChart';
import TopPbiChart from '../components/Charts/TopPbiChart';

export default function Economia() {
    return (
        <div className="w-full text-slate-800">
            <header className="mb-8 md:mb-12">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Panorama Económico</h1>
                <p className="text-slate-500">Indicadores clave de la economía global y regional.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Top PBI Mundial — full width */}
                <section className="bg-white rounded-2xl shadow-sm p-4 md:p-8 border border-slate-100 md:col-span-2">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-1">Top 7 Economías del Mundo</h2>
                            <p className="text-slate-500 text-sm">PBI Nominal estimado 2026 — en billones de USD (Trillions)</p>
                        </div>
                        <span className="mt-3 md:mt-0 bg-emerald-50 text-emerald-700 font-semibold px-3 py-1 rounded-full text-xs uppercase tracking-wider border border-emerald-200 whitespace-nowrap">
                            FMI 2026
                        </span>
                    </div>

                    {/* Chart */}
                    <div className="h-80 md:h-96 w-full">
                        <TopPbiChart />
                    </div>

                    {/* Contexto + Nota */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-slate-400">
                            <p className="text-sm text-slate-600">
                                <strong className="text-slate-800">Contexto:</strong> Datos expresados en Trillions (billones de USD)
                                según proyecciones del FMI para el cierre de 2026.
                            </p>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                            <p className="text-sm text-slate-600">
                                <span className="text-amber-600 font-bold"> Nota destacada:</span> India consolida su ascenso
                                superando a Japón como la <strong>4ta economía mundial</strong> en este período.
                            </p>
                        </div>
                    </div>
                </section>


                {/* PIB — full width */}
                {/* <section className="bg-white rounded-2xl shadow-sm p-4 md:p-6 border border-slate-100 md:col-span-2">
                    <h2 className="text-lg md:text-xl font-bold mb-1">Crecimiento del PIB</h2>
                    <p className="text-slate-500 text-sm mb-4">Crecimiento estimado por bloque económico (%) — <span className="text-emerald-700 font-semibold italic">Proyecciones 2026</span></p>
                    <div className="h-72 w-full">
                        <PibChart />
                    </div>
                </section> */}

                {/* Inflación - full width */}
                <section className="bg-white rounded-2xl shadow-sm p-4 md:p-6 border border-slate-100 md:col-span-2">
                    <h2 className="text-lg md:text-xl font-bold mb-1">Inflación Mensual Argentina</h2>
                    <p className="text-slate-500 text-sm mb-4">Variación porcentual mensual del IPC (2019 – 2026)</p>
                    <div className="h-96 w-full">
                        <InflacionChart />
                    </div>
                </section>


            </div>
        </div>
    );
}
