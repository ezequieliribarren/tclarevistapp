const cheerio = require('cheerio');
const request = require('request-promise');
const obtenerDatosDesdeGoogleSheet = require('../googleSheets');

async function pilotos(indice) {
    try {
      // Obtener los datos desde Google Sheets
      const sheetId = "1112076324"; // ID de la hoja que deseas obtener
      const datos = await obtenerDatosDesdeGoogleSheet(sheetId);
      
      const urls = datos[0].data.map(fila => fila.c[7].v); 
  
      if (indice >= 0 && indice < urls.length) {
        const url = urls[indice];
        const pilotosPorUrl = await obtenerPilotos([url]);
        return pilotosPorUrl[url];
      } else {
        throw new Error('El índice está fuera de rango');
      }
    } catch (error) {
      console.error('Error al obtener y mostrar datos:', error);
      throw error;
    }
  }
async function obtenerPilotos(urls) {
    try {
        const pilotosPorUrl = {};

        // Iterar sobre cada URL en el array
        for (const url of urls) {
          const $ = await request({
            uri: url,
            transform: body => cheerio.load(body)
          });
        
          const pilotos = [];
        
          // Realizar scraping para la página actual
          $('.table tr').each((i, row) => {
            const columns = $(row).find('td');
            const titles = $(row).find('th');
            const title = titles.text().trim();
            const numero = $(columns[0]).text().trim();
            const piloto = $(columns[1]).text().trim();
            const img = $(columns[2]).html();
        
            if (title !== '') {
              pilotos.push({ title });
            }
            
            pilotos.push({ numero, piloto, img });
          });
        
          // Eliminar el primer objeto vacío si existe
          if (pilotos.length > 0 && Object.values(pilotos[0]).every(value => value === '')) {
            pilotos.shift();
          }
        
          pilotosPorUrl[url] = pilotos;
        }
        
        return pilotosPorUrl;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

module.exports = {
  pilotos,
  obtenerPilotos
};
