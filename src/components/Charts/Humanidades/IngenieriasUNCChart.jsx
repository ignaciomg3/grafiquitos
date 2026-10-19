import IngresantesEgresadosChart from './IngresantesEgresadosChart';

const ingenieriasPorArchivo = import.meta.glob(
    '../../../../Base_Datos/Ingresantes_y_Egresados_UNC/*.json',
    { eager: true, import: 'default' }
);

export const ingenieriasUNC = Object.values(ingenieriasPorArchivo)
    .filter((ingenieria) => ![
        'Ingeniería Aeroespacial',
        'Ingeniería Mecánica Electricista'
    ].includes(ingenieria.carrera))
    .map((ingenieria) => ({ ...ingenieria, nombre: ingenieria.carrera }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

export default function IngenieriasUNCChart() {
    return <IngresantesEgresadosChart items={ingenieriasUNC} categoryLabel="carrera" />;
}
