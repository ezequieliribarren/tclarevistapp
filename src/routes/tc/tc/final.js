const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../../googleSheets');

async function finalV() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "1872673772"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo

    // Filtrar y obtener solo las URL que no son null
    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[18] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[18].v);

    // Array para almacenar todas las promesas de las solicitudes
    const promesasSolicitudes = urlsEntrenamiento.map(url => obtenerResultados(url));

    // Esperar a que todas las solicitudes se completen
    const resultadosPorUrl = await Promise.all(promesasSolicitudes);

    // Formatear los resultados en el formato deseado
    const resultadosFormateados = urlsEntrenamiento.map((url, index) => ({
      url: url === "" || url === " " ? "-" : url,
      resultado: resultadosPorUrl[index]
    }));

    console.log('Resultados por URL:', resultadosFormateados);

    // Devolver los resultados obtenidos
    return resultadosFormateados;
  } catch (error) {
    console.error('Error al obtener y mostrar datos:', error);
    throw error;
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
      const [nombre, apellido] = piloto.split(' ').map(name => name.replace(',', '')); // Ajustado para nombre y apellido
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
  finalV
};
