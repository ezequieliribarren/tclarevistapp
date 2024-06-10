const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs').promises;
const path = require('path');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');
const unorm = require('unorm');

async function serie2() {
  try {
    const sheetId = "1456952227";
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]);

    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[16] !== null)
      .map(fila => fila.c[16].v);

    console.log(urlsEntrenamiento);

    const promesasSolicitudes = urlsEntrenamiento.map(url => obtenerResultados(url).catch(error => {
      console.error(`Error al obtener los resultados del URL ${url}: ${error.message}`);
      return null;
    }));

    const resultadosPorUrl = await Promise.all(promesasSolicitudes);
    const resultadosValidos = resultadosPorUrl.filter(resultado => resultado !== null);

    const resultadosConUrl = urlsEntrenamiento.map((url, index) => ({
      url,
      resultado: resultadosValidos[index]
    }));

    console.log('Resultados por URL:', resultadosConUrl);

    const jsonFileName = path.join(__dirname, 'serie2.json');
    await fs.writeFile(jsonFileName, JSON.stringify(resultadosConUrl, null, 2), 'utf-8');

    console.log('Datos guardados en:', jsonFileName);

    return resultadosConUrl;
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

    const body = await request({
      uri: url,
      encoding: 'latin1',
    });

    const $ = cheerio.load(body);
    const resultados = [];

    const tableRows = $('.ue-table-ranking__tbody tr');

    function quitarAcentosPilotos(texto) {
      return unorm.nfd(texto).replace(/[\u0300-\u036f]/g, "");
    }

    tableRows.each((index, element) => {
      const $row = $(element);
      const pos = $row.find('.ue-table-ranking__position').text().trim();
      const nacionalidad = $row.find('.ue-table-ranking__race-driver-flag').attr('alt');
      const piloto = quitarAcentosPilotos($row.find('.ue-table-ranking__race-driver-name').text().trim());
      const marca = $row.find('.ue-table-ranking__race-driver-team').text().trim();
      const tiempo = $row.find('.ue-table-ranking__race-driver-time').text().trim();

      resultados.push({
        pos,
        nacionalidad,
        piloto,
        marca,
        tiempo,
      });
    });

    return resultados;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

module.exports = {
  serie2,
};
