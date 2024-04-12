const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('./googleSheets');

async function urlsCampeonatos() {
    try {
      const sheetId = "1579842406"; // ID de la hoja que deseas obtener
      const datos = await obtenerDatosDesdeGoogleSheets([sheetId]);
  
      // Obtener el nombre de la categoría y la URL de la fila 0, columna 4
      const nombreCategoria = datos[0]?.data[0]?.c[4]?.v;
      const urlCategoria = datos[0]?.data[1]?.c[4]?.v;
  
      // Crear un objeto con las categorías y las URLs
      const categorias = {
        [nombreCategoria]: urlCategoria,
      };
  
      return categorias;
    } catch (error) {
      console.error('Error al obtener y mostrar datos:', error);
      throw error;
    }
}

async function obtenerResultados(url) {
  try {
    if (!url) {
      return [];
    }

    const $ = await request({
      uri: url,
      transform: body => cheerio.load(body)
    });

    const tablaPosiciones = [];
    $('#tabs-1 .puntajes').each((i, element) => {
      const posicion = $(element).find('.posicion').text().trim();
      const piloto = $(element).find('.piloto span').text().trim();
      const puntos = $(element).find('.total').text().trim();
      let marca = $(element).find('.marca img').attr('src');
      
      // Modifica la URL de la imagen para que coincida con el formato esperado
      marca = marca ? `<img src="${marca}">` : null;

      tablaPosiciones.push({ nro: "", posicion, piloto, marca, puntos, victorias: "" });
    });

    return tablaPosiciones;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function obtenerResultadosTC2000() {
  try {
    const categorias = await urlsCampeonatos();
    const urlTC2000 = categorias["TC2000"]; // Obtener la URL específica del TC2000

    return await obtenerResultados(urlTC2000); // Llamar directamente a la función para obtener los resultados del TC2000
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

module.exports = obtenerResultadosTC2000;
