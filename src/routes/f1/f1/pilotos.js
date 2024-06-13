const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../../googleSheets'); 

async function pilotosV() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "1870545693"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo

    // Filtrar y obtener solo las URL que no son null
    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[7] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[7].v);

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
            // Si la URL es "", devolver un valor predeterminado (por ejemplo, un arreglo vacío)
            return [];
        }

        const html = await request(url);
        const $ = cheerio.load(html);

        const resultados = [];

        // Iterar sobre cada fila de la tabla
        $('.resultsarchive-table tbody tr').each((i, row) => {
            const columns = $(row).find('td');
            const pos = $(columns[1]).text().trim();
            const numero = $(columns[2]).text().trim();
            let piloto = $(columns[3]).find('.first-name').text().trim() + ' ' + $(columns[3]).find('.last-name').text().trim();
            const marca = $(columns[4]).text().trim();
            const nacionalidad = piloto


            resultados.push({ pos, numero, piloto, marca, nacionalidad });
        });

        return resultados;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

module.exports = {
  pilotosV
};
