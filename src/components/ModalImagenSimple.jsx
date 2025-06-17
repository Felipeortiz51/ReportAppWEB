import React, { useState } from 'react';

const ModalImagenSimple = ({ isOpen, onClose, agregarImagen, label }) => {
  const [imagen, setImagen] = useState(null);

  // Cambiamos el nombre de la función para mayor claridad, ya no es un 'submit'
  const handleAgregarClick = () => {
    if (imagen) {
      agregarImagen(imagen);
      setImagen(null);
      // Limpiamos el input de archivo manualmente
      document.getElementById('file-input-modal').value = ""; 
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-md w-1/2">
        <h3 className="text-lg font-bold mb-4">{label}</h3>
        
        {/* YA NO HAY ETIQUETA <form> AQUÍ */}
        <div className="mb-4">
          <label className="block text-gray-700">Imagen:</label>
          <input
            type="file"
            id="file-input-modal" // Añadimos un ID para poder limpiarlo
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button" // Cambiado de "submit" a "button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAgregarClick} // Usamos onClick en lugar de onSubmit
          >
            Agregar
          </button>
        </div>

      </div>
    </div>
  );
};

export default ModalImagenSimple;