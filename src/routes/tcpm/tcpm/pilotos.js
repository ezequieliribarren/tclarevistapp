const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../../googleSheets');  
async function pilotosV() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "489487000"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo

    // Filtrar y obtener solo las URL que no son null
    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[7] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[7].v);

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
    if (url === "" || url === "-") {
      // Si la URL es "" o "-", devolver un valor predeterminado (por ejemplo, un arreglo vacío)
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
      const img = $(columns[2]).html();
    

      resultados.push({ numero, piloto, img, title });
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
pilotosV
};
