const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets'); 

async function menu() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "2138676913"; // ID de la hoja que deseas obtener
      const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo

    // Filtrar y obtener solo las URL que no son null
    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[19] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[19].v);

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
    const $ = await request({
      uri: url,
      transform: body => cheerio.load(body)
    });

    const calendario = {
      Vie: [],
      Sab: [],
      Dom: []
    };

    // Buscar datos para Viernes
    $('.calendario .dia:contains("Viernes")').closest('.date').find('span').each((i, entrenamiento) => {
      calendario.Vie.push($(entrenamiento).text().trim());
    });

    // Buscar datos para Sábado
    $('.lyt-sab .dia:contains("Sabado")').closest('.date').find('span').each((i, entrenamiento) => {
      calendario.Sab.push($(entrenamiento).text().trim());
    });

    // Buscar datos para Domingo
    $('.lyt-dom .dia:contains("Domingo")').closest('.date').find('span').each((i, entrenamiento) => {
      calendario.Dom.push($(entrenamiento).text().trim());
    });

    return calendario;
  } catch (error) {
    console.error('Error al obtener datos del calendario:', error);
    throw error;
  }
}








module.exports = {
  menu
};
