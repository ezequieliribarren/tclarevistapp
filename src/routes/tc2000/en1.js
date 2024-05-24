const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets'); 

async function en1() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "901761059"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo

    // Filtrar y obtener solo las URL que no son null
    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[8] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[8].v);

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
    if (url === "") {
      // Si la URL está vacía, devolver un valor predeterminado (por ejemplo, un arreglo vacío)
      return [];
    }

    // Hacer una solicitud HTTP a la URL
    const html = await request(url);

    // Cargar el HTML en cheerio
    const $ = cheerio.load(html);

    // Buscar el elemento que contiene el texto "1° Entrenamiento"
    let table;
    $('.ui-accordion-header').each((i, element) => {
      if ($(element).text().includes('1° Entrenamiento')) {
        // Encontrar la tabla siguiente a este elemento
        table = $(element).next('.ui-accordion-content').find('.tabla_tiempos');
        return false; // Romper el bucle
      }
    });

    // Si no se encuentra la tabla, devolver un arreglo vacío
    if (!table) {
      return [];
    }

    // Extraer datos de la tabla
    const resultados = [];
    table.find('tbody tr').each((i, row) => {
      const columns = $(row).find('td');
      const pos = $(columns[0]).text().trim();
      const piloto = $(columns[1]).text().trim();
      const marca = $(columns[2]).text().trim();
      const vueltas = $(columns[3]).text().trim();
      const tiempo = $(columns[4]).text().trim();
      const diferencia = $(columns[5]).text().trim();

      resultados.push({ pos, piloto, marca, vueltas, tiempo, diferencia });
    });

    // Filtrar los resultados vacíos si existen
    const resultadosFiltrados = resultados.filter(resultado => {
      return Object.values(resultado).some(value => value !== '');
    });

    return resultadosFiltrados;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

module.exports = {
  en1
};
