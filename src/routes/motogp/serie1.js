const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

async function serie1() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "1456952227"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo

    // Filtrar y obtener solo las URL que no son null
    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[15] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[15].v);

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
    if (!url) {
      console.error('URL no definida');
      return []; // Devolver un array vacío si la URL no está definida
    }

    const html = await request(url);
    const $ = cheerio.load(html);

    const resultados = [];

    // Modificar el selector para apuntar a la tabla de resultados correcta
    const tableRows = $('.ms-result-table tbody tr');
    
    // Iterar sobre cada fila de la tabla
    tableRows.each((index, element) => {
      const $row = $(element);
      const pos = $row.find('.ms-table_field--pos .ms-table_row-value').text().trim();
      const piloto = $row.find('.ms-table_field--result_driver_id .name-short').text().trim();
      const equipo = $row.find('.ms-table_field--result_driver_id .team').text().trim();
      const numero = $row.find('.ms-table_field--number .ms-table_row-value').text().trim();
      const marca = $row.find('.ms-table_field--car_make .ms-table_row-value').text().trim();
      const vueltas = $row.find('.ms-table_field--laps .ms-table_row-value').text().trim();
      const tiempoDiferencia = $row.find('.ms-table_field--time').text().trim();
      const puntos = $row.find('.ms-table_field--points .ms-table_row-value').text().trim();

      // Extraer el tiempo y la diferencia del tiempoDiferencia
      const [diferencia, tiempo] = tiempoDiferencia.split(/\s+/);

      resultados.push({
          pos,
          piloto,
          equipo,
          numero,
          marca,
          vueltas,
          tiempo,
          puntos,
          diferencia
      });
    });
    
    return resultados;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

module.exports = {
  serie1,

};
