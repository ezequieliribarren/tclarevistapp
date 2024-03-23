const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

async function p13() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "1226827878"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo

    // Filtrar y obtener solo las URL que no son null de las columnas 10 y 11
    const urlsRally = datos[0].data
      .filter(fila => fila.c[34] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[34].v);

      const urlsRally2 = datos[0].data
      .filter(fila => fila.c[35] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[35].v);

    // Array para almacenar las promesas de las solicitudes de ambas columnas
    const promesasSolicitudesCol10 = urlsRally.map(url => obtenerResultados(url));
    const promesasSolicitudesCol11 = urlsRally2.map(url => obtenerResultados(url));

    // Esperar a que todas las solicitudes se completen
    const resultadosCol10 = await Promise.all(promesasSolicitudesCol10);
    const resultadosCol11 = await Promise.all(promesasSolicitudesCol11);

    // Devolver los resultados obtenidos
    return [resultadosCol10, resultadosCol11];
  } catch (error) {
    console.error('Error al obtener y mostrar datos:', error);
    throw error;
  }
}



async function obtenerResultados(url) {
  try {
    const $ = await request({
      uri: url,
      transform: body => cheerio.load(body)
    });

    const tablaPosiciones = [];

    // Buscar las filas de la tabla
    $('tr.ms-table_row').each((i, row) => {
      const columns = $(row).find('td.ms-table_cell');

      // Obtener los valores de las celdas
      const posicion = $(columns[0]).find('.ms-table_row-value').text().trim();
      const piloto = $(columns[1]).find('.name-short').text().trim();
      const numero = $(columns[2]).find('.ms-table_row-value').text().trim();
      const marca = $(columns[4]).find('.ms-table_row-value').text().trim();

      // Limpiar tiempo y diferencias
      const tiempo = cleanTiempo2($(columns[5]).find('.ms-table_row-value').text().trim());
      const tiempo2 = cleanTiempo2($(columns[6]).find('.ms-table_row-value').text().trim());
      const dif = cleanDif2($(columns[5]).find('.ms-table_row-value').text().trim());
      const dif2 = cleanDif2($(columns[6]).find('.ms-table_row-value').text().trim());

      // Almacenar los datos en el arreglo de posiciones
      tablaPosiciones.push({ posicion, piloto, numero, marca, tiempo, tiempo2, dif, dif2 });
    });

    return tablaPosiciones;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}



// Función para limpiar el tiempo2
function cleanTiempo2(tiempo2String) {
  const tiempoRegex = /(\d+'\d+(\.\d+)?)\s*$/;
  const match = tiempo2String.match(tiempoRegex);
  return match ? match[1].trim() : '';
}

// Función para limpiar la dif2
function cleanDif2(dif2String) {
  const difRegex = /([-+]?\d+'?\d*\.\d+)/;
  const match = dif2String.match(difRegex);
  return match ? match[0] : '';
}




module.exports = {
  p13
};
