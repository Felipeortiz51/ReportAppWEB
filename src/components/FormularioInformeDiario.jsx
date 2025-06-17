import React, { useState } from 'react';
import EquipoForm from './EquipoForm';

const FormularioInformeDiario = ({ agregarInforme }) => {
  const [fecha, setFecha] = useState('');
  const [equipos, setEquipos] = useState([]);

  // Esta función asegura que cada equipo nuevo tenga la estructura completa
  const createNewEquipo = () => ({
    id: Date.now(),
    nombre: '',
    idEquipo: '',
    ubicacion: '',
    programado: 'SI',
    accionRealizada: '',
    presupuesto: 'NO',
    operativo: true,
    identificacion: { // Objeto anidado para la identificación
      marca: '',
      modelo: '',
      numSerie: ''
    },
    imagenes: {
      equipo: null,
      serie: null,
    },
    consumoElectrico: {
      corriente: '',
      voltaje: '',
    },
    tareas: [{ descripcion: '', imagen: null }],
    galeria: Array(5).fill(null),
  });

  const addEquipo = () => {
    setEquipos(prevEquipos => [...prevEquipos, createNewEquipo()]);
  };

  const removeEquipo = (idToRemove) => {
    setEquipos(prevEquipos => prevEquipos.filter(equipo => equipo.id !== idToRemove));
  };

  const handleEquipoChange = (idToUpdate, field, value) => {
    setEquipos(prevEquipos =>
      prevEquipos.map(equipo =>
        equipo.id === idToUpdate ? { ...equipo, [field]: value } : equipo
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarInforme({
      tipo: 'diario',
      fecha,
      equipos,
    });
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Formulario de Reporte Diario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Fecha:</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        {equipos.map((equipo) => (
          <EquipoForm
            key={equipo.id}
            equipo={equipo}
            removeEquipo={removeEquipo}
            handleEquipoChange={handleEquipoChange}
          />
        ))}

        <div className="flex gap-4">
          <button type="button" onClick={addEquipo} className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mt-4">
            Añadir Equipo
          </button>
          <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-4">
            Generar Informe
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioInformeDiario;