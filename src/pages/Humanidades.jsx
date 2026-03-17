import React from 'react';
import EsperanzaVidaChart from '../components/Charts/Humanidades/EsperanzaVidaChart';

export default function Humanidades() {
    return (
        <div className="text-slate-800">
            {/* Header / Portada */}
            <header className="bg-gradient-to-r from-pink-600 to-rose-700 text-white py-12 md:py-16 px-4 md:px-8 text-center shadow-md rounded-2xl mb-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Humanidades</h1>
                    <p className="text-lg md:text-xl text-pink-100 font-light">
                        El progreso de la humanidad, el bienestar global y los cambios demográficos a lo largo de los siglos.
                    </p>
                </div>
            </header>

            <div className="space-y-8 md:space-y-16">
                {/* Chart Section */}
                <section className="bg-white rounded-2xl shadow-sm p-4 md:p-8 border border-slate-100">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Evolución de la Esperanza de Vida </h2>
                    <p className="text-slate-500 mb-6">
                        Análisis comparativo de la esperanza de vida entre hombres y mujeres desde 1826 hasta la actualidad.
                        Se evidencia el rápido incremento global impulsado por la ciencia, la medicina moderna y el desarrollo social.
                    </p>

                    <div className="h-80 md:h-[500px] w-full mb-6">
                        <EsperanzaVidaChart />
                    </div>

                    <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                        <p className="text-sm text-slate-700">
                            <strong>Brecha de Género en la Salud:</strong> Históricamente y de manera consistente a nivel global, 
                            la esperanza de vida de las mujeres supera a la de los hombres. Esta diferencia obedece a factores tanto biológicos como sociológicos.
                        </p>
                    </div>
                </section>
            </div>

            <footer className="text-center py-8 text-slate-400 text-sm mt-4 border-t border-slate-100">
                <p>Humanidades Analytics © 2026</p>
            </footer>
        </div>
    );
}
