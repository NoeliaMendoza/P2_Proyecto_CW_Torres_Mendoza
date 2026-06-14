import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChemicalProvider } from './context/ChemicalContext';
import { Layout } from './components';
import { Inicio, Tabla, Calculadora, Favoritos, Historial, Login, Registro } from './pages';

function App() {
  return (
    <ChemicalProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/tabla" element={<Tabla />} />
            <Route path="/calculadora" element={<Calculadora />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/historial" element={<Historial />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ChemicalProvider>
  );
}

export default App;