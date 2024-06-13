const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../../googleSheets');

async function pilotosV() {
  try {
    const sheetId = "249354540"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]);

    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[7] !== null)
      .map(fila => fila.c[7].v);
    console.log(urlsEntrenamiento);

    const promesasSolicitudes = urlsEntrenamiento.map(url => obtenerResultados(url));

    const resultadosPorUrl = await Promise.all(promesasSolicitudes);

    console.log('Resultados por URL:', JSON.stringify(resultadosPorUrl, null, 2));

    return resultadosPorUrl;
  } catch (error) {
    console.error('Error al obtener y mostrar datos:', error);
    throw error;
  }
}

async function obtenerResultados(url) {
  try {
    if (url === "" || url === "-") {
      return [];
    }

    const $ = await request({
      uri: url,
      transform: body => cheerio.load(body)
    });

    let resultados = [];

    // Encuentra la tabla con la clase 'lista_resultados' y el id 'pilotos'
    $('table.lista_resultados#pilotos').each((index, table) => {
      $(table).find('tr.TabResData').each((i, row) => {
        const columns = $(row).find('td');
        const pilotoEquipoLocalidad = $(columns[1]).text().trim();
        const ranking = $(columns[2]).text().trim();
        const modelo = $(columns[5]).text().trim();

        // Procesar y limpiar los datos
        const piloto = pilotoEquipoLocalidad.split('\n')[0].trim();
        const numero = ranking;
        const marca = modelo;

        resultados.push({
          piloto,
          numero,
          marca
        });
      });
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
