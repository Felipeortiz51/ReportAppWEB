import React, { useState } from 'react';
import FormularioInformeDiario from './components/FormularioInformeDiario';
import FormularioInformeFalla from './components/FormularioInformeFalla';
import InformePDF from './components/InformePDF';
import './index.css';

function App() {
  const [tipoInforme, setTipoInforme] = useState('');
  const [informe, setInforme] = useState(null);

  const handleTipoInformeChange = (event) => {
    setTipoInforme(event.target.value);
  };

  const agregarInforme = (nuevoInforme) => {
    setInforme(nuevoInforme);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Creación de Informes Técnicos</h1>
      <div className="mb-4">
        <label className="block mb-2">Tipo de Informe:</label>
        <select
          value={tipoInforme}
          onChange={handleTipoInformeChange}
          className="block w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Seleccionar tipo de informe</option>
          <option value="diario">Reporte Diario</option>
          <option value="falla">Informe de Falla</option>
        </select>
      </div>
      {tipoInforme === 'diario' && <FormularioInformeDiario agregarInforme={agregarInforme} />}
      {tipoInforme === 'falla' && <FormularioInformeFalla agregarInforme={agregarInforme} />}
      
      {informe && <InformePDF informe={informe} />}
    </div>
  );
}

export default App;
