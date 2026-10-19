import egresadosUNCData from '../../../../Base_Datos/egresados_UNC.json';
import IngresantesEgresadosChart from './IngresantesEgresadosChart';

export default function EgresadosUNCChart() {
    return (
        <IngresantesEgresadosChart
            items={egresadosUNCData.facultades ?? []}
            categoryLabel="facultad"
        />
    );
}
