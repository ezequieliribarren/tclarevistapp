const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs').promises;
const path = require('path');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

// Función para limpiar el tiempo
function limpiarTiempo(tiempo) {
  const tiempoLimpio = tiempo.replace(/\s+/g, '').replace(/\\n+/g, '').replace(/['']+/g, '').trim();
  const regex = /(\d{1,2})'(\d{1,2}\.\d{3})/;
  const match = tiempoLimpio.match(regex);

  if (match) {
    return match[1] + "'" + match[2];
  } else {
    return tiempoLimpio;
  }
}

// Función para limpiar la diferencia
function limpiarDiferencia(diferencia) {
  return diferencia.replace(/\s+/g, '').replace(/\\n+/g, '').replace(/['']+/g, '').trim();
}

// Función para obtener los resultados desde la URL proporcionada
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
      const pilotoFullName = $row.find('.ms-table_field--result_driver_id .name-short').text().trim();
      const marca = $row.find('.ms-table_field--result_driver_id .team').text().trim();
      const numero = $row.find('.ms-table_field--number .ms-table_row-value').text().trim();
      const vueltas = $row.find('.ms-table_field--laps .ms-table_row-value').text().trim();
      const tiempo = limpiarTiempo($row.find('.ms-table_field--time .ms-table_row-value').text());
      const diferencia = limpiarDiferencia($row.find('.ms-table_field--interval .ms-table_row-value').text());
      const puntos = $row.find('.ms-table_field--avg_speed .ms-table_row-value').text().trim();

      const [nombre, apellido] = pilotoFullName.split(' ');

      resultados.push({
        pos,
        nro: numero,
        nombre: nombre || '',
        apellido: apellido || '',
        piloto: pilotoFullName,
        marca,
        tiempo,
        diferencia,
        vueltas,
        nacionalidad: pilotoFullName
      });
    });

    resultados.splice(0, 2); // Elimina los dos primeros elementos del array resultados
    return resultados;
  } catch (error) {
    console.error(`Error fetching data from URL ${url}: ${error.message}`);
    return null;
  }
}

// Función principal en6
async function en6() {
  try {
    const sheetId = "239413181";
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]);

    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[13] !== null)
      .map(fila => fila.c[13].v);

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

    const jsonFileName = path.join(__dirname, 'en6.json');
    await fs.writeFile(jsonFileName, JSON.stringify(resultadosConUrl, null, 2), 'utf-8');

    console.log('Datos guardados en:', jsonFileName);

    return resultadosConUrl;
  } catch (error) {
    console.error('Error al obtener y mostrar datos:', error);
    throw error;
  }
}

module.exports = {
  en6,
};
