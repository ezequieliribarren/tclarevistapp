const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs').promises;
const path = require('path');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

async function en1() {
  try {
    const sheetId = "249354540"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]);

    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[8] !== null)
      .map(fila => fila.c[8].v);
    console.log(urlsEntrenamiento);

    const promesasSolicitudes = urlsEntrenamiento.map(url => obtenerResultados(url));

    const resultadosPorUrl = await Promise.all(promesasSolicitudes);

    // Transformar los resultados al formato deseado
    const resultadosFormateados = urlsEntrenamiento.map((url, index) => ({
      url: url,
      resultado: resultadosPorUrl[index]
    }));

    console.log('Resultados por URL:', JSON.stringify(resultadosFormateados, null, 2));

    // Guardar los resultados en un archivo JSON
    const jsonFileName = path.join(__dirname, 'en1.json');
    await fs.writeFile(jsonFileName, JSON.stringify(resultadosFormateados, null, 2), 'utf-8');

    console.log('Datos guardados en:', jsonFileName);

    return resultadosFormateados;
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

    $('table.lista_resultados').each((index, table) => {
      const titulo = $(table).find('td.TabResTitulo').text().trim();
      if (titulo.includes('1° ENTRENAMIENTO')) {
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
  en1
};
