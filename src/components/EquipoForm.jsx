import React, { useState } from 'react';
import ModalImagenSimple from './ModalImagenSimple';

const EquipoForm = ({ equipo, handleEquipoChange, removeEquipo }) => {
  console.log(`Renderizando EquipoForm con ID: ${equipo.id}`); // <--- AÑADE ESTA LÍNEA

  const [modalOpen, setModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(null);

  // Ahora las funciones llaman al 'handler' del padre usando el ID del equipo
  const updateField = (field, value) => {
    handleEquipoChange(equipo.id, field, value);
  };

  const openModal = (field, index = null) => {
    setCurrentField(field);
    if (field === 'tarea') setCurrentTaskIndex(index);
    if (field === 'galeria') setCurrentGalleryIndex(index);
    setModalOpen(true);
  };

  const agregarImagen = (imagen) => {
    if (currentField === 'tarea') {
      const newTasks = equipo.tareas.map((t, i) => i === currentTaskIndex ? { ...t, imagen } : t);
      updateField('tareas', newTasks);
    } else if (currentField === 'galeria') {
      const newGallery = [...equipo.galeria];
      newGallery[currentGalleryIndex] = imagen;
      updateField('galeria', newGallery);
    } else {
      updateField('imagenes', { ...equipo.imagenes, [currentField]: imagen });
    }
    setModalOpen(false);
    setCurrentTaskIndex(null);
    setCurrentGalleryIndex(null);
  };

  const handleTaskChange = (taskIndex, value) => {
    const newTasks = equipo.tareas.map((task, i) => i === taskIndex ? { ...task, descripcion: value } : task);
    updateField('tareas', newTasks);
  };

  const addTask = () => {
    updateField('tareas', [...equipo.tareas, { descripcion: '', imagen: null }]);
  };
  
  const removeTask = (taskIndex) => {
    updateField('tareas', equipo.tareas.filter((_, i) => i !== taskIndex));
  };

  return (
    <div className="mb-6 border-2 border-gray-300 p-4 rounded-lg relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Equipo: {equipo.nombre || 'Nuevo Equipo'}</h3>
        <button type="button" onClick={() => removeEquipo(equipo.id)} className="bg-red-500 text-white font-bold py-1 px-3 rounded">&times;</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input type="text" placeholder="Nombre del Equipo" value={equipo.nombre} onChange={e => updateField('nombre', e.target.value)} className="border p-2 rounded w-full" />
        <input type="text" placeholder="ID Equipo" value={equipo.idEquipo} onChange={e => updateField('idEquipo', e.target.value)} className="border p-2 rounded w-full" />
        <input type="text" placeholder="Ubicación" value={equipo.ubicacion} onChange={e => updateField('ubicacion', e.target.value)} className="border p-2 rounded w-full" />
        <select value={equipo.operativo} onChange={e => updateField('operativo', e.target.value === 'true')} className="border p-2 rounded w-full">
          <option value={true}>Equipo Operativo</option>
          <option value={false}>Equipo No Operativo</option>
        </select>
        <textarea placeholder="Acción Realizada (Resumen para la tabla inicial)" value={equipo.accionRealizada} onChange={e => updateField('accionRealizada', e.target.value)} className="border p-2 rounded w-full md:col-span-2" rows="4" />
      </div>

      <fieldset className="border p-3 rounded mb-4">
        <legend className="font-bold px-2">Identificación de Equipo</legend>
        <div className="grid md:grid-cols-3 gap-2 mb-4">
            <input type="text" placeholder="Marca" value={equipo.identificacion.marca} onChange={e => updateField('identificacion', {...equipo.identificacion, marca: e.target.value})} className="border p-2 rounded w-full" />
            <input type="text" placeholder="Modelo" value={equipo.identificacion.modelo} onChange={e => updateField('identificacion', {...equipo.identificacion, modelo: e.target.value})} className="border p-2 rounded w-full" />
            <input type="text" placeholder="N° de Serie" value={equipo.identificacion.numSerie} onChange={e => updateField('identificacion', {...equipo.identificacion, numSerie: e.target.value})} className="border p-2 rounded w-full" />
        </div>
        <div className="flex gap-4 items-start flex-wrap">
          <button type="button" onClick={() => openModal('equipo')} className="bg-blue-500 text-white p-2 rounded">{equipo.imagenes.equipo ? 'Cambiar Imagen Equipo' : 'Subir Imagen Equipo'}</button>
          {equipo.imagenes.equipo && <img src={URL.createObjectURL(equipo.imagenes.equipo)} alt="Equipo" className="w-24 h-24 object-cover rounded" />}
          <button type="button" onClick={() => openModal('serie')} className="bg-blue-500 text-white p-2 rounded">{equipo.imagenes.serie ? 'Cambiar Imagen Serie' : 'Subir Imagen Serie'}</button>
          {equipo.imagenes.serie && <img src={URL.createObjectURL(equipo.imagenes.serie)} alt="Serie" className="w-24 h-24 object-cover rounded" />}
        </div>
      </fieldset>

      <fieldset className="border p-3 rounded mb-4">
        <legend className="font-bold px-2">Consumo Eléctrico</legend>
        <div className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="Voltaje (ej: 220V)" value={equipo.consumoElectrico.voltaje} onChange={e => updateField('consumoElectrico', {...equipo.consumoElectrico, voltaje: e.target.value})} className="border p-2 rounded w-full" />
            <input type="text" placeholder="Corriente (ej: 1.5A)" value={equipo.consumoElectrico.corriente} onChange={e => updateField('consumoElectrico', {...equipo.consumoElectrico, corriente: e.target.value})} className="border p-2 rounded w-full" />
        </div>
      </fieldset>
      
      <fieldset className="border p-3 rounded mb-4">
        <legend className="font-bold px-2">Tareas de Mantenimiento (Detalladas)</legend>
        {equipo.tareas.map((task, taskIndex) => (
          <div key={taskIndex} className="flex gap-2 mb-2 items-center">
            <span className="font-bold text-gray-500">➤</span>
            <input type="text" placeholder={`Tarea ${taskIndex + 1}`} value={task.descripcion} onChange={e => handleTaskChange(taskIndex, e.target.value)} className="border p-2 rounded w-full" />
            <button type="button" onClick={() => removeTask(taskIndex)} className="bg-red-500 text-white font-bold h-10 w-10 rounded text-xl">-</button>
          </div>
        ))}
        <button type="button" onClick={addTask} className="bg-gray-500 text-white p-2 rounded mt-2">Añadir Tarea</button>
      </fieldset>

      <fieldset className="border p-3 rounded mb-4">
        <legend className="font-bold px-2">Galería de Imágenes (inferior)</legend>
        <div className="flex gap-4 items-start flex-wrap">
          {equipo.galeria.map((img, galIndex) => (
            <div key={galIndex} className="flex flex-col items-center gap-2">
                <button type="button" onClick={() => openModal('galeria', galIndex)} className="bg-blue-500 text-white p-2 rounded w-24">{img ? 'Cambiar' : 'Subir'} Img {galIndex + 1}</button>
                {img && <img src={URL.createObjectURL(img)} alt={`Galería ${galIndex + 1}`} className="w-24 h-24 object-cover rounded" />}
            </div>
          ))}
        </div>
      </fieldset>

      <ModalImagenSimple isOpen={modalOpen} onClose={() => setModalOpen(false)} agregarImagen={agregarImagen} label="Agregar Imagen" />
    </div>
  );
};

export default EquipoForm;