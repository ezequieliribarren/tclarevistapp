const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');
const unorm = require('unorm');

async function en2() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "1456952227"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo

    // Filtrar y obtener solo las URL que no son null
    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[9] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[9].v);

    console.log(urlsEntrenamiento);

    // Array para almacenar todas las promesas de las solicitudes
    const promesasSolicitudes = [];

    // Enviar solicitudes en paralelo
    for (const url of urlsEntrenamiento) {
      promesasSolicitudes.push(obtenerResultados(url));
    }

    // Esperar a que todas las solicitudes se completen
    const resultadosPorUrl = await Promise.all(promesasSolicitudes);

    console.log('Resultados por URL:', resultadosPorUrl);

    // Devolver los resultados obtenidos
    return resultadosPorUrl;
  } catch (error) {
    console.error('Error al obtener y mostrar datos:', error);
    throw error;
  }
}

async function obtenerResultados(url) {
  try {
    if (url === "" || url === "-") {
      return [];
    }

    const body = await request({
      uri: url,
      encoding: 'latin1', // Especifica la codificación de caracteres
    });

    const $ = cheerio.load(body);

    const resultados = [];

    // Modificar el selector para apuntar a la tabla de resultados correcta
    const tableRows = $('.ue-table-ranking__tbody tr');

    // Función para quitar acentos y caracteres especiales solo de los pilotos
    function quitarAcentosPilotos(texto) {
      return unorm.nfd(texto).replace(/[\u0300-\u036f]/g, "");
    }

    // Iterar sobre cada fila de la tabla
    tableRows.each((index, element) => {
      const $row = $(element);
      const pos = $row.find('.ue-table-ranking__position').text().trim();
      const nacionalidad = $row.find('.ue-table-ranking__race-driver-flag').attr('alt');
      const piloto = quitarAcentosPilotos($row.find('.ue-table-ranking__race-driver-name').text().trim());
      const marca = $row.find('.ue-table-ranking__race-driver-team').text().trim();
      const tiempo = $row.find('.ue-table-ranking__race-driver-time').text().trim();

      resultados.push({
        pos,
        nacionalidad,
        piloto,
        marca,
        tiempo,
      });
    });

    return resultados;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
module.exports = {
  en2,
};
