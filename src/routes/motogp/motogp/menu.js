// const cheerio = require('cheerio');
// const request = require('request-promise');
// const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

// async function menu() {
//   try {
//     const sheetId = "1456952227"; // ID de la hoja que deseas obtener
//     const datos = await obtenerDatosDesdeGoogleSheets([sheetId]);

//     const menuPorFecha = {};

//     // Obtener la URL de la columna 19 de la primera fila
//     const url = datos[0].data[0].c[19].v;
//     const titulos = await obtenerTitulos(url);
//     // Agregar los títulos directamente al menú sin organizarlos por día
//     Object.assign(menuPorFecha, titulos);

//     console.log('Menú:', JSON.stringify(menuPorFecha, null, 2));

//     return menuPorFecha;
//   } catch (error) {
//     console.error('Error al obtener y mostrar datos:', error);
//     throw error;
//   }
// }

// async function obtenerTitulos(url) {
//     try {
//         const titulosPorDia = {};

//         if (url === "" || url === "-") {
//             return titulosPorDia;
//         }

//         const $ = await request({
//             uri: url,
//             transform: body => cheerio.load(body)
//         });

//         $('dl.gran-premio__schedule').each((index, schedule) => {
//             const titulos = $(schedule).find('.gran-premio__schedule-title');
//             const eventos = $(schedule).find('.gran-premio__schedule-description');

//             titulos.each((index, tituloDia) => {
//                 const dia = $(tituloDia).text().trim();
//                 titulosPorDia[dia] = [];

//                 eventos.each((index, evento) => {
//                     const nombreEvento = $(evento).find('.gran-premio__schedule-data a').text().trim();
//                     const hora = $(evento).find('.hora').text().trim();
//                     titulosPorDia[dia].push({ nombre: nombreEvento, hora: hora });
//                 });
//             });
//         });

//         return titulosPorDia;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// }

// module.exports = {
//   menu
// };
