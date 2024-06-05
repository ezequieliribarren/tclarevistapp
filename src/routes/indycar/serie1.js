const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

// Función para limpiar el tiempo
function limpiarTiempo(tiempo) {
  // Utilizar una expresión regular para extraer el tiempo en el formato mm'ss.ffff
  const regex = /(\d{1,2})'(\d{1,2}\.\d{4})/;
  const match = tiempo.match(regex);

  if (match) {
    // Si se encuentra el patrón, devolver el tiempo en el formato deseado
    return match[1] + "'" + match[2];
  } else {
    // Si no se encuentra el patrón, devolver el tiempo sin cambios
    return tiempo;
  }
}

// Función para limpiar la diferencia
function limpiarDiferencia(diferencia) {
  // Utilizar expresión regular para eliminar espacios en blanco y caracteres no deseados
  return diferencia.replace(/\s+/g, '').replace(/\\n+/g, '').replace(/['']+/g, '').trim();
}

// Función para obtener los resultados desde la URL proporcionada
async function obtenerResultados(url) {
  try {
    // Si la URL está vacía o contiene solo un guion "-", devolver un array vacío
    if (url === "" || url === "-") {
      return [];
    }
    const html = await request(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(html);

    const resultados = [];

    const tableRows = $('tr.ms-table_row');

    tableRows.each((index, element) => {
      const $row = $(element);
      const pos = $row.find('.ms-table_field--pos .ms-table_row-value').text().trim();
      const piloto = $row.find('.ms-table_field--result_driver_id .name-short').text().trim();
      const marca = $row.find('.ms-table_field--result_driver_id .team').text().trim();
      const numero = $row.find('.ms-table_field--number .ms-table_row-value').text().trim();
      const vueltas = $row.find('.ms-table_field--laps .ms-table_row-value').text().trim();
      const tiempo = limpiarTiempo($row.find('.ms-table_field--time .ms-table_row-value').text());
      const diferencia = limpiarDiferencia($row.find('.ms-table_field--interval .ms-table_row-value').text());
      const puntos = $row.find('.ms-table_field--avg_speed .ms-table_row-value').text().trim();
      const nacionalidad = piloto


      resultados.push({
        pos,
        piloto,
        marca,
        numero,
        vueltas,
        tiempo,
        diferencia,
        puntos,
        nacionalidad
      });
    });

    resultados.splice(0, 2); // Elimina los dos primeros elementos del array resultados
    return resultados;
  } catch (error) {
    console.error(`Error fetching data from URL ${url}: ${error.message}`);
    return null; // Devolver null en caso de error
  }
}

// Función principal serie1
async function serie1() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "239413181"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo

    // Filtrar y obtener solo las URL que no son null
    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[15] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[15].v);

    console.log('URLs de entrenamiento:', urlsEntrenamiento);

    // Array para almacenar todas las promesas de las solicitudes
    const promesasSolicitudes = urlsEntrenamiento.map(url => obtenerResultados(url).catch(error => {
      console.error(`Error al obtener los resultados del URL ${url}: ${error.message}`);
      return null;
    }));

    // Esperar a que todas las solicitudes se completen
    const resultadosPorUrl = await Promise.all(promesasSolicitudes);

    // Filtrar resultados null
    const resultadosValidos = resultadosPorUrl.filter(resultado => resultado !== null);

    console.log('Resultados por URL:', resultadosValidos);

    // Devolver los resultados obtenidos
    return resultadosValidos;
  } catch (error) {
    console.error('Error al obtener y mostrar datos:', error);
    throw error;
  }
}

module.exports = {
  serie1,
};
