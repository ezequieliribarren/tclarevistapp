const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

async function p7() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "1226827878"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo

    // Filtrar y obtener solo las URL que no son null de las columnas 10 y 11
    const urlsRally = datos[0].data
      .filter(fila => fila.c[22] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[22].v);

      const urlsRally2 = datos[0].data
      .filter(fila => fila.c[23] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[23].v);

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


// Función para limpiar el tiempo
function cleanTiempo(tiempo) {
  // Utilizar una expresión regular para extraer el tiempo en el formato mm'ss.ffff
  const regex = /(\d{1,2}'\d{1,2}\.\d{1,2})/;
  const match = tiempo.match(regex);

  if (match) {
    // Si se encuentra el patrón, devolver el tiempo en el formato deseado
    return match[1];
  } else {
    // Si no se encuentra el patrón, devolver el tiempo sin cambios
    return tiempo;
  }
}


// Función para limpiar la diferencia
function cleanDif(dif) {
  // Utilizar expresión regular para eliminar espacios en blanco y caracteres no deseados
  return dif.replace(/\s+/g, '').replace(/\\n+/g, '').replace(/['']+/g, '').trim();
}

// Función para obtener los resultados desde la URL proporcionada
async function obtenerResultados(url) {
  try {
    // Si la URL está vacía o contiene solo un guion "-", devolver un array vacío
    if (url === "" || url === "-") {
      return [];
    }
    
    const $ = await request({
      uri: url,
      transform: body => cheerio.load(body),
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
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
      const tiempo = cleanTiempo($(columns[5]).find('.ms-table_row-value').text().trim());
      const tiempo2 = cleanTiempo($(columns[6]).find('.ms-table_row-value').text().trim());
      const dif = cleanDif($(columns[5]).find('.ms-table_row-value').text().trim());
      const dif2 = cleanDif($(columns[6]).find('.ms-table_row-value').text().trim());

      // Almacenar los datos en el arreglo de posiciones
      tablaPosiciones.push({ posicion, piloto, numero, marca, tiempo, tiempo2, dif, dif2 });
    });

    return tablaPosiciones;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}


module.exports = {
  p7
};
