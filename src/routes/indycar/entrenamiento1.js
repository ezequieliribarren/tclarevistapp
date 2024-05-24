const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

async function en1() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "239413181"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo

    // Filtrar y obtener solo las URL que no son null
    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[8] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[8].v);

    console.log(urlsEntrenamiento);

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
    // Si la URL está vacía o contiene solo un guion "-", devolver un array vacío
    if (url.trim() === "" || url.trim() === "-") {
      return [];
    }

    const html = await request(url); // Obtener el HTML de la URL
    const $ = cheerio.load(html); // Cargar el HTML en Cheerio

    // Encontrar la tabla por su ID
    const tabla = $('#qual-season');

    // Inicializar un array para almacenar los datos de la tabla
    const datos = [];

    // Iterar sobre cada fila de la tabla (excepto la cabecera)
    tabla.find('tbody tr').each((index, row) => {
      const columns = $(row).find('td'); // Obtener todas las celdas de la fila
      const fila = {}; // Objeto para almacenar los datos de esta fila

      // Iterar sobre cada celda de la fila y asignar los valores a las propiedades correspondientes
      columns.each((i, column) => {
        // Obtener el texto limpio de la celda y asignarlo a la propiedad correspondiente de la fila
        fila[i] = $(column).text().trim();
      });

      // Agregar la fila al array de datos
      datos.push(fila);
    });

    return datos; // Devolver los datos extraídos de la tabla
  } catch (error) {
    console.error('Error al obtener resultados:', error);
    throw error;
  }
}

module.exports = {
  en1,
};
