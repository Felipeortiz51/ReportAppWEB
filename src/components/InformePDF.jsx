import React, { useEffect } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import logoMarsol from '../assets/imagenMarsol.png';
import logoNewrest from '../assets/imagenCompass.png'
// Asumimos que tienes un logo para el pie de página, si no, puedes quitarlo.
//import logoFirma from '../assets/imagenFirma.png'; 

pdfMake.vfs = pdfFonts.pdfMake.vfs;

// --- Funciones auxiliares para imágenes (las mantenemos) ---
const getBase64ImageFromFile = (file) => {
  return new Promise((resolve) => {
    if (!file) {
      resolve(null); // Devolvemos null si no hay imagen
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
};

const getBase64ImageFromURL = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL);
    };
    img.onerror = error => reject(error);
    img.src = url;
  });
};


const InformePDF = ({ informe }) => {

  useEffect(() => {
    const generatePdf = async () => {
      if (!informe || !informe.equipos) {
        console.error("Datos del informe no válidos.");
        return;
      }
      
      console.log("DATOS RECIBIDOS PARA EL PDF:", JSON.stringify(informe, null, 2));

      try {
        const marsolLogo = await getBase64ImageFromURL(logoMarsol);
        const newrestLogo = await getBase64ImageFromURL(logoNewrest);
        //const firmaLogo = await getBase64ImageFromURL(logoFirma);
        
        // --- Contenido del PDF, empezamos con el resumen ---
        const content = [];

        content.push({
            // --- AJUSTE 2: Logos más arriba (menos margen superior) ---
            columns: [
                { image: marsolLogo, width: 190 }, // Logo más grande
                { text: `Registro diario de Actividades\nFecha: ${new Date(informe.fecha).toLocaleDateString('es-ES')}`, style: 'header', alignment: 'center', margin: [0, 10, 0, 0] },
                { image: newrestLogo, width: 190, alignment: 'right' }, // Logo más grande
            ],
            margin: [15, 0, 35, 15] // Margen general de la cabecera
        });

        // 2. Lógica para construir el cuerpo de la tabla
        const summaryTableHeader = ['EQUIPO', 'ID EQUIPO', 'UBICACIÓN', 'PROGRAMADO', 'ACCIÓN REALIZADA', 'PRESUPUESTO'].map(h => ({ text: h, style: 'tableHeader' }));
        
        const summaryTableBody = informe.equipos.map(e => {
            // --- AJUSTE 4: Celda de Acción Realizada mejorada ---
            const accionCell = {
                stack: [
                    { text: e.accionRealizada, style: 'tableCellJustify' } // Texto alineado a la izquierda
                ]
            };
            if (e.operativo) {
                // Se alinea a la izquierda por defecto dentro del stack
                accionCell.stack.push({
                    // Usamos 'columns' con 'width: auto' para que la píldora
                    // solo ocupe el ancho de su texto.
                    columns: [{
                        text: 'Equipo operativo',
                        style: 'statusOperativoTabla',
                        width: 'auto'
                    }],
                    margin: [5, 0, 0, 0]
                });
            }

            return [
                { text: e.nombre, style: 'tableCell' },
                { text: e.idEquipo, style: 'tableCell' },
                { text: e.ubicacion, style: 'tableCell' },
                { text: e.programado, style: 'tableCell' },
                accionCell,
                { text: e.presupuesto, style: 'tableCell' }
            ];
        });

        // Añadimos la tabla completa al contenido
        content.push({
            table: {
                headerRows: 1,
                // --- AJUSTE 3: Anchos de columna corregidos ---
                widths: ['18%', '15%', '15%', '12%', '28%', '12%'],
                body: [summaryTableHeader, ...summaryTableBody]
            },
            layout: {
              hLineWidth: function (i, node) {
                // Dibuja una línea debajo de la cabecera y debajo de cada fila, pero no arriba de todo.
                return (i === 1 || i > 0 && i < node.table.body.length) ? 0.5 : 0;
              },
              vLineWidth: function (i, node) {
                // No dibuja líneas verticales
                return 0;
              },
              hLineColor: function (i, node) {
                // Color gris claro para las líneas
                return '#dddddd';
              },
            }
        });


        // --- Páginas de Detalle por Equipo ---
        for (const equipo of informe.equipos) {
          // Si no es el primer elemento, añade un salto de página
          if (content.length > 0) {
            content.push({ text: '', pageBreak: 'before' });
          }

          // Título de la página
          content.push({ text: `${equipo.nombre} / ${equipo.idEquipo}`, style: 'subheader', absolutePosition: { x: 40, y: 25 }});

          // --- 1. TAREAS PRELIMINARES (ESTÁTICAS) ---
          content.push({
            stack: [
              { text: '• Se realiza búsqueda de equipo para mantención preventiva según planificación del mes.' },
              { text: '• Se realiza bloqueo tipo bolsa en enchufe macho de equipo.' },
              { text: '• Se utiliza abrillantador se acero para la mantención.' },
              {
                // Envolvemos en columns para que el fondo solo cubra el texto
                columns: [{
                  text: '• EQUIPO OPERATIVO',
                  style: 'statusOperativoBanner',
                  width: 'auto'
                }],
                margin: [0, 2, 0, 0]
              }
            ],
            absolutePosition: { x: 40, y: 40 }
          });
          // --- Posiciones de los bloques inferiores ---
          const yOffset = 130; // Ajustamos la posición 'y' para todo lo que viene debajo

          // --- Bloque de Identificación de Equipo ---
          content.push({
            canvas: [{ type: 'rect', x: 0, y: 0, w: 230, h: 80, r: 1, lineColor: '#000000' }],
            absolutePosition: { x: 35, y: yOffset }
          });
          content.push({
            stack: [
              { text: 'Identificación de equipo:', style: 'sectionTitle' },
              { text: `• MARCA: ${equipo.identificacion.marca}` },
              { text: `• MOD: ${equipo.identificacion.modelo}` },
              { text: `• N° SERIE: ${equipo.identificacion.numSerie}` },
            ],
            absolutePosition: { x: 50, y: yOffset + 10 }
          });
          // --- Bloque de Consumo Eléctrico ---
          content.push({
            canvas: [{ type: 'rect', x: 0, y: 0, w: 250, h: 70, r: 5, lineColor: '#cccccc' }],
            absolutePosition: { x: 550, y: yOffset }
          });
          content.push({
            stack: [
              { text: 'Registro de consumo eléctrico:', style: 'sectionTitle' },
              { text: `• Corriente: ${equipo.consumoElectrico.corriente}` },
              { text: `• Voltaje: ${equipo.consumoElectrico.voltaje}` },
            ],
            absolutePosition: { x: 560, y: yOffset + 10 }
          });

          // --- Imágenes de equipo y serie (las movemos debajo de sus recuadros) ---
          const yImagenesId = yOffset + 110;
          const imgEquipo = await getBase64ImageFromFile(equipo.imagenes.equipo);
          if (imgEquipo) { content.push({ image: imgEquipo, width: 140, absolutePosition: { x: 40, y: yImagenesId } }); }
          
          const imgSerie = await getBase64ImageFromFile(equipo.imagenes.serie);
          if (imgSerie) { content.push({ image: imgSerie, width: 140, absolutePosition: { x: 230, y: yImagenesId } }); }
          
          // Flecha entre imágenes
          content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 40, y2: 0, lineWidth: 1 }, { type: 'line', x1: 40, y1: 0, x2: 35, y2: -3, lineWidth: 1 }, { type: 'line', x1: 40, y1: 0, x2: 35, y2: 3, lineWidth: 1 }], absolutePosition: { x: 185, y: yImagenesId + 70 } });

         
          
          // --- 2. TAREAS ESPECÍFICAS (DINÁMICAS, del formulario) ---
          const yTareasDinamicas = yImagenesId + 160;
          content.push({
            canvas: [{ type: 'rect', x: 0, y: 0, w: 450, h: 100, r: 5, lineColor: '#cccccc' }],
            absolutePosition: { x: 40, y: yTareasDinamicas }
          });
          const dynamicTaskListContent = equipo.tareas.map(t => ({ text: `➤ ${t.descripcion}` }));
          content.push({
            stack: dynamicTaskListContent,
            absolutePosition: { x: 50, y: yTareasDinamicas + 10 }
          });

          // Galería inferior (ajustamos su posición 'y' final)
          const yGaleria = yTareasDinamicas + 110;
          let currentX = 40;
          for (const imgFile of equipo.galeria) {
            const galImg = await getBase64ImageFromFile(imgFile);
            if (galImg) {
              content.push({ image: galImg, width: 140, absolutePosition: { x: currentX, y: yGaleria }});
              currentX += 160;
            }
          }
        }

        // --- Definición del Documento ---
        const docDefinition = {
          pageSize: 'A4',
          pageOrientation: 'landscape',
          content: content,
          
          // --- AQUÍ ESTÁ LA MAGIA: EL BORDE DE PÁGINA ---
          background: function(currentPage, pageSize) {
            // Dejamos el borde de página solo para las páginas de detalle (a partir de la página 2)
            if (currentPage > 1) {
              return { canvas: [{ type: 'rect', x: 20, y: 20, w: pageSize.width - 40, h: pageSize.height - 40, lineWidth: 2, lineColor: '#33a2ff' }]};
            }
          },
          // ---------------------------------------------
          
          styles: {
            // --- AJUSTE 2: Título más pequeño ---
            header: { fontSize: 12, bold: true },
            subheader: { fontSize: 12, bold: true },
            tableHeader: { bold: true, fontSize: 10, color: 'white', fillColor: '#33a2ff', alignment: 'center' },
            tableCell: { fontSize: 9, margin: [5, 5, 5, 5], alignment: 'center' },
            // Nuevo estilo para celdas alineadas a la izquierda
            tableCellJustify: { fontSize: 9, margin: [5, 5, 5, 5], alignment: 'justify' },
            statusOperativo: { bold: true, color: 'black', alignment: 'center', fontSize: 11 },
            // --- AJUSTE 4: Estilo de la píldora "operativo" ---
            statusOperativoBanner: {
              background: '#c6f6d5',
              color: '#2f6f42',
              bold: true,
              // Usamos un truco con 'columns' y 'width: auto' para que el fondo solo cubra el texto
              columns: [{ text: '', width: 'auto' }] 
            },
            statusOperativoTabla: { background: '#c6f6d5', bold: true, alignment: 'center', padding: [5, 2, 5, 2], margin: [0, 2, 0, 2] },
            sectionTitle: { bold: true, fontSize: 11, margin: [0, 0, 0, 5]}
          },
          defaultStyle: { fontSize: 10, alignment: 'left' },
          footer: function(currentPage, pageCount) {
            return {
              columns: [
                
                { text: `Página ${currentPage.toString()} de ${pageCount}`, alignment: 'right', margin: [0, 10, 40, 0] }
              ]
            };
          }
        };
        
        pdfMake.createPdf(docDefinition).download(`Reporte_Diario_${informe.fecha}.pdf`);
      
      } catch (error) {
        console.error("Error al generar el PDF:", error);
        alert("Hubo un error al generar el PDF. Revisa la consola para más detalles.");
      }
    };

    generatePdf();
  }, [informe]);

  return <div className="p-4 text-center text-blue-600 font-bold">Generando informe, por favor espera...</div>;
};

export default InformePDF;