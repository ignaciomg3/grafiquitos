import { Link } from 'react-router-dom';

const dataAreas = [
    { label: 'Economia', path: '/economia', icon: 'fa-chart-column', color: 'var(--color-brand-primary)' },
    { label: 'Humanidades', path: '/humanidades', icon: 'fa-users', color: 'var(--color-humanidades-start)' },
    { label: 'Puestos', path: '/puestos-demandados', icon: 'fa-briefcase', color: 'var(--color-brand-accent)' },
    { label: 'Tecnologia', path: '/tecnologia', icon: 'fa-microchip', color: 'var(--color-brand-secondary)' },
    { label: 'Politica', path: '/politica', icon: 'fa-landmark', color: '#7c3aed' },
    { label: 'Mercado', path: '/informe-mercado', icon: 'fa-magnifying-glass-chart', color: '#1d4ed8' }
];

const signalBars = [36, 58, 44, 72, 64, 86, 53, 78, 69, 92, 61, 84];

export default function Inicio() {
    return (
        <div className="home-shell w-full min-h-[calc(100vh-9rem)]">
            <section className="home-hero overflow-hidden">
                <div className="home-hero-grid">
                    <div className="home-copy">
                        <div className="home-live-pill">
                            <span className="live-dot" aria-hidden="true"></span>
                            Datos en tiempo real
                        </div>
                        <h1>Grafiquitos</h1>
                        <p>
                            Consulta indicadores actualizados de economia, sociedad, tecnologia y mercado laboral
                            desde una sola vista clara y navegable.
                        </p>
                        <div className="home-actions">
                            <Link to="/economia" className="home-primary-action">
                                <i className="fa-solid fa-chart-line" aria-hidden="true"></i>
                                Ver indicadores
                            </Link>
                            <Link to="/informe-mercado" className="home-secondary-action">
                                Informe mercado
                            </Link>
                        </div>
                    </div>

                    <div className="home-monitor" aria-label="Panel de actividad de datos">
                        <div className="monitor-header">
                            <div>
                                <span>Actividad</span>
                                <strong>Actualizando</strong>
                            </div>
                            <span className="monitor-time">live</span>
                        </div>
                        <div className="signal-chart" aria-hidden="true">
                            {signalBars.map((height, index) => (
                                <span
                                    key={height + index}
                                    style={{
                                        height: `${height}%`,
                                        animationDelay: `${index * 90}ms`
                                    }}
                                ></span>
                            ))}
                        </div>
                        <div className="monitor-footer">
                            <span>Paneles listos</span>
                            <strong>18</strong>
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-data-grid" aria-label="Secciones de datos">
                {dataAreas.map((area) => (
                    <Link key={area.path} to={area.path} className="home-data-card">
                        <span className="home-data-icon" style={{ color: area.color }}>
                            <i className={`fa-solid ${area.icon}`} aria-hidden="true"></i>
                        </span>
                        <span>{area.label}</span>
                        <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </Link>
                ))}
            </section>

            <section className="home-status-strip" aria-label="Estado de la plataforma">
                <div>
                    <span>Latencia</span>
                    <strong>120 ms</strong>
                </div>
                <div>
                    <span>Areas consultables</span>
                    <strong>6</strong>
                </div>
                <div>
                    <span>Visualizaciones</span>
                    <strong>Chart.js + ECharts</strong>
                </div>
            </section>
        </div>
    );
}
