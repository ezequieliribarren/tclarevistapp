const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets'); 

async function shake() {
    try {
      // Obtener los datos desde Google Sheets
      const sheetId = "934475876"; // ID de la hoja que deseas obtener
      const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo
  
      // Filtrar y obtener solo las URL que no son null
      const urlsRally = datos[0].data
        .filter(fila => fila.c[8] !== null) // Filtrar las filas con valor null
        .map(fila => fila.c[8].v);
  
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
      if (url === "" || url === "-") {
        // Si la URL es "" o "-", devolver un valor predeterminado (por ejemplo, un arreglo vacío)
        return [];
      }
  
      const $ = await request({
        uri: url,
        transform: body => cheerio.load(body)
      });
  
      const tablaPosiciones = [];
  
      // Buscamos todas las filas de la tabla con la clase "texto_datos"
      $('.texto_datos').each((i, row) => {
        const columns = $(row).find('td');
  
        // Verificamos si hay suficientes columnas para extraer la información
        if (columns.length >= 9) {
          const posicion = $(columns[0]).text().trim(); // Posición
          const numero = $(columns[1]).text().trim(); // Número
          let piloto = $(columns[2]).text().trim(); // Piloto
          const vehiculo = $(columns[3]).text().trim(); // Vehículo
          const categoria = $(columns[4]).text().trim(); // Categoría
          const tramo1 = $(columns[6]).text().trim(); // Tiempo Tramo 1
          const tramo2 = $(columns[7]).text().trim(); // Tiempo Tramo 2
          const tramo3 = $(columns[8]).text().trim(); // Tiempo Tramo 3
          const dif2 = $(columns[8]).text().trim(); // Diferencia
  
          // Limpiar los signos de puntuación del nombre del piloto
          piloto = piloto.replace(/[^\w\s]/gi, '');
  
          // Agregamos los datos extraídos a la tabla de posiciones
          tablaPosiciones.push({ 
            posicion, 
            numero, 
            piloto, 
            vehiculo, 
            categoria, 
            tramo1, 
            tramo2, 
            tramo3, 
            dif2 
          });
        }
      });
  
      return tablaPosiciones;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

module.exports = {
  shake
};
