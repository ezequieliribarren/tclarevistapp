const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs').promises;
const path = require('path');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

function limpiarTiempo(tiempo) {
  const regex = /\s+(\d+\.\d+)/;
  const match = tiempo.match(regex);

  if (match && match.length > 1) {
    return match[1];
  } else {
    return tiempo.trim();
  }
}

function limpiarDiferencia(diferencia) {
  return diferencia.replace(/\s+/g, '').replace(/\\n+/g, '').replace(/['']+/g, '').trim();
}

async function obtenerResultados(url) {
  try {
    if (url === "" || url === "-") {
      return [];
    }

    const html = await request(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(html);

    const resultados = [];
    const tableRows = $('tr.ms-table_row');

    tableRows.each((index, element) => {
      const $row = $(element);
      const pos = $row.find('.ms-table_field--pos .ms-table_row-value').text().trim();
      const piloto = $row.find('.ms-table_field--result_driver_id .name-short').text().trim();
      const marca = $row.find('.ms-table_field--result_driver_id .team').text().trim();
      const numero = $row.find('.ms-table_field--number .ms-table_row-value').text().trim();
      const vueltas = $row.find('.ms-table_field--laps .ms-table_row-value').text().trim();
      const tiempo = limpiarTiempo($row.find('.ms-table_field--time .ms-table_row-value').text());
      const diferencia = limpiarDiferencia($row.find('.ms-table_field--interval .ms-table_row-value').text());
      const puntos = $row.find('.ms-table_field--avg_speed .ms-table_row-value').text().trim();
      const nacionalidad = "nascar";

      resultados.push({
        pos,
        piloto,
        marca,
        numero,
        vueltas,
        tiempo,
        diferencia,
        puntos,
        nacionalidad
      });
    });

    resultados.splice(0, 2);
    return resultados;
  } catch (error) {
    console.error(`Error fetching data from URL ${url}: ${error.message}`);
    return null;
  }
}

async function pilotos() {
  try {
    const sheetId = "1456952227";
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]);

    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[7] !== null)
      .map(fila => fila.c[7].v);

    console.log('URLs de entrenamiento:', urlsEntrenamiento);

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

    const jsonFileName = path.join(__dirname, 'pilotos.json');
    await fs.writeFile(jsonFileName, JSON.stringify(resultadosConUrl, null, 2), 'utf-8');

    console.log('Datos guardados en:', jsonFileName);

    return resultadosConUrl;
  } catch (error) {
    console.error('Error al obtener y mostrar datos:', error);
    throw error;
  }
}

module.exports = {
  pilotos,
};
