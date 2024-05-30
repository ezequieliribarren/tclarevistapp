const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets'); 

async function final() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "1870545693"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo

    // Filtrar y obtener solo las URL que no son null
    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[18] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[18].v);

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
    if (url === "") {
      // Si la URL es "", devolver un valor predeterminado (por ejemplo, un arreglo vacío)
      return [];
    }

    const html = await request(url);
    const $ = cheerio.load(html);

    const resultados = [];
  
    // Iterar sobre cada fila de la tabla
    $('.resultsarchive-table tbody tr').each((i, row) => {
      const columns = $(row).find('td');
      const pos = $(columns[1]).text().trim();
      const nro = $(columns[2]).text().trim();
      let piloto = $(columns[3]).text().trim();
      const marca = $(columns[4]).text().trim();
      const tiempo = $(columns[5]).text().trim();
      const diferencia = $(columns[6]).text().trim();
      const vueltas = $(columns[7]).text().trim();

      // Limpiar el nombre del piloto
      piloto = piloto.replace(/\s+/g, ' '); // Eliminar espacios adicionales
      const nombreApellido = piloto.split(' ');
      let nombre = nombreApellido[0];
      let apellido = nombreApellido.slice(1).join(' ');
      
      // Convertir iniciales en mayúsculas a minúsculas
      nombre = nombre.charAt(0) + nombre.slice(1);
      piloto = piloto.replace(/\s+/g, ' '); // Eliminar espacios adicionales
      piloto = piloto.split(' ').map(word => word === word.toUpperCase() && word.length > 1 ? word.slice(0, -3) : word).join(' '); // Eliminar las tres últimas siglas en mayúsculas

      // Limpiar el tiempo
      const tiempoLimpiado = tiempo.replace(/^\d+:/, ''); // Eliminar minutos si es mayor a 1 hora

      // Limpiar la diferencia
      const diferenciaLimpiada = diferencia.replace(/^\+/, ''); // Eliminar el signo '+' si está presente

      resultados.push({ pos, nro, nombre, apellido, piloto,  marca, tiempo: tiempoLimpiado, diferencia: diferenciaLimpiada, vueltas });
    });

    return resultados;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
  

module.exports = {
  final
};
