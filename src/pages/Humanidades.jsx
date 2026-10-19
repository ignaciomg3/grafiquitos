import React from 'react';
import EsperanzaVidaChart from '../components/Charts/Humanidades/EsperanzaVidaChart';
import EgresadosUNCChart from '../components/Charts/Humanidades/EgresadosUNCChart';
import IngenieriasUNCChart, { ingenieriasUNC } from '../components/Charts/Humanidades/IngenieriasUNCChart';
import IngenieriasComparativaChart from '../components/Charts/Humanidades/IngenieriasComparativaChart';
import egresadosUNCData from '../../Base_Datos/egresados_UNC.json';

export default function Humanidades() {
    return (
        <div style={{ color: 'var(--color-text-primary)' }}>
            {/* Header / Portada */}
            <header className="hero-humanidades text-white py-12 md:py-16 px-4 md:px-8 text-center shadow-md rounded-2xl mb-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Humanidades</h1>
                    <p className="text-lg md:text-xl text-pink-100 font-light">
                        El progreso de la humanidad, el bienestar global y los cambios demográficos a lo largo de los siglos.
                    </p>
                </div>
            </header>

            <div className="space-y-8 md:space-y-16">
                {/* Chart Section */}
                <section className="brand-card rounded-2xl shadow-sm p-4 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Evolución de la Esperanza de Vida </h2>
                    <p className="mb-6" style={{ color: 'var(--color-text-muted)' }}>
                        Análisis comparativo de la esperanza de vida entre hombres y mujeres desde 1826 hasta la actualidad.
                        Se evidencia el rápido incremento global impulsado por la ciencia, la medicina moderna y el desarrollo social.
                    </p>

                    <div className="h-80 md:h-[500px] w-full mb-6">
                        <EsperanzaVidaChart />
                    </div>

                    <div className="p-4 rounded-lg border-l-4" style={{ backgroundColor: 'var(--color-surface-soft)', borderColor: 'var(--color-humanidades-start)' }}>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            <strong>Brecha de Género en la Salud:</strong> Históricamente y de manera consistente a nivel global, 
                            la esperanza de vida de las mujeres supera a la de los hombres. Esta diferencia obedece a factores tanto biológicos como sociológicos.
                        </p>
                    </div>
                </section>

                <section className="brand-card rounded-2xl shadow-sm p-4 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                        Ingresantes y egresados por facultad en la UNC
                    </h2>
                    <p className="mb-6" style={{ color: 'var(--color-text-muted)' }}>
                        Conteos de ingresantes y egresados de la Universidad Nacional de Córdoba durante {egresadosUNCData.año_referencia}.
                        {' '}Fuente: {egresadosUNCData.fuente}.
                        {' '}El porcentaje relaciona ambos conteos anuales y no representa una tasa de graduación por cohorte.
                    </p>

                    <EgresadosUNCChart />
                </section>

                <section className="brand-card rounded-2xl shadow-sm p-4 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                        Ingresantes y egresados por carrera de ingeniería en la UNC
                    </h2>
                    <p className="mb-6" style={{ color: 'var(--color-text-muted)' }}>
                        Ingresantes de {ingenieriasUNC[0]?.año_ingresantes ?? '2020'} y egresados de {ingenieriasUNC[0]?.año_egresados ?? '2025'}, comparados por carrera.
                        {' '}El porcentaje compara ambos conteos; no representa el seguimiento individual de una cohorte.
                    </p>

                    <IngenieriasUNCChart />
                </section>

                <section className="brand-card rounded-2xl shadow-sm p-4 md:p-8">
                    <IngenieriasComparativaChart />
                </section>
            </div>

            <footer className="text-center py-8 text-sm mt-4 border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-surface-border)' }}>
                <p>Humanidades Analytics © 2026</p>
            </footer>
        </div>
    );
}
