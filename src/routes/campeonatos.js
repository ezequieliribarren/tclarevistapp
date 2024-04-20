const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../routes/googleSheets');

async function urlsCampeonatos() {
  try {
    const sheetId = "1579842406"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]);

    const categorias = {};

    datos[0].data.slice(1).forEach(fila => {
      if (fila.c[0] !== null && fila.c[1] !== null) {
        const nombreCategoria = fila.c[0].v;
        const urlCategoria = fila.c[1].v;
        categorias[nombreCategoria] = urlCategoria;
      }
    });

    return categorias;
  } catch (error) {
    console.error('Error al obtener y mostrar datos:', error);
    throw error;
  }
}

async function campeonatos() {
  try {
    const datosPorCategoria = {};
    const categorias = await urlsCampeonatos();

    // Array para almacenar todas las promesas de las solicitudes
    const promesasSolicitudes = [];

    // Itera sobre cada categoría y realiza el scrapeo correspondiente
    for (const categoria in categorias) {
      const uri = categorias[categoria];

      // Agrega la promesa a la lista de promesas
      promesasSolicitudes.push(obtenerResultados(uri));
    }

    // Espera a que todas las promesas se completen
    const resultadosPorCategoria = await Promise.all(promesasSolicitudes);

    // Construye el objeto de datos por categoría
    Object.keys(categorias).forEach((categoria, index) => {
      datosPorCategoria[categoria] = resultadosPorCategoria[index];
    });

    return datosPorCategoria;
  } catch (error) {
    console.error('Error fetching data:', error);
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
    const disputadas = 'Disputadas: ' + $('.race-completion .num').text().trim();

    $('table, .table, .table-group-divider').find('tr').each((i, row) => {
      const columns = $(row).find('td');
      const posicion = $(columns[0]).text().trim();
      const nro = $(columns[1]).text().trim();
      const piloto1 = $(columns[2]).text().trim();
      const victorias = $(columns[3]).text().trim();
      const marca = $(columns[4]).html();
      const puntos = $(columns[5]).text().trim();

      piloto = piloto1.split(' ').filter((word, index, self) => self.indexOf(word) === index).join(' ');

      tablaPosiciones.push({ nro, posicion, piloto, marca, puntos, victorias });
    });

    const tablaPosicionesSlice = tablaPosiciones.slice(1);

    // Agregar información de disputadas al primer elemento del arreglo
    if (tablaPosicionesSlice.length > 0) {
      tablaPosicionesSlice[0].disputadas = disputadas;
    }

    return tablaPosicionesSlice;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}


module.exports = campeonatos;
