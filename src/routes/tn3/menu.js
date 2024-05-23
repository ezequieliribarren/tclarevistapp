const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

async function menu() {
  try {
    const sheetId = "162407611"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]);

    const menuPorFecha = [];

    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[8] !== null)
      .map(fila => fila.c[8].v);

    // Iterar sobre cada URL y obtener los títulos por día
    for (let i = 0; i < urlsEntrenamiento.length; i++) {
      const url = urlsEntrenamiento[i];
      const titulos = await obtenerTitulos(url);
      const titulosPorDia = organizarTitulosPorDia(titulos);

      menuPorFecha.push({ ...titulosPorDia });
    }

    console.log('Menú:', JSON.stringify(menuPorFecha, null, 2));

    return menuPorFecha;
  } catch (error) {
    console.error('Error al obtener y mostrar datos:', error);
    throw error;
  }
}

async function obtenerTitulos(url) {
  try {
    const titulos = [];

    if (url === "" || url === "-") {
      return titulos;
    }

    const $ = await request({
      uri: url,
      transform: body => cheerio.load(body)
    });

    // Encuentra todas las tablas con la clase 'lista_resultados'
    $('table.lista_resultados').each((index, table) => {
      // Obtiene el título de la tabla
      const titulo = $(table).find('td.TabResTitulo').text().trim();
      titulos.push(titulo);
    });

    return titulos;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

function organizarTitulosPorDia(titulos) {
  const viernes = [];
  const sabado = [];
  const domingo = [];

  titulos.forEach(titulo => {
    if (titulo.includes("ENTRENAMIENTO")) {
      viernes.push(titulo);
    } else if (titulo.includes("SERIE") || titulo.includes("CLASIFICACIÓN")) {
      sabado.push(titulo);
    } else if (titulo.includes("FINAL")) {
      domingo.push(titulo);
    }
  });

  return { Vie: viernes, Sab: sabado, Dom: domingo };
}

module.exports = {
  menu
};
