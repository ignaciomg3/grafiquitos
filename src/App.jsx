import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Tecnologia from './pages/Tecnologia';
import Economia from './pages/Economia';
import Humanidades from './pages/Humanidades';
import PuestosDemandados from './pages/PuestosDemandados';
import Politica from './pages/Politica';
import Inicio from './pages/Inicio';
import InformeMercado from './pages/InformeMercado';

// Placeholders for other components
const Placeholder = ({ title }) => (
  <div className="flex-grow flex items-center justify-center bg-white/90 rounded-2xl shadow-sm border border-slate-200">
    <div className="text-center">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h3 className="text-xl font-medium text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 max-w-sm">Los gráficos de esta sección se publicarán próximamente.</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="inicio" element={<Navigate to="/" replace />} />
          <Route path="economia" element={<Economia />} />
          <Route path="humanidades" element={<Humanidades />} />
          <Route path="puestos-demandados" element={<PuestosDemandados />} />
          <Route path="tecnologia" element={<Tecnologia />} />
          <Route path="politica" element={<Politica />} />
          <Route path="informe-mercado" element={<InformeMercado />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
