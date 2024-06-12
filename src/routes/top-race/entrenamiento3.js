const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs').promises;
const path = require('path');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

const MAX_RETRIES = 3; // Número máximo de reintentos
const RETRY_DELAY = 3000; // Retraso entre reintentos en milisegundos

async function en3() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "1197579525"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo

    // Filtrar y obtener solo las URL que no son null
    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[10] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[10].v);

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
    const jsonFileName = path.join(__dirname, 'en3.json');
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
    $('.table tbody tr').each((i, row) => {
      const columns = $(row).find('td');
      const pos = $(columns[0]).text().trim();
      const nro = $(columns[1]).text().trim();
      const piloto = $(columns[2]).text().trim();
      const [nombre, apellido] = piloto.split(' ');
      const marca = $(columns[3]).find('img').attr('alt') ? $(columns[3]).find('img').attr('alt').trim() : '';
      const vueltas = $(columns[4]).text().trim();
      const tiempo = $(columns[5]).text().trim();
      const diferencia = $(columns[6]).text().trim();
      const nacionalidad = piloto; // Si nacionalidad y piloto son los mismos

      resultados.push({ pos, nro, nombre, apellido, piloto, marca, vueltas, tiempo, diferencia, nacionalidad });
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
  en3
};

