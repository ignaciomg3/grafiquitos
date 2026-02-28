import React from 'react';
import GenerativeAiChart from '../components/Charts/GenerativeAiChart';
import IotChart from '../components/Charts/IotChart';
import RamEcharts from '../components/Charts/RamEcharts';
import RamChartJs from '../components/Charts/RamChartJs';

export default function Tecnologia() {
    return (
        <div className="w-full text-slate-800 pb-12">
            <header className="mb-8 md:mb-12">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Adopción Tecnológica</h1>
                <p className="text-slate-500">Métricas sobre el avance de nuevas tecnologías e IA.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <section className="bg-white rounded-2xl shadow-sm p-4 md:p-6 border border-slate-100">
                    <h2 className="text-lg md:text-xl font-bold mb-4">Adopción de IA Generativa en Empresas</h2>
                    <div className="h-64 w-full">
                        <GenerativeAiChart />
                    </div>
                </section>

                <section className="bg-white rounded-2xl shadow-sm p-4 md:p-6 border border-slate-100">
                    <h2 className="text-lg md:text-xl font-bold mb-4">Dispositivos Conectados (IoT)</h2>
                    <div className="h-64 w-full">
                        <IotChart />
                    </div>
                </section>
            </div>

            {/* RAM Charts — stacked vertically */}
            <div className="flex flex-col gap-8 mt-8">

                {/* ECharts card */}
                <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-slate-100 relative overflow-hidden w-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100/50 to-transparent rounded-bl-full pointer-events-none"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold mb-1">Evolución del Hardware: Memoria RAM</h1>
                                <p className="text-slate-500 text-sm">Costo promedio de 1GB en USD (2020 – 2026) — <span className="text-purple-600 font-semibold italic">Rendered with ECharts</span></p>
                            </div>
                            <span className="bg-purple-50 text-purple-700 font-semibold px-3 py-1 rounded-full text-xs uppercase tracking-wider border border-purple-200 whitespace-nowrap">
                                Perspectiva A
                            </span>
                        </div>
                        <div className="h-80 md:h-[400px] w-full">
                            <RamEcharts />
                        </div>
                    </div>
                </section>

                {/* Chart.js dark card */}
                <section className="rounded-2xl overflow-hidden shadow-xl w-full" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
                    <div className="p-8 md:p-12 color-white flex flex-col">
                        <div className="mb-8 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-white flex items-center gap-3 font-extrabold text-2xl md:text-3xl tracking-tight" style={{ fontFamily: "'Aldrich', sans-serif" }}>
                                    <img src="/iconos/ram.png" alt="RAM" className="w-8 h-8 md:w-10 md:h-10" />
                                    Costos de Hardware en Perspectiva
                                </h2>
                                <p className="text-white/60 text-sm md:text-base mt-1" style={{ fontFamily: "'Aldrich', sans-serif" }}>
                                    Análisis comparativo de costos históricos 2020 – 2026 (<span className="text-cyan-400">Chart.js</span>)
                                </p>
                            </div>
                            <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-sm self-start">
                                <span className="text-white/40 text-xs block uppercase tracking-tighter" style={{ fontFamily: "'Aldrich', sans-serif" }}>Status</span>
                                <span className="text-cyan-400 text-sm font-bold" style={{ fontFamily: "'Aldrich', sans-serif" }}>PROYECTADO</span>
                            </div>
                        </div>
                        <div className="h-[400px] md:h-[500px] w-full relative">
                            <RamChartJs />
                        </div>
                        <div className="mt-8 pt-6 border-t border-white/10 flex justify-center">
                            <p className="text-white/30 text-xs text-center font-medium uppercase tracking-[0.2em]" style={{ fontFamily: "'Aldrich', sans-serif" }}>
                                Hardware Trends Report 2026 © Grafiquitos Analytics
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
