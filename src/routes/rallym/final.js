const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

async function final() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "1226827878"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo

    // Filtrar y obtener solo las URL que no son null de las columnas 10 y 11
    const urlsRally = datos[0].data
      .filter(fila => fila.c[70] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[70].v);
    console.log(urlsRally);
    const urlsRally2 = datos[0].data
      .filter(fila => fila.c[71] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[71].v);
      
    console.log(urlsRally2);

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
    if (!url) {
      console.error('URL no definida.');
      return []; // Devolver un arreglo vacío si la URL no está definida
    }

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
      const tiempo = cleanTiempo($(columns[7]).find('.ms-table_row-value').text().trim());
      const dif = $(columns[8]).find('.ms-table_row-value').text().trim();

      // Almacenar los datos en el arreglo de posiciones
      tablaPosiciones.push({ posicion, piloto, numero, marca, tiempo, dif  });
    });

    return tablaPosiciones;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Función para limpiar el tiempo2
function cleanTiempo(tiempoString) {
  const tiempoRegex = /(\d+:\d{2}'\d{2}\.\d+)/;
  const match = tiempoString.match(tiempoRegex);
  return match ? match[1] : '';
}

// Función para limpiar la dif2
function cleanDif2(dif2String) {
  const difRegex = /([-+]?\d+'?\d*\.\d+)/;
  const match = dif2String.match(difRegex);
  return match ? match[0] : '';
}

module.exports = {
  final
};
