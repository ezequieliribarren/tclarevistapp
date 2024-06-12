const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs').promises;
const path = require('path');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

const MAX_RETRIES = 3; // Número máximo de reintentos
const RETRY_DELAY = 3000; // Retraso entre reintentos en milisegundos

async function pilotos() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "2030835384"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo

    // Filtrar y obtener solo las URL que no son null
    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[7] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[7].v);

    // Array para almacenar todas las promesas de las solicitudes
    const promesasSolicitudes = urlsEntrenamiento.map(url => obtenerResultadosConReintento(url, MAX_RETRIES));

    // Esperar a que todas las solicitudes se completen
    const resultadosPorUrl = await Promise.all(promesasSolicitudes);

    // Formatear los resultados en el formato deseado
    const resultadosFormateados = urlsEntrenamiento.map((url, index) => ({
      url: url === "" || url === " " ? "-" : url,
      resultado: resultadosPorUrl[index]
    }));

    console.log('Resultados por URL:', resultadosFormateados);

    // Guardar los resultados en un archivo JSON
    const jsonFileName = path.join(__dirname, 'pilotos.json');
    await fs.writeFile(jsonFileName, JSON.stringify(resultadosFormateados, null, 2), 'utf-8');

    console.log('Datos guardados en:', jsonFileName);

    // Devolver los resultados obtenidos
    return resultadosFormateados;
  } catch (error) {
    console.error('Error al obtener y mostrar datos:', error);
    throw error;
  }
}

async function obtenerResultadosConReintento(url, retries) {
  try {
    return await obtenerResultados(url);
  } catch (error) {
    if (retries === 0) {
      console.error(`Error permanente al obtener los resultados del URL ${url}: ${error.message}`);
      return [];
    } else {
      console.warn(`Error al obtener los resultados del URL ${url}. Reintentando en ${RETRY_DELAY / 1000} segundos...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return obtenerResultadosConReintento(url, retries - 1);
    }
  }
}

async function obtenerResultados(url) {
  try {
    if (url === "" || url === " " || url === "-") {
      // Si la URL es "", " " o "-", devolver un valor predeterminado (por ejemplo, un arreglo vacío)
      return [];
    }

    const $ = await request({
      uri: url,
      transform: body => cheerio.load(body)
    });

    const resultados = [];

    // Realizar scraping para la página actual
    $('.table tr').each((i, row) => {
      const columns = $(row).find('td');
      const titles = $(row).find('th');
      const title = titles.text().trim();
      const numero = $(columns[0]).text().trim();
      const piloto = $(columns[1]).text().trim();
      const marca = $(columns[2]).html();
    

      resultados.push({ numero, piloto, marca, title });
    });

    // Eliminar los objetos vacíos si existen
    const resultadosFiltrados = resultados.filter(resultado => {
      return !Object.values(resultado).every(value => value === '');
    });

    return resultadosFiltrados;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

module.exports = {
  pilotos
};
