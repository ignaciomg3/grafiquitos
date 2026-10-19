const ingenieriasPorArchivo = import.meta.glob(
    '../../../../Base_Datos/Ingresantes_y_Egresados_UNC/*.json',
    { eager: true, import: 'default' }
);

const percentageFormat = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
});

const ingenierias = Object.values(ingenieriasPorArchivo)
    .map((ingenieria) => ({
        ...ingenieria,
        porcentaje: Number.isFinite(ingenieria.porcentaje_egresados)
            ? ingenieria.porcentaje_egresados
            : ingenieria.ingresantes > 0
                ? (ingenieria.egresados / ingenieria.ingresantes) * 100
                : 0
    }))
    .sort((a, b) => b.porcentaje - a.porcentaje);

function getCareerEmoji(carrera) {
    if (carrera.includes('Computación')) return '💻';
    if (carrera.includes('Electrónica')) return '⚡';
    if (carrera.includes('Ambiental')) return '🌱';
    if (carrera.includes('Química')) return '🧪';
    if (carrera.includes('Aero')) return '✈️';
    if (carrera.includes('Civil')) return '🏗️';
    if (carrera.includes('Agrimensura')) return '📐';
    return '⚙️';
}

function getBarColor(percentage) {
    if (percentage >= 15) return '#0080d0';
    if (percentage >= 10) return '#61728d';
    return '#e84141';
}

export default function IngenieriasComparativaChart() {
    return (
        <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: '#0080d0' }}>
                    Indicador comparativo UNC
                </p>
                <h3 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl" style={{ color: '#0f172a' }}>
                    Porcentaje de egresados por carrera de ingeniería
                    <br />
                    <span className="text-lg md:text-xl">(Ingresantes 2020 / Egresados 2025)</span>
                </h3>
            </div>

            <div className="space-y-4" role="list" aria-label="Porcentaje de egresados por carrera de ingeniería">
                {ingenierias.map((ingenieria) => {
                    const percentage = Math.min(100, Math.max(0, ingenieria.porcentaje));
                    const barColor = getBarColor(percentage);

                    return (
                        <div
                            key={ingenieria.carrera}
                            className="grid grid-cols-[minmax(7.5rem,1.35fr)_minmax(0,3fr)_4.5rem] items-center gap-3 sm:grid-cols-[minmax(0,1.35fr)_minmax(0,3fr)_4.5rem] sm:gap-5"
                            role="listitem"
                        >
                            <div className="min-w-0 text-left">
                                <p className="text-sm font-bold leading-tight sm:text-base" style={{ color: '#0f172a' }} title={ingenieria.carrera}>
                                    <span className="mr-1.5" aria-hidden="true">{getCareerEmoji(ingenieria.carrera)}</span>
                                    {ingenieria.carrera}
                                </p>
                            </div>

                            <div
                                className="h-4 overflow-hidden rounded-md"
                                style={{ backgroundColor: '#dbeafe' }}
                                role="progressbar"
                                aria-label={`${ingenieria.carrera}: ${percentageFormat.format(percentage)}%`}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-valuenow={percentage}
                            >
                                <div
                                    className="h-full rounded-md transition-[width] duration-500"
                                    style={{ width: `${percentage}%`, backgroundColor: barColor }}
                                />
                            </div>

                            <p className="text-right text-sm font-extrabold tabular-nums sm:text-base" style={{ color: '#0f172a' }}>
                                {percentageFormat.format(percentage)}%
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
