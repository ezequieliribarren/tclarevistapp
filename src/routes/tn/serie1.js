const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

async function serie1() {
  try {
    const sheetId = "249354540"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]);

    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[8] !== null)
      .map(fila => fila.c[8].v);
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

    // Encuentra todas las tablas con la clase 'lista_resultados'
    $('table.lista_resultados').each((index, table) => {
      // Revisa si la tabla contiene el título '1° ENTRENAMIENTO'
      const titulo = $(table).find('td.TabResTitulo').text().trim();
      if (titulo.includes('PRIMERA SERIE')) {
        $(table).find('tr.TabResData').each((i, row) => {
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
      }
    });

    return resultados;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

module.exports = {
  serie1
};
