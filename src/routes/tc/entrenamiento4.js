const cheerio = require('cheerio');
const request = require('request-promise');
const obtenerDatosDesdeGoogleSheet = require('../googleSheets.js');

async function en4() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "1872673772"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheet(sheetId);

    // Filtrar y obtener solo las URL que no son null
    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[11] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[11].v);

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
    const $ = await request({
      uri: url,
      transform: body => cheerio.load(body)
    });

    const resultados = [];

    // Realizar scraping para la página actual
    $('.table tr').each((i, row) => {
      const columns = $(row).find('td');
      const pos = $(columns[0]).text().trim();
      const nro = $(columns[1]).text().trim();
      const piloto = $(columns[2]).text().trim();
      const marca = $(columns[3]).text().trim();
      const vueltas = $(columns[4]).text().trim();
      const tiempo = $(columns[5]).text().trim();
      const diferencia = $(columns[6]).text().trim();

      resultados.push({ pos, nro, piloto, marca, vueltas, tiempo, diferencia });
    });

    // Eliminar los objetos vacíos si existen
    const resultadosFiltrados = resultados.filter(resultado => {
      return !Object.values(resultado).every(value => value === '');
    });

    return resultadosFiltrados;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
module.exports = {
  en4
};
