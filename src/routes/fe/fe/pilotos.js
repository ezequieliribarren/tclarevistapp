const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../../googleSheets');

async function pilotosV() {
  try {
    const sheetId = "672242614";
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]);

    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[7] !== null)
      .map(fila => fila.c[7].v);

    console.log(urlsEntrenamiento);

    const promesasSolicitudes = [];

    for (const url of urlsEntrenamiento) {
      promesasSolicitudes.push(obtenerResultados(url));
    }

    const resultadosPorUrl = await Promise.all(promesasSolicitudes);

    console.log('Resultados por URL:', resultadosPorUrl);

    return resultadosPorUrl;

  } catch (error) {
    console.error('Error al obtener y mostrar datos:', error);
    throw error;
  }
}

function limpiarTiempo(tiempo) {
    const regex = /(\d+'\d{2}\.\d{3})/;
    const match = tiempo.match(regex);

    if (match && match.length > 0) {
        return match[0];
    } else {
        return tiempo.trim();
    }
}

function limpiarDiferencia(diferencia) {
    const regex = /([+-]?\d+\.\d+)/;
    const match = diferencia.match(regex);

    if (match && match.length > 0) {
        return match[0];
    } else {
        return diferencia.trim();
    }
}

async function obtenerResultados(url) {
  try {
    if (!url) {
      console.error('URL no definida');
      return [];
    }

    const html = await request({
      uri: url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(html);
    const resultados = [];
    const tableRows = $('.ms-result-table-wrapper table tr.ms-table_row');

    tableRows.each((index, element) => {
      const $row = $(element);
      const pos = $row.find('.ms-table_field--pos .ms-table_row-value').text().trim();
      const piloto = $row.find('.ms-table_field--result_driver_id .name-short').text().trim();
      const equipo = $row.find('.ms-table_field--result_driver_id .team').text().trim();
      const numero = $row.find('.ms-table_field--number .ms-table_row-value').text().trim();
      const vueltas = $row.find('.ms-table_field--laps .ms-table_row-value').text().trim();
      const tiempo = limpiarTiempo($row.find('.ms-table_field--time .ms-table_row-value').text());
      const diferencia = limpiarDiferencia($row.find('.ms-table_field--time .ms-table_row-value').text());
      const intervalo = limpiarDiferencia($row.find('.ms-table_field--interval .ms-table_row-value').text());
      const velocidad = $row.find('.ms-table_field--avg_speed .ms-table_row-value').text().trim();
      const nacionalidad = piloto;

      resultados.push({
        pos,
        piloto,
        equipo,
        numero,
        vueltas,
        tiempo,
        diferencia,
        intervalo,
        velocidad,
        nacionalidad
      });
    });

    resultados.splice(0, 2);
    return resultados;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

module.exports = {
  pilotosV,
};
