import flagUS from '../../assets/banderas/icons8-estados-unidos-48.png';
import flagCN from '../../assets/banderas/icons8-china-48.png';
import flagDE from '../../assets/banderas/icons8-alemania-48.png';
import flagIN from '../../assets/banderas/icons8-india-48.png';
import flagJP from '../../assets/banderas/icons8-japón-48.png';
import flagGB from '../../assets/banderas/icons8-reino-unido-48.png';
import flagFR from '../../assets/banderas/icons8-francia-48.png';

const paises = [
    { puesto: 1, pais: "Estados Unidos", flag: flagUS, pbi: 31.82, color: "#0A3161" },
    { puesto: 2, pais: "China", flag: flagCN, pbi: 20.65, color: "#EE1C25" },
    { puesto: 3, pais: "Alemania", flag: flagDE, pbi: 5.33, color: "#1a1a1a" },
    { puesto: 4, pais: "India", flag: flagIN, pbi: 4.51, color: "#FF9933" },
    { puesto: 5, pais: "Japón", flag: flagJP, pbi: 4.46, color: "#BC002D" },
    { puesto: 6, pais: "Reino Unido", flag: flagGB, pbi: 4.23, color: "#012169" },
    { puesto: 7, pais: "Francia", flag: flagFR, pbi: 3.56, color: "#002395" },
];

const MAX_PBI = Math.max(...paises.map(p => p.pbi));

export default function TopPbiChart() {
    return (
        <div className="w-full space-y-3 py-2">
            {paises.map((p) => {
                const pct = (p.pbi / MAX_PBI) * 100;
                return (
                    <div key={p.puesto} className="flex items-center gap-3 group">
                        {/* Puesto + bandera + nombre */}
                        <div className="flex items-center gap-2 w-36 md:w-44 shrink-0">
                            <span className="text-xs font-bold text-slate-400 w-4 text-right">
                                {p.puesto}
                            </span>
                            <img
                                src={p.flag}
                                alt={p.pais}
                                className="w-7 h-7 rounded-sm object-cover shadow-sm border border-slate-200 shrink-0"
                            />
                            <span className="text-sm font-semibold text-slate-700 truncate">
                                {p.pais}
                            </span>
                        </div>

                        {/* Barra */}
                        <div className="flex-1 bg-slate-100 rounded-full h-7 overflow-hidden">
                            <div
                                className="h-full rounded-full flex items-center justify-end pr-3 transition-all duration-700 ease-out"
                                style={{
                                    width: `${pct}%`,
                                    backgroundColor: p.color,
                                    minWidth: '2.5rem',
                                }}
                            >
                                <span className="text-xs font-bold text-white whitespace-nowrap drop-shadow">
                                    ${p.pbi}T
                                </span>
                            </div>
                        </div>

                        {/* Valor a la derecha */}
                        <span className="text-sm font-bold text-slate-600 w-12 text-right shrink-0">
                            ${p.pbi}T
                        </span>
                    </div>
                );
            })}

            {/* Eje X referencia */}
            <div className="flex items-center gap-3 pt-1">
                <div className="w-44 md:w-56 shrink-0" />
                <div className="flex-1 flex justify-between px-1">
                    {[0, 8, 16, 24, 32].map(v => (
                        <span key={v} className="text-xs text-slate-400">${v}T</span>
                    ))}
                </div>
                <div className="w-16 shrink-0" />
            </div>
        </div>
    );
}
