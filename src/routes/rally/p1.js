const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

async function p1() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "934475876"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo

    // Filtrar y obtener solo las URL que no son null
    const urlsRally = datos[0].data
      .filter(fila => fila.c[9] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[9].v);

    // Array para almacenar todas las promesas de las solicitudes
    const promesasSolicitudes = [];

    // Enviar solicitudes en paralelo
    for (const url of urlsRally) {
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

    const $ = await request({
      uri: url,
      transform: body => cheerio.load(body)
    });

const tablaPosiciones = [];
    $('.titulo_grande_blanco3').each((i, row) => {
      const columns = $(row).find('td');

      if (columns.length >= 5) {
        const posicion = $(columns[0]).text().trim().replace(/\n/g, '').replace(/\s+/g, ' ');
        const numero = $(columns[2]).text().trim().replace(/\n/g, '').replace(/\s+/g, ' ');
        const piloto = $(columns[3]).text().trim().replace(/\n/g, '').replace(/\s+/g, ' ');
        const dif2 = $(columns[7]).next().text().trim().replace(/\n/g, '').replace(/\s+/g, ' ');

        if (columns.length >= 6) {
          const tiempo = $(columns[4]).text().trim().replace(/\n/g, '').replace(/\s+/g, ' ');
          const dif = $(columns[5]).text().trim().replace(/\n/g, '').replace(/\s+/g, ' ');


          tablaPosiciones.push({ posicion, numero, piloto, tiempo, dif, dif2 });
        } else {
          tablaPosiciones.push({ posicion, numero, piloto });
        }
      }
    });


    return tablaPosiciones;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

module.exports = {
  p1
};
