const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

async function clasificacion() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "239413181"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo

    // Filtrar y obtener solo las URL que no son null
    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[14] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[14].v);

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

// Limpiar el tiempo y la diferencia
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

  function limpiarDiferencia(diferencia) {
    // Utilizar expresión regular para eliminar espacios en blanco y caracteres no deseados
    return diferencia.replace(/\s+/g, '').replace(/\\n+/g, '').replace(/['']+/g, '').trim();
  }
  
  async function obtenerResultados(url) {
    try {
      if (!url) {
        console.error('URL no definida');
        return []; // Devolver un array vacío si la URL no está definida
      }
  
      const html = await request(url);
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
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  
  

module.exports = {
  clasificacion,
};
