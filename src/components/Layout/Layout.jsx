import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const tabs = [
    { id: 'inicio', label: 'Inicio', path: '/' },
    { id: 'economia', label: 'Economía', path: '/economia' },
    { id: 'mercado-laboral', label: 'Mercado Laboral', path: '/mercado-laboral' },
    { id: 'puestos-demandados', label: 'Puestos demandados', path: '/puestos-demandados' },
    { id: 'tecnologia', label: 'Tecnología', path: '/tecnologia' },
    { id: 'politica', label: 'Política', path: '/politica' },
];

const Navbar = () => {
    return (
        <header className="bg-white shadow-sm border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center pt-3 pb-1 sm:py-0 sm:h-16 gap-3 sm:gap-0 border-b border-slate-200">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 shadow-sm flex items-center justify-center flex-shrink-0 text-xl overflow-hidden">
                            <i className="fa-solid fa-chart-line text-blue-600"></i>
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
                                        ? 'tab-active inline-flex items-center px-1 pb-2 sm:pt-1 sm:pb-0 text-sm transition-colors duration-200 border-b-[4px] border-blue-500 text-blue-900 font-bold whitespace-nowrap'
                                        : 'tab-inactive inline-flex items-center px-1 pb-2 sm:pt-1 sm:pb-0 text-sm transition-colors duration-200 text-slate-500 font-semibold hover:text-blue-500 whitespace-nowrap'
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
            <main className="flex-grow flex flex-col relative w-full h-full p-4 md:p-8 max-w-7xl mx-auto">
                <Outlet />
            </main>
        </>
    );
}
