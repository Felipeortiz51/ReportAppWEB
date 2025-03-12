// src/components/FormularioInformeFalla.jsx

import React, { useState } from 'react';

const FormularioInformeFalla = ({ agregarInforme }) => {
  const [descripcion, setDescripcion] = useState('');
  const [causa, setCausa] = useState('');
  const [solucion, setSolucion] = useState('');
  const [imagen, setImagen] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoInforme = { tipo: 'falla', descripcion, causa, solucion, imagen };
    agregarInforme(nuevoInforme);
    setDescripcion('');
    setCausa('');
    setSolucion('');
    setImagen(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Formulario de Informe de Falla</h2>
      <div className="mb-4">
        <label className="block mb-2">Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Causa:</label>
        <textarea
          value={causa}
          onChange={(e) => setCausa(e.target.value)}
          required
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Solución:</label>
        <textarea
          value={solucion}
          onChange={(e) => setSolucion(e.target.value)}
          required
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Imagen:</label>
        <input
          type="file"
          onChange={(e) => setImagen(e.target.files[0])}
          required
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Agregar Informe
      </button>
    </form>
  );
};

export default FormularioInformeFalla;
