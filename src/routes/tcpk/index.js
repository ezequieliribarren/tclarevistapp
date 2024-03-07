const cheerio = require('cheerio');
const request = require('request-promise');
const obtenerDatosDesdeGoogleSheet = require('../googleSheets.js');

async function obtenerDatosPorColumna() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "0"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheet(sheetId);

    const columnas = datos[0].data; // Obtener todas las columnas

    const datosPorColumna = [];

    // Iterar sobre cada columna
    for (let i = 0; i < columnas.length; i++) {
      const columna = columnas[i].map(item => item && item.v); // Obtener los valores de la columna
      datosPorColumna.push(columna);
    }

    return datosPorColumna;
  } catch (error) {
    console.error('Error al obtener datos por columna:', error);
    throw error;
  }
}

async function obtenerResultadosPorColumna(datosPorColumna) {
  try {
    const resultadosPorColumna = [];

    // Iterar sobre cada columna
    for (let i = 0; i < datosPorColumna.length; i++) {
      const urls = datosPorColumna[i].filter(url => url !== null); // Filtrar las URLs válidas de la columna
      const resultadosPorUrl = [];

      // Iterar sobre cada URL de la columna
      for (let j = 0; j < urls.length; j++) {
        const url = urls[j];
        const resultados = await obtenerResultados(url); // Obtener resultados de Cheerio para cada URL
        resultadosPorUrl.push(resultados);
      }

      resultadosPorColumna.push(resultadosPorUrl);
    }

    return resultadosPorColumna;
  } catch (error) {
    console.error('Error al obtener resultados por columna:', error);
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
    console.error('Error al obtener resultados:', error);
    throw error;
  }
}

module.exports = {
  obtenerDatosPorColumna,
  obtenerResultadosPorColumna
};