import React, { useState } from 'react';
import ModalImagenSimple from './ModalImagenSimple';

const FormularioInformeDiario = ({ agregarInforme }) => {
  const [fecha, setFecha] = useState('');
  const [numPreventivo, setNumPreventivo] = useState(0);
  const [numCorrectivo, setNumCorrectivo] = useState(0);
  const [equiposPreventivo, setEquiposPreventivo] = useState([]);
  const [equiposCorrectivo, setEquiposCorrectivo] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEquipoIndex, setCurrentEquipoIndex] = useState(null);
  const [currentTipo, setCurrentTipo] = useState('');
  const [currentField, setCurrentField] = useState('');

  const equiposPredeterminados = [
    "HORNO MANTENEDOR: UNOX EVEREO XEEC1011-EPR",
    "MESON CONGELADOR HUDSON: G-UC1200F",
    "REFRIGERADOR HUDSON MODELO: D28ARG",
    "TERMO AUTOLLENANTE FETCO: HWB-2105",
    "TERMO AUTOLLENANTE FETCO: HWB-2110",
    "HORNO RATIONAL: MODELO ICOMBI CLASSIC",
    "KIT DE ABLANDADOR DE AGUA: KING-B65",
    "ESTABILIZADOR DE VOLTAJE BURON: E1400VA + A",
    "HORNO RATIONAL: MODELO ICOMBI PRO"
  ];

  const textosPredeterminados = {
    "HORNO RATIONAL: MODELO ICOMBI CLASSIC": "Se realiza mantenimiento preventivo según plan de planificación. Se procede a reapriete y limpieza de componentes (resistencia, relé de estado sólido, turbina, ventilador, transformador, bomba m4, etc.) además se hace una medición de parámetros eléctricos del equipo.\nNOTA: ENTREGA EQUIPO OPERATIVO",
    "KIT DE ABLANDADOR DE AGUA: KING-B65": "Se realiza mantenimiento preventivo según planificación. Equipo se encuentra con sal. Se procede a un reapriete de conexiones eléctricas, limpieza en general y revisión de parámetros.\nNOTA: ENTREGA EQUIPO OPERATIVO",
    "ESTABILIZADOR DE VOLTAJE BURON: E1400VA + A": "Se realiza mantención preventiva, según pauta de planificación, se realiza limpieza con limpia contacto, reapriete de conexiones eléctrica y mediciones de consumo eléctricos.\nNOTA: ENTREGA EQUIPO OPERATIVO",
    "REFRIGERADOR HUDSON MODELO: D28ARG": "Se realiza mantención preventiva, según pauta de planificación, se realiza limpieza de unidad evaporadora, condensadora y componentes. Además, se realiza reapriete de partes eléctricas. Lubricación de partes móviles. Se realiza prueba de funcionamiento.\nNOTA: ENTREGA EQUIPO OPERATIVO",
    "HORNO MANTENEDOR: UNOX EVEREO XEEC1011-EPR": "Se realiza mantenimiento preventivo a equipo según pauta de planificación. Se realiza limpieza, reapriete y toma de mediciones eléctrica, además se realiza una inspección visual de componente. Se realiza una prueba de funcionamiento.\nNOTA: EQUIPO OPERATIVO",
    "MESON CONGELADOR HUDSON: G-UC1200F": "Se realiza mantención preventiva, según pauta de planificación, se realiza limpieza de unidad evaporadora, condensadora y componentes. Además, se realiza reapriete de partes eléctricas. Lubricación de partes móviles. Se realiza prueba de funcionamiento.\nNOTA: ENTREGA EQUIPO OPERATIVO",
    "TERMO AUTOLLENANTE FETCO: HWB-2105": "Se realiza mantenimiento preventivo según planificación. Se realiza limpieza y reapriete de terminales eléctricos, chequeo estructural, chequeo de calcificación (equipo se encuentra sin sarro). Se realiza prueba de funcionamiento.\nNOTA: ENTREGA EQUIPO OPERATIVO",
    "TERMO AUTOLLENANTE FETCO: HWB-2110": "Se realiza mantenimiento preventivo según planificación. Se realiza limpieza y reapriete de terminales eléctricos, chequeo estructural, chequeo de calcificación (equipo se encuentra sin sarro). Se realiza prueba de funcionamiento.\nNOTA: ENTREGA EQUIPO OPERATIVO",
    "HORNO RATIONAL: MODELO ICOMBI PRO": "Se realiza mantenimiento preventivo según plan de planificación. Se procede a reapriete y limpieza de componentes (resistencia, relé de estado sólido, turbina, ventilador, transformador, bomba m4, etc.) además se hace una medición de parámetros eléctricos del equipo.\nNOTA: ENTREGA EQUIPO OPERATIVO"
  };
  const descripcionesPredeterminadas = {
    "HORNO MANTENEDOR: UNOX EVEREO XEEC1011-EPR": `SE REALIZA LIMPIEZA DE COMPONENTES
ELECTRICOS CON LIMPIA CONTACTO.
SE REALIZA REAPRIETE DE COMPONENTES
ELECTRICOS
SE LUBRICA PARTES MOVILES DEL EQUIPO
(TURBINA)
SE HACE LIMPIEZA DE SONDA 1, SONDA 2
Y SENSOR DE HUMEDAD CON LIMPIA
CONTACTO
SE PRUEBA FUNCIONAMIENTO DE
EQUIPO
EQUIPO OPERATIVO`,
    "MESON CONGELADOR HUDSON: G-UC1200F": `SE REALIZA LIMPIEZA DE UNIDAD
CONDENSADORA
SE REALIZA REAPRETE DE TERMINALES
ELECTRICOS
SE APLICA LIMPIA CONTACTO A LOS
COMPONENTES ELECTRICO
SE LIMPIA UNIDAD EVAPORADORA SE
PRUEBA FUNCIONAMIENTO DEL
EQUIPO
SE LIMPIA LA BANDEJA DE REBALSE DE
EQUIPO
EQUIPO OPERATIVO`,
    "REFRIGERADOR HUDSON MODELO: D28ARG": `SE REALIZA LIMPIEZA DE UNIDAD
EVAPORADORA
SE HACE UNA LUBRICACION DE PARTES
MOVILES DE LA UNIDAD EVAPORADORA
SE REALIZA LIMPIEZA DE UNIDAD
CONDENSADORA
SE HACE LUBRICACION DE PARTES
MOVILES DE UNIDAD CONDENSADORA
SE REALIZA UNA REVISION VISUAL DEL
EQUIPO (BURLETE, PUERTA CARCASA)
EQUIPO SE ENCUENTRA OPERATIVO`,
    "ESTABILIZADOR DE VOLTAJE BURON: E1400VA + A": `SE REALIZA LIMPIEZA GENERAL POR DENTRO
DEL EQUIPO Y POR CARCASA
SE HACE UN REAPRETE DE CONEXIONES
ELECTRICAS
SE APLICA LIMPIA CONTACTO A LOS
TERMINALES ELECTRICOS
SE REALIZA PRUEBA DE FUNCIONAMIENTO Y
MEDICIONES DE PARAMETROS ELECTRICOS
EQUIPO OPERATIVO`,
    "KIT DE ABLANDADOR DE AGUA: KING-B65": `SE REALIZA LIMPIEZA DE EQUIPO
SE REVISA QUE EQUIPO NO CUENTE CON
ALGUNA FILTRACION (EQUIPO SIN
FILTRACION)
SE REVISA SAL DE EQUIPO, EQUIPO SE
ENCONTRABA SIN SAL, SE DEJA CON EL
100% DE SAL
EQUIPO OPERATIVO`,
    "HORNO RATIONAL: MODELO ICOMBI CLASSIC": `SE REALIZA LIMPIEZA DE FILTRO
SE HACE UNA LIMPIEZA Y REAPRIETE DE
COMPONENTE ELECTRICOS
SE REVISA FUNCIONAMIENTO DE EQUIPO
EN EL PROCESO DE VAPORMIXTO-SECO
SE OBSERVA EL HISTORIAL DE ERRORES
DEL EQUIPO Y SE PROCEDE HACER UN
REINICIO
SE APLICA LIMPIA CONTACTO A
TERMINALES ELECTRICOS
SE HACE UN LAVADO SIN PASTILLA DEL
EQUIPO
EQUIPO OPERATIVO`,
    "HORNO RATIONAL: MODELO ICOMBI PRO": `SE REALIZA LIMPIEZA DE FILTRO
SE HACE UNA LIMPIEZA Y REAPRIETE DE
COMPONENTE ELECTRICOS
SE REVISA FUNCIONAMIENTO DE EQUIPO
EN EL PROCESO DE VAPORMIXTO-SECO
SE OBSERVA EL HISTORIAL DE ERRORES
DEL EQUIPO Y SE PROCEDE HACER UN
REINICIO
SE APLICA LIMPIA CONTACTO A
TERMINALES ELECTRICOS
SE HACE UN LAVADO SIN PASTILLA DEL
EQUIPO
EQUIPO OPERATIVO`,
    "TERMO AUTOLLENANTE FETCO: HWB-2105": `SE REALIZA LIMPIEZA Y REAPRIETE DE
TERMINALES ELECTRICOS
CHEQUEO ESTRUCTURAL DE EQUIPO
SE HACE UN CHEQUEO DE CALSIFICACION
(SE HACE LIMPIEZA DE EQUIPO)
SE PRUEBA EL FUNCIONAMIENTO DE
EQUIPO
EQUIPO OPERATIVO`,
    "TERMO AUTOLLENANTE FETCO: HWB-2110": `SE REALIZA LIMPIEZA Y REAPRIETE DE
TERMINALES ELECTRICOS
CHEQUEO ESTRUCTURAL DE EQUIPO
SE HACE UN CHEQUEO DE CALSIFICACION
(SE HACE LIMPIEZA DE EQUIPO)
SE PRUEBA EL FUNCIONAMIENTO DE
EQUIPO
EQUIPO OPERATIVO`
  };

  const handleEquipoChange = (index, key, value, tipo) => {
    const equipos = tipo === 'preventivo' ? [...equiposPreventivo] : [...equiposCorrectivo];
    equipos[index] = { ...equipos[index], [key]: value };

    // Si el campo cambiado es 'equipo', actualizar el campo 'accion' con el texto predeterminado si existe
    if (key === 'equipo') {
      if (textosPredeterminados[value]) {
        equipos[index].accion = textosPredeterminados[value];
      }
      if (descripcionesPredeterminadas[value]) {
        equipos[index].descripcionImagenes = descripcionesPredeterminadas[value];
      }
    }

    tipo === 'preventivo' ? setEquiposPreventivo(equipos) : setEquiposCorrectivo(equipos);
  };

  const agregarImagen = (imagen, field) => {
    const equipos = currentTipo === 'preventivo' ? [...equiposPreventivo] : [...equiposCorrectivo];
    equipos[currentEquipoIndex] = { ...equipos[currentEquipoIndex], [field]: imagen };
    currentTipo === 'preventivo' ? setEquiposPreventivo(equipos) : setEquiposCorrectivo(equipos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoInforme = {
      tipo: 'diario',
      fecha,
      equiposPreventivo,
      equiposCorrectivo,
    };
    agregarInforme(nuevoInforme);
    setFecha('');
    setNumPreventivo(0);
    setNumCorrectivo(0);
    setEquiposPreventivo([]);
    setEquiposCorrectivo([]);
  };

  const openModal = (index, tipo, field) => {
    setCurrentEquipoIndex(index);
    setCurrentTipo(tipo);
    setCurrentField(field);
    setModalOpen(true);
  };

  const handleNumPreventivoChange = (e) => {
    const num = parseInt(e.target.value);
    if (!isNaN(num) && num >= 0) {
      setNumPreventivo(num);
      setEquiposPreventivo(Array(num).fill({ 
        equipo: '', idEquipo: '', ubicacion: '', programado: 'Sí', accion: '', presupuesto: 'NO', 
        imagenesDescripciones: [], imagenEquipo: null, imagenIdEquipo: null, imagenAccion: null,
        tension: '', imagenTension: null, numConsumos: 1, consumo1: '', imagenConsumo1: null, consumo2: '', imagenConsumo2: null, descripcionImagenes: '' 
      }));
    }
  };

  const handleNumCorrectivoChange = (e) => {
    const num = parseInt(e.target.value);
    if (!isNaN(num) && num >= 0) {
      setNumCorrectivo(num);
      setEquiposCorrectivo(Array(num).fill({ 
        equipo: '', idEquipo: '', ubicacion: '', programado: 'No', accion: '', presupuesto: 'NO', 
        imagenesDescripciones: [], imagenEquipo: null, imagenIdEquipo: null, imagenAccion: null,
        tension: '', imagenTension: null, numConsumos: 1, consumo1: '', imagenConsumo1: null, consumo2: '', imagenConsumo2: null, descripcionImagenes: '' 
      }));
    }
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
            onClick={(e) => e.target.showPicker()}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Número de equipos de mantenimiento preventivo:</label>
          <input
            type="number"
            value={numPreventivo}
            onChange={handleNumPreventivoChange}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        {equiposPreventivo.map((equipo, index) => (
          <div key={index} className="mb-4 border p-2 rounded">
            <h3 className="font-bold">Equipo {index + 1} (Preventivo):</h3>
            <label className="block text-gray-700">Equipo:</label>
            <div className="flex">
              <select
                value={equipo.equipo}
                onChange={(e) => handleEquipoChange(index, 'equipo', e.target.value, 'preventivo')}
                className="border rounded w-full py-2 px-3 text-gray-700"
                required
              >
                <option value="">Seleccione un equipo</option>
                {equiposPredeterminados.map((equipo, idx) => (
                  <option key={idx} value={equipo}>{equipo}</option>
                ))}
              </select>
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={() => openModal(index, 'preventivo', 'imagenEquipo')}
              >
                {equipo.imagenEquipo ? 'Cambiar imagen equipo' : 'Agregar imagen equipo'}
              </button>
            </div>
            {equipo.imagenEquipo && (
              <div className="mt-2">
                <p className="text-gray-700">Imagen del equipo agregada:</p>
                <img src={URL.createObjectURL(equipo.imagenEquipo)} alt="Imagen del equipo" className="w-32 h-32 object-cover" />
              </div>
            )}
            <label className="block text-gray-700">ID Equipo:</label>
            <div className="flex">
              <input
                type="text"
                value={equipo.idEquipo}
                onChange={(e) => handleEquipoChange(index, 'idEquipo', e.target.value, 'preventivo')}
                className="border rounded w-full py-2 px-3 text-gray-700"
                required
              />
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={() => openModal(index, 'preventivo', 'imagenIdEquipo')}
              >
                {equipo.imagenIdEquipo ? 'Cambiar imagen ID' : 'Agregar imagen ID'}
              </button>
            </div>
            {equipo.imagenIdEquipo && (
              <div className="mt-2">
                <p className="text-gray-700">Imagen del ID del equipo agregada:</p>
                <img src={URL.createObjectURL(equipo.imagenIdEquipo)} alt="Imagen del ID del equipo" className="w-32 h-32 object-cover" />
              </div>
            )}
            <label className="block text-gray-700">Ubicación:</label>
            <input
              type="text"
              value={equipo.ubicacion}
              onChange={(e) => handleEquipoChange(index, 'ubicacion', e.target.value, 'preventivo')}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
            <label className="block text-gray-700">Programado:</label>
            <input
              type="text"
              value={equipo.programado}
              onChange={(e) => handleEquipoChange(index, 'programado', e.target.value, 'preventivo')}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
            <label className="block text-gray-700">Acción Realizada:</label>
            <textarea
              value={equipo.accion}
              onChange={(e) => handleEquipoChange(index, 'accion', e.target.value, 'preventivo')}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
              rows="5"
            />
            <label className="block text-gray-700">Presupuesto:</label>
            <input
              type="text"
              value={equipo.presupuesto}
              onChange={(e) => handleEquipoChange(index, 'presupuesto', e.target.value, 'preventivo')}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
            <label className="block text-gray-700 font-bold">Parametrías Eléctricas (Equipo {index + 1}) :</label>
            <label className="block text-gray-700">Tensión Eléctrica:</label>
            <div className="flex">
              <input
                type="text"
                value={equipo.tension}
                onChange={(e) => handleEquipoChange(index, 'tension', e.target.value, 'preventivo')}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={() => openModal(index, 'preventivo', 'imagenTension')}
              >
                {equipo.imagenTension ? 'Cambiar imagen tensión' : 'Agregar imagen tensión'}
              </button>
            </div>
            {equipo.imagenTension && (
              <div className="mt-2">
                <p className="text-gray-700">Imagen de la tensión agregada:</p>
                <img src={URL.createObjectURL(equipo.imagenTension)} alt="Imagen de la tensión" className="w-32 h-32 object-cover" />
              </div>
            )}
            <label className="block text-gray-700">Consumo Eléctrico:</label>
            <select
              value={equipo.numConsumos}
              onChange={(e) => handleEquipoChange(index, 'numConsumos', parseInt(e.target.value, 10), 'preventivo')}
              className="border rounded w-full py-2 px-3 text-gray-700"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
            {equipo.numConsumos >= 1 && (
              <div className="mt-2">
                <label className="block text-gray-700">Consumo 1:</label>
                <div className="flex">
                  <input
                    type="text"
                    value={equipo.consumo1}
                    onChange={(e) => handleEquipoChange(index, 'consumo1', e.target.value, 'preventivo')}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                  />
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => openModal(index, 'preventivo', 'imagenConsumo1')}
                  >
                    {equipo.imagenConsumo1 ? 'Cambiar imagen consumo 1' : 'Agregar imagen consumo 1'}
                  </button>
                </div>
                {equipo.imagenConsumo1 && (
                  <div className="mt-2">
                    <p className="text-gray-700">Imagen del consumo 1 agregada:</p>
                    <img src={URL.createObjectURL(equipo.imagenConsumo1)} alt="Imagen del consumo 1" className="w-32 h-32 object-cover" />
                  </div>
                )}
              </div>
            )}
            {equipo.numConsumos === 2 && (
              <div className="mt-2">
                <label className="block text-gray-700">Consumo 2:</label>
                <div className="flex">
                  <input
                    type="text"
                    value={equipo.consumo2}
                    onChange={(e) => handleEquipoChange(index, 'consumo2', e.target.value, 'preventivo')}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                  />
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => openModal(index, 'preventivo', 'imagenConsumo2')}
                  >
                    {equipo.imagenConsumo2 ? 'Cambiar imagen consumo 2' : 'Agregar imagen consumo 2'}
                  </button>
                </div>
                {equipo.imagenConsumo2 && (
                  <div className="mt-2">
                    <p className="text-gray-700">Imagen del consumo 2 agregada:</p>
                    <img src={URL.createObjectURL(equipo.imagenConsumo2)} alt="Imagen del consumo 2" className="w-32 h-32 object-cover" />
                  </div>
                )}
              </div>
            )}
            
            <label className="block text-gray-700">Descripción de Imagenes:</label>
            <textarea
              value={equipo.descripcionImagenes}
              onChange={(e) => handleEquipoChange(index, 'descripcionImagenes', e.target.value, 'preventivo')}
              className="border rounded w-full py-2 px-3 text-gray-700"
              rows="5"
            />
            <div className="flex flex-wrap">
              {Array(7).fill().map((_, imgIndex) => (
                <div key={imgIndex} className="flex flex-col items-center">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={() => openModal(index, 'preventivo', `imagenDescripcion${imgIndex + 1}`)}
                  >
                    {equipo[`imagenDescripcion${imgIndex + 1}`] ? `Cambiar imagen ${imgIndex + 1}` : `Agregar imagen ${imgIndex + 1}`}
                  </button>
                  {equipo[`imagenDescripcion${imgIndex + 1}`] && (
                    <img
                      src={URL.createObjectURL(equipo[`imagenDescripcion${imgIndex + 1}`])}
                      alt={`Imagen ${imgIndex + 1}`}
                      className="w-32 h-32 object-cover mt-2"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="mb-4">
          <label className="block text-gray-700">Número de equipos de mantenimiento correctivo:</label>
          <input
            type="number"
            value={numCorrectivo}
            onChange={handleNumCorrectivoChange}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        {equiposCorrectivo.map((equipo, index) => (
          <div key={index} className="mb-4 border p-2 rounded">
            <h3 className="font-bold">Equipo {index + 1} (Correctivo):</h3>
            <label className="block text-gray-700">Equipo:</label>
            <div className="flex">
              <select
                value={equipo.equipo}
                onChange={(e) => handleEquipoChange(index, 'equipo', e.target.value, 'correctivo')}
                className="border rounded w-full py-2 px-3 text-gray-700"
                required
              >
                <option value="">Seleccione un equipo</option>
                {equiposPredeterminados.map((equipo, idx) => (
                  <option key={idx} value={equipo}>{equipo}</option>
                ))}
              </select>
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={() => openModal(index, 'correctivo', 'imagenEquipo')}
              >
                {equipo.imagenEquipo ? 'Cambiar imagen equipo' : 'Agregar imagen equipo'}
              </button>
            </div>
            {equipo.imagenEquipo && (
              <div className="mt-2">
                <p className="text-gray-700">Imagen del equipo agregada:</p>
                <img src={URL.createObjectURL(equipo.imagenEquipo)} alt="Imagen del equipo" className="w-32 h-32 object-cover" />
              </div>
            )}
            <label className="block text-gray-700">ID Equipo:</label>
            <div className="flex">
              <input
                type="text"
                value={equipo.idEquipo}
                onChange={(e) => handleEquipoChange(index, 'idEquipo', e.target.value, 'correctivo')}
                className="border rounded w-full py-2 px-3 text-gray-700"
                required
              />
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={() => openModal(index, 'correctivo', 'imagenIdEquipo')}
              >
                {equipo.imagenIdEquipo ? 'Cambiar imagen ID' : 'Agregar imagen ID'}
              </button>
            </div>
            {equipo.imagenIdEquipo && (
              <div className="mt-2">
                <p className="text-gray-700">Imagen del ID del equipo agregada:</p>
                <img src={URL.createObjectURL(equipo.imagenIdEquipo)} alt="Imagen del ID del equipo" className="w-32 h-32 object-cover" />
              </div>
            )}
            <label className="block text-gray-700">Ubicación:</label>
            <input
              type="text"
              value={equipo.ubicacion}
              onChange={(e) => handleEquipoChange(index, 'ubicacion', e.target.value, 'correctivo')}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
            <label className="block text-gray-700">Programado:</label>
            <input
              type="text"
              value={equipo.programado}
              onChange={(e) => handleEquipoChange(index, 'programado', e.target.value, 'correctivo')}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
            <label className="block text-gray-700">Acción Realizada:</label>
            <textarea
              value={equipo.accion}
              onChange={(e) => handleEquipoChange(index, 'accion', e.target.value, 'correctivo')}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
              rows="5"
            />
            <label className="block text-gray-700">Presupuesto:</label>
            <input
              type="text"
              value={equipo.presupuesto}
              onChange={(e) => handleEquipoChange(index, 'presupuesto', e.target.value, 'correctivo')}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
            <label className="block text-gray-700 font-bold">Parametrías Eléctricas (Equipo {index + 1}):</label>
            <label className="block text-gray-700">Tensión Eléctrica:</label>
            <div className="flex">
              <input
                type="text"
                value={equipo.tension}
                onChange={(e) => handleEquipoChange(index, 'tension', e.target.value, 'correctivo')}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={() => openModal(index, 'correctivo', 'imagenTension')}
              >
                {equipo.imagenTension ? 'Cambiar imagen tensión' : 'Agregar imagen tensión'}
              </button>
            </div>
            {equipo.imagenTension && (
              <div className="mt-2">
                <p className="text-gray-700">Imagen de la tensión agregada:</p>
                <img src={URL.createObjectURL(equipo.imagenTension)} alt="Imagen de la tensión" className="w-32 h-32 object-cover" />
              </div>
            )}
            <label className="block text-gray-700">Consumo Eléctrico:</label>
            <select
              value={equipo.numConsumos}
              onChange={(e) => handleEquipoChange(index, 'numConsumos', parseInt(e.target.value, 10), 'correctivo')}
              className="border rounded w-full py-2 px-3 text-gray-700"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
            {equipo.numConsumos >= 1 && (
              <div className="mt-2">
                <label className="block text-gray-700">Consumo 1:</label>
                <div className="flex">
                  <input
                    type="text"
                    value={equipo.consumo1}
                    onChange={(e) => handleEquipoChange(index, 'consumo1', e.target.value, 'correctivo')}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                  />
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => openModal(index, 'correctivo', 'imagenConsumo1')}
                  >
                    {equipo.imagenConsumo1 ? 'Cambiar imagen consumo 1' : 'Agregar imagen consumo 1'}
                  </button>
                </div>
                {equipo.imagenConsumo1 && (
                  <div className="mt-2">
                    <p className="text-gray-700">Imagen del consumo 1 agregada:</p>
                    <img src={URL.createObjectURL(equipo.imagenConsumo1)} alt="Imagen del consumo 1" className="w-32 h-32 object-cover" />
                  </div>
                )}
              </div>
            )}
            {equipo.numConsumos === 2 && (
              <div className="mt-2">
                <label className="block text-gray-700">Consumo 2:</label>
                <div className="flex">
                  <input
                    type="text"
                    value={equipo.consumo2}
                    onChange={(e) => handleEquipoChange(index, 'consumo2', e.target.value, 'correctivo')}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                  />
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => openModal(index, 'correctivo', 'imagenConsumo2')}
                  >
                    {equipo.imagenConsumo2 ? 'Cambiar imagen consumo 2' : 'Agregar imagen consumo 2'}
                  </button>
                </div>
                {equipo.imagenConsumo2 && (
                  <div className="mt-2">
                    <p className="text-gray-700">Imagen del consumo 2 agregada:</p>
                    <img src={URL.createObjectURL(equipo.imagenConsumo2)} alt="Imagen del consumo 2" className="w-32 h-32 object-cover" />
                  </div>
                )}
              </div>
            )}
            <label className="block text-gray-700">Descripción de Imagenes:</label>
            <div className="flex flex-wrap">
              {Array(7).fill().map((_, imgIndex) => (
                <div key={imgIndex} className="flex flex-col items-center">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={() => openModal(index, 'correctivo', `imagenDescripcion${imgIndex + 1}`)}
                  >
                    {equipo[`imagenDescripcion${imgIndex + 1}`] ? `Cambiar imagen ${imgIndex + 1}` : `Agregar imagen ${imgIndex + 1}`}
                  </button>
                  {equipo[`imagenDescripcion${imgIndex + 1}`] && (
                    <img
                      src={URL.createObjectURL(equipo[`imagenDescripcion${imgIndex + 1}`])}
                      alt={`Imagen ${imgIndex + 1}`}
                      className="w-32 h-32 object-cover mt-2"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Agregar Informe
        </button>
      </form>

      <ModalImagenSimple
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        agregarImagen={(imagen) => agregarImagen(imagen, currentField)}
        label="Agregar imagen"
      />
    </div>
  );
};

export default FormularioInformeDiario;
