// src/components/ModalImagenAccion.jsx
import React, { useState } from 'react';

const ModalImagenAccion = ({ isOpen, onClose, agregarImagenAccion, label }) => {
  const [imagen, setImagen] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imagen) {
      agregarImagenAccion(imagen);
      setImagen(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md w-1/2">
        <h3 className="text-lg font-bold mb-4">{label}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Imagen:</label>
            <input
              type="file"
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
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalImagenAccion;
