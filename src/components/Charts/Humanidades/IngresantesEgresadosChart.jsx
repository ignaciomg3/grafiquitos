const numberFormat = new Intl.NumberFormat('es-AR');
const percentageFormat = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
});

const series = [
    { key: 'ingresantes', label: 'Ingresantes', color: '#2563eb', gradient: 'linear-gradient(90deg, #60a5fa, #2563eb)' },
    { key: 'egresados', label: 'Egresados', color: '#166534' }
];

const percentageColorStops = [
    { percentage: 0, color: '#dc2626', rgb: [220, 38, 38] },
    { percentage: 50, color: '#eab308', rgb: [234, 179, 8] },
    { percentage: 100, color: '#15803d', rgb: [21, 128, 61] }
];
const percentageColorScale = `linear-gradient(90deg, ${percentageColorStops
    .map((stop) => `${stop.color} ${stop.percentage}%`)
    .join(', ')})`;

function getGraduatesBarColor(percentage) {
    if (percentage === null) {
        return '#94a3b8';
    }

    const boundedPercentage = Math.min(100, Math.max(0, percentage));
    const start = boundedPercentage <= 50 ? percentageColorStops[0] : percentageColorStops[1];
    const end = boundedPercentage <= 50 ? percentageColorStops[1] : percentageColorStops[2];
    const progress = (boundedPercentage - start.percentage) / (end.percentage - start.percentage);
    const rgb = start.rgb.map((channel, index) => Math.round(channel + (end.rgb[index] - channel) * progress));

    return `rgb(${rgb.join(', ')})`;
}

function getPercentageBadgeStyle(percentage) {
    if (percentage === null) {
        return { backgroundColor: '#f1f5f9', color: '#475569' };
    }

    if (percentage < 30) {
        return { backgroundColor: 'rgba(185, 28, 28, 0.1)', color: '#b91c1c' };
    }

    if (percentage <= 50) {
        return { backgroundColor: 'rgba(161, 98, 7, 0.12)', color: '#a16207' };
    }

    return { backgroundColor: 'rgba(22, 101, 52, 0.1)', color: '#166534' };
}

function getComparisonDescription(item, percentage) {
    const entryYear = item.año_ingresantes;
    const graduateYear = item.año_egresados;

    if (item.ingresantes === 0) {
        return `No hubo ingresantes${entryYear ? ` en ${entryYear}` : ''}.`;
    }

    if (percentage > 100) {
        return entryYear && graduateYear
            ? `Hubo más egresados que ingresantes en los períodos comparados (${entryYear} y ${graduateYear}).`
            : 'Hubo más egresados que ingresantes en este año.';
    }

    if (entryYear && graduateYear && entryYear !== graduateYear) {
        return `Relación entre ingresantes ${entryYear} y egresados ${graduateYear}.`;
    }

    if (entryYear && graduateYear) {
        return `Relación entre ingresantes y egresados de ${entryYear}.`;
    }

    return 'Relación anual egresados / ingresantes.';
}

export default function IngresantesEgresadosChart({ items = [], categoryLabel = 'facultad' }) {
    const validItems = items.filter((item) => item?.nombre
        && Number.isFinite(item.ingresantes)
        && item.ingresantes >= 0
        && Number.isFinite(item.egresados)
        && item.egresados >= 0);

    if (validItems.length === 0) {
        return <p role="status">No hay datos de ingresantes y egresados disponibles para mostrar.</p>;
    }

    const totalIngresantes = validItems.reduce((total, item) => total + item.ingresantes, 0);
    const totalEgresados = validItems.reduce((total, item) => total + item.egresados, 0);

    return (
        <div className="space-y-5">
            <div
                className="flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between"
                style={{ backgroundColor: 'var(--color-surface-soft)', borderColor: 'var(--color-surface-border)' }}
            >
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2" role="group" aria-label="Referencias del gráfico">
                    {series.map((item) => (
                        <span key={item.key} className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                            <span
                                className={item.key === 'egresados' ? 'h-2.5 w-12 rounded-full' : 'h-3 w-3 rounded-full'}
                                style={{ background: item.key === 'egresados' ? percentageColorScale : item.color }}
                                aria-hidden="true"
                            />
                            {item.key === 'egresados' ? 'Egresados (color por porcentaje)' : item.label}
                        </span>
                    ))}
                </div>
                <p className="text-xs leading-relaxed sm:max-w-xs sm:text-right" style={{ color: 'var(--color-text-muted)' }}>
                     
                </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                    { label: 'Ingresantes en total', value: totalIngresantes, color: series[0].color },
                    { label: 'Egresados en total', value: totalEgresados, color: series[1].color }
                ].map((summary) => (
                    <div
                        key={summary.label}
                        className="flex min-w-0 items-center gap-4 rounded-2xl border bg-white px-4 py-3 shadow-sm sm:px-5"
                        style={{ borderColor: 'var(--color-surface-border)' }}
                    >
                        <span className="h-10 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: summary.color }} aria-hidden="true" />
                        <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                                {summary.label}
                            </p>
                            <p className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                                {numberFormat.format(summary.value)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {validItems.map((item) => {
                    const percentage = item.porcentaje_egresados !== undefined
                        ? item.porcentaje_egresados
                        : item.ingresantes > 0
                            ? (item.egresados / item.ingresantes) * 100
                            : null;
                    const percentageBadgeStyle = getPercentageBadgeStyle(percentage);

                    return (
                        <article
                            key={item.nombre}
                            className="min-w-0 rounded-2xl border bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-5"
                            style={{ borderColor: 'var(--color-surface-border)' }}
                        >
                            <div className="flex min-w-0 items-start justify-between gap-3">
                                <h3 className="min-w-0 text-base font-bold leading-snug sm:text-lg" style={{ color: 'var(--color-text-primary)' }}>
                                    {item.nombre}
                                </h3>
                                <span
                                    className="shrink-0 rounded-full px-2.5 py-1 text-xs font-bold"
                                    style={percentageBadgeStyle}
                                    title="Relación entre los conteos de los años indicados; no sigue necesariamente a los mismos estudiantes de una cohorte"
                                >
                                    {percentage === null ? '—' : `${percentageFormat.format(percentage)}%`}
                                </span>
                            </div>

                            <p className="mt-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                {getComparisonDescription(item, percentage)}
                            </p>

                            <dl className="mt-5 space-y-4">
                                {series.map((seriesItem) => {
                                    const count = item[seriesItem.key];
                                    const year = seriesItem.key === 'ingresantes'
                                        ? item.año_ingresantes
                                        : item.año_egresados;
                                    const seriesLabel = year ? `${seriesItem.label} ${year}` : seriesItem.label;
                                    const barPercentage = seriesItem.key === 'ingresantes'
                                        ? 100
                                        : percentage === null
                                            ? (count > 0 ? 100 : 0)
                                            : Math.min(100, Math.max(0, percentage));
                                    const ariaValueText = seriesItem.key === 'egresados' && percentage === null
                                        ? 'Proporción no calculable sin ingresantes'
                                        : `${percentageFormat.format(barPercentage)}% de la escala de esta ${categoryLabel}`;

                                    return (
                                        <div key={seriesItem.key}>
                                            <div className="mb-1.5 flex items-baseline justify-between gap-3">
                                                <dt className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                                                    {seriesLabel}
                                                </dt>
                                                <dd className="shrink-0 text-sm font-bold tabular-nums" style={{ color: 'var(--color-text-primary)' }}>
                                                    {numberFormat.format(count)}
                                                </dd>
                                            </div>
                                            <div
                                                className="h-2.5 overflow-hidden rounded-full"
                                                style={{ backgroundColor: 'var(--color-surface-soft)' }}
                                                role="progressbar"
                                                aria-label={`${seriesLabel} de ${item.nombre}`}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                                aria-valuenow={barPercentage}
                                                aria-valuetext={ariaValueText}
                                            >
                                                <div
                                                    className="h-full rounded-full transition-[width] duration-500"
                                                    style={{
                                                        width: `${barPercentage}%`,
                                                        background: seriesItem.key === 'egresados'
                                                            ? getGraduatesBarColor(percentage)
                                                            : seriesItem.gradient
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </dl>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
