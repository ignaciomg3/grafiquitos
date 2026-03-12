import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    HiOutlineChartBar,
    HiOutlinePresentationChartLine,
    HiOutlineLightningBolt,
    HiOutlineChip,
    HiOutlineUserGroup
} from 'react-icons/hi';

const StatCard = ({ icon: Icon, title, description, path, color }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(path)}
            className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden relative"
        >
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-5 group-hover:opacity-10 transition-opacity bg-${color}-500`}></div>
            <div className={`w-12 h-12 rounded-xl bg-${color}-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`text-2xl text-${color}-600`} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">{title}</h3>
            <p className="text-slate-500 text-sm">{description}</p>
        </div>
    );
};

export default function Inicio() {
    return (
        <div className="w-full text-slate-800 max-w-[1440px] mx-auto py-8 md:py-16">
            {/* Hero Section */}
            <section className="text-center mb-16 md:mb-24">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-6 border border-blue-100 animate-pulse">
                    <HiOutlineLightningBolt />
                    <span>Plataforma de Visualización de Datos v2.0</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                    Bienvenido a <span className="text-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Grafiquitos</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Explora indicadores económicos, tendencias del mercado laboral y avances tecnológicos de Argentina y el mundo a través de visualizaciones interactivas de última generación.
                </p>
            </section>

            {/* Grid de Secciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    icon={HiOutlinePresentationChartLine}
                    title="Economía"
                    description="Inflación, PIB y proyecciones globales para el 2026."
                    path="/economia"
                    color="emerald"
                />
                <StatCard
                    icon={HiOutlineChartBar}
                    title="Mercado Laboral"
                    description="Evolución del empleo y análisis de salarios."
                    path="/mercado-laboral"
                    color="blue"
                />
                <StatCard
                    icon={HiOutlineUserGroup}
                    title="Proyección de Vacantes"
                    description="Los perfiles más buscados en la industria."
                    path="/puestos-demandados"
                    color="orange"
                />
                <StatCard
                    icon={HiOutlineChip}
                    title="Tecnología"
                    description="Adopción de IA, IoT y costos de hardware."
                    path="/tecnologia"
                    color="purple"
                />
                <StatCard
                    icon={HiOutlinePresentationChartLine}
                    title="Política"
                    description="Aprobación de gestión y composición de cámaras."
                    path="/politica"
                    color="indigo"
                />

                {/* Decorative card */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                        <HiOutlineLightningBolt className="text-2xl text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-1">Análisis en Tiempo Real</h3>
                    <p className="text-slate-400 text-sm">Visualizaciones diseñadas para la toma de decisiones informadas.</p>
                </div>
            </div>

            <footer className="mt-24 text-center border-t border-slate-100 pt-12">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
                    Grafiquitos Analytics © 2026
                </p>
            </footer>
        </div>
    );
}
