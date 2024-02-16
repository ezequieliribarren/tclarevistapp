const cheerio = require('cheerio');
const request = require('request-promise');
const obtenerDatosDesdeGoogleSheet = require('../googleSheets.js');

async function en1() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "1872673772"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheet(sheetId);

    

    // Filtrar y obtener solo las URL que no son null
    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[7] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[7].v);

    // Obtener resultados para cada tipo de carrera
    const resultadosEntrenamiento = await obtenerResultados(urlsEntrenamiento);

    console.log('Resultados de entrenamiento:', resultadosEntrenamiento);

    // Devolver los resultados obtenidos
    return resultadosEntrenamiento;
  } catch (error) {
    console.error('Error al obtener y mostrar datos:', error);
    throw error;
  }
}

async function obtenerResultados(urls) {
    try {
      const resultadosPorUrl = {};
  
      // Iterar sobre cada URL en el array
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const indiceUrl = i + 1; // Agregar un índice único a cada URL
  
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
  
        // Utilizar el índice único como parte de la clave en el objeto resultadosPorUrl
        resultadosPorUrl[`url_${indiceUrl}`] = resultadosFiltrados;
      }
  
      return resultadosPorUrl;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  module.exports = {
    en1
  };
