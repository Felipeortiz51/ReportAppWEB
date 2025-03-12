import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import logoMarsol from '../assets/imagenMarsol.png';
import logoCompass from '../assets/imagenCompass.png';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const InformePDF = ({ informe }) => {
  const handleGeneratePdf = async () => {
    const tableHeader = ['EQUIPO', 'ID EQUIPO', 'UBICACIÓN', 'PROGRAMADO', 'ACCIÓN REALIZADA', 'PRESUPUESTO'].map(header => ({
      text: header,
      style: 'tableHeader',
      alignment: 'center'
    }));

    const createTableBody = equipos => {
      const body = [tableHeader];
      equipos.forEach(equipo => {
        body.push([
          { text: equipo.equipo, fontSize: 10 },
          { text: equipo.idEquipo, fontSize: 10 },
          { text: equipo.ubicacion, fontSize: 10 },
          { text: equipo.programado, fontSize: 10 },
          { text: equipo.accion, fontSize: 10 },
          { text: equipo.presupuesto, fontSize: 10 }
        ]);
      });
      return body;
    };

    const chunks = [];
    for (let i = 0; i < informe.equiposPreventivo.length; i += 3) {
      chunks.push(informe.equiposPreventivo.slice(i, i + 3));
    }

    const content = [
      {
        absolutePosition: { x: 90, y: 30 },
        image: await getBase64ImageFromURL(logoMarsol),
        width: 220
      },
      {
        absolutePosition: { x: 570, y: 15 },
        image: await getBase64ImageFromURL(logoCompass),
        width: 220
      },
      {
        text: `FECHA: ${new Date(informe.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' })}`,
        style: 'subheader',
        alignment: 'center',
        fontSize: 12,
        margin: [0, 60, 0, 0]
      },
      {
        text: 'REGISTRO DIARIO DE ACTIVIDADES',
        style: 'header',
        alignment: 'center',
        margin: [0, 0, 0, 10]
      }
    ];

    for (const chunk of chunks) {
      if (content.length > 4) {
        content.push({ text: '', pageBreak: 'before' });
      }
      content.push({
        table: {
          headerRows: 1,
          widths: ['18%', '13%', '12%', '13%', '32%', '13%'],
          body: createTableBody(chunk)
        },
        layout: {
          fillColor: function (rowIndex, node, columnIndex) {
            return (rowIndex === 0) ? '#3498db' : null;
          },
          hLineWidth: function (i, node) {
            return 1;
          },
          vLineWidth: function (i, node) {
            return 1;
          },
          hLineColor: function (i, node) {
            return 'black';
          },
          vLineColor: function (i, node) {
            return 'black';
          },
          paddingLeft: function(i, node) { return 4; },
          paddingRight: function(i, node) { return 4; },
          paddingTop: function(i, node) { return 4; },
          paddingBottom: function(i, node) { return 4; },
        },
        style: 'table'
      });
    }

    // Generar las secciones de imágenes para cada equipo
    for (const equipo of informe.equiposPreventivo) {
      const imageSection = await createImageSection(equipo);
      content.push(...imageSection);
    }

    const docDefinition = {
      pageOrientation: 'landscape',
      content: content,
      styles: {
        header: {
          fontSize: 11,
          bold: true
        },
        subheader: {
          fontSize: 12,
          margin: [0, 10, 0, 10]
        },
        tableHeader: {
          bold: true,
          fontSize: 11,
          color: 'white',
          fillColor: '#3498db',
          margin: [0, 2, 0, 2]
        },
        table: {
          margin: [45, 5, 10, 0]
        },
        equipmentHeader: {
          fontSize: 14,
          bold: true,
          margin: [0, 20, 0, 10]
        },
        infoText: {
          fontSize: 10,
          bold: true
        },
        highlightText: {
          fontSize: 12,
          bold: true
        }
      },
      defaultStyle: {
        fontSize: 10
      },
      footer: function(currentPage, pageCount) {
        return {
          text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
          alignment: 'center',
          fontSize: 10,
          margin: [0, 10, 0, 0]
        };
      }
    };

    pdfMake.createPdf(docDefinition).download('reporte_diario.pdf');
  };

  const createImageSection = async (equipo) => {
    const imagenEquipo = equipo.imagenEquipo ? await getBase64ImageFromFile(equipo.imagenEquipo) : '';
    const imagenIdEquipo = equipo.imagenIdEquipo ? await getBase64ImageFromFile(equipo.imagenIdEquipo) : '';

    return [
      { text: '', pageBreak: 'before' },
      {
        text: `Equipo: ${equipo.equipo}\nNúmero de Serie: ${equipo.numeroSerie}`,
        style: 'equipmentHeader',
        alignment: 'center'
      },
      {
        style: 'imageSection',
        table: {
          widths: ['50%', '50%'],
          body: [
            [
              {
                image: imagenEquipo,
                fit: [150, 200],
                alignment: 'center',
                margin: [0, 10, 0, 10]
              },
              {
                image: imagenIdEquipo,
                fit: [150, 200],
                alignment: 'center',
                margin: [0, 10, 0, 10]
              }
            ],
            [
              {
                text: "SE REALIZA VERIFICACIÓN DE MODELO Y NÚMERO DE SERIE SEGÚN PAUTA DE PLANIFICACIÓN",
                alignment: 'center',
                fontSize: 10,
                margin: [0, 0, 0, 10]
              },
              {
                text: "SE REALIZA VERIFICACIÓN DE MODELO Y NÚMERO DE SERIE SEGÚN PAUTA DE PLANIFICACIÓN",
                alignment: 'center',
                fontSize: 10,
                margin: [0, 0, 0, 10]
              }
            ]
          ]
        },
        layout: 'noBorders'
      },
      {
        // Creación del recuadro principal
        table: {
          widths: ['50%', '50%'],
          body: [
            [
              {
                text: "SE VERIFICA CONSUMO ELÉCTRICO Y TENSIÓN DEL EQUIPO",
                style: 'infoText',
                alignment: 'center',
                margin: [0, 10, 0, 10],
                border: [true, true, true, true]
              },
              {
                text: "SE REALIZA LIMPIEZA DE COMPONENTES CRÍTICOS",
                style: 'infoText',
                alignment: 'center',
                margin: [0, 10, 0, 10],
                border: [true, true, true, true]
              }
            ]
          ]
        }
      },
      {
        // Aquí se agregan las imágenes adicionales con flechas
        table: {
          widths: ['33%', '33%', '33%'],
          body: [
            [
              {
                image: imagenEquipo,
                fit: [100, 150],
                alignment: 'center',
                margin: [0, 10, 0, 10]
              },
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0,
                    y1: 5,
                    x2: 100,
                    y2: 5,
                    lineWidth: 2,
                    lineColor: 'black'
                  }
                ]
              },
              {
                image: imagenIdEquipo,
                fit: [100, 150],
                alignment: 'center',
                margin: [0, 10, 0, 10]
              }
            ]
          ]
        },
        layout: 'noBorders'
      },
      {
        table: {
          widths: ['100%'],
          body: [
            [
              {
                text: "SONDA CORAZÓN DEL EQUIPO SE ENCUENTRA DAÑADA",
                style: 'highlightText',
                alignment: 'center',
                fillColor: '#FFFF00',
                color: '#FF0000',
                margin: [0, 5, 0, 5]
              }
            ],
            [
              {
                text: "EQUIPO OPERATIVO",
                style: 'highlightText',
                alignment: 'center',
                fillColor: '#00FF00',
                color: '#000000',
                margin: [0, 5, 0, 5]
              }
            ]
          ]
        },
        layout: 'noBorders'
      }
    ];
  };

  const getBase64ImageFromFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = error => reject(error);
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

  return (
    <div>
      <button onClick={handleGeneratePdf} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px' }}>
        Descargar PDF
      </button>
    </div>
  );
};

export default InformePDF;
