import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const tabs = [
    { id: 'inicio', label: 'Inicio', path: '/' },
    { id: 'economia', label: 'Economía', path: '/economia' },
    { id: 'humanidades', label: 'Humanidades', path: '/humanidades' },
    { id: 'puestos-demandados', label: 'Puestos demandados', path: '/puestos-demandados' },
    { id: 'tecnologia', label: 'Tecnología', path: '/tecnologia' },
    { id: 'politica', label: 'Política', path: '/politica' },
    { id: 'informe-mercado', label: 'Informe Mercado', path: '/informe-mercado' },
];

const Navbar = () => {
    return (
        <header className="app-navbar shadow-sm">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center pt-3 pb-1 sm:py-0 sm:h-16 gap-3 sm:gap-0 border-b" style={{ borderColor: 'var(--color-surface-border)' }}>
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
                        <div className="w-10 h-10 rounded-xl brand-chip shadow-sm flex items-center justify-center flex-shrink-0 text-xl overflow-hidden">
                            <i className="fa-solid fa-chart-line" style={{ color: 'var(--color-brand-secondary)' }}></i>
                        </div>
                        {/* <span className="font-bold text-2xl text-slate-800 tracking-tight">Grafiquitos</span> */}
                    </div>

                    {/* Navigation Tabs */}
                    <nav className="flex w-full sm:w-auto sm:ml-6 space-x-6 sm:space-x-8 px-2 sm:px-0 h-12 sm:h-16 overflow-x-auto scrollbar-hide items-end sm:items-center border-none">
                        {tabs.map((tab) => (
                            <NavLink
                                key={tab.id}
                                to={tab.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'tab-active inline-flex items-center px-1 pb-2 sm:pt-1 sm:pb-0 text-sm transition-colors duration-200 border-b-[4px] font-bold whitespace-nowrap'
                                        : 'tab-inactive inline-flex items-center px-1 pb-2 sm:pt-1 sm:pb-0 text-sm transition-colors duration-200 font-semibold whitespace-nowrap'
                                }
                            >
                                {tab.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default function Layout() {
    return (
        <>
            <Navbar />
            <main className="app-main flex-grow flex flex-col relative w-full h-full p-4 md:p-8 max-w-[1600px] mx-auto">
                <Outlet />
            </main>
        </>
    );
}
