const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets'); 

async function en3() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "293719380"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo

    // Filtrar y obtener solo las URL que no son null
    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[10] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[10].v);

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
    if (url === "" || url === "-") {
      return [];
    }

    let resultados = [];

    // Función para realizar el fetch y el scraping
    const fetchData = async () => {
      const $ = await request({
        uri: url,
        transform: body => cheerio.load(body)
      });

      // Realizar scraping para la página actual
      $('.tablepress.tablepress-id-1567 tbody tr').each((i, row) => {
        const columns = $(row).find('td');
        const pos = $(columns[0]).text().trim();
        const auto = $(columns[1]).text().trim();
        const piloto = $(columns[2]).text().trim();
        const marca = $(columns[3]).text().trim();
        const tiempo = $(columns[4]).text().trim();
        const diferencia = $(columns[5]).text().trim();

        resultados.push({ pos, auto, piloto, marca, tiempo, diferencia });
      });

      // Eliminar los objetos vacíos si existen
      resultados = resultados.filter(resultado => {
        return !Object.values(resultado).every(value => value === '');
      });
    };

    // Función para realizar el polling hasta que haya información disponible
    const pollUntilDataAvailable = async () => {
      const start = Date.now();
      let pollingInterval = 1000; // Intervalo inicial de polling en milisegundos
      let shouldContinue = true;
      while (shouldContinue && Date.now() - start < 30000) { // Esperar hasta 30 segundos
        try {
          await fetchData(); // Intentar obtener los datos
          if (resultados.length > 0) {
            shouldContinue = false; // Detener el polling si se obtienen datos
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        await new Promise(resolve => setTimeout(resolve, pollingInterval)); // Esperar antes de realizar el siguiente intento
        pollingInterval *= 2; // Duplicar el intervalo de polling en cada intento
      }
    };

    // Realizar el polling hasta que haya información disponible
    await pollUntilDataAvailable();

    return resultados;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

  module.exports = {
    en3
  };
