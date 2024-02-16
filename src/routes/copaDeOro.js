
const cheerio = require('cheerio');
const request = require('request-promise');

const categoriasCopaDeOro = {
    'tc': 'https://www.actc.org.ar/tc/copa-de-oro.html',
    'tcm': 'https://www.actc.org.ar/tcm/copa-de-oro.html',
    'tcp': 'https://www.actc.org.ar/tcp/copa-de-oro.html',
    'tcpm': 'https://www.actc.org.ar/tcpm/copa-de-oro.html',
    'tcpk': 'https://www.actc.org.ar/tcpk/copa-de-oro.html',
  };

  async function copaDeOro() {
    try {
      const datosPorCategoria = {};
  
      // Itera sobre cada categoría y realiza el scrapeo correspondiente
      for (const categoria in categoriasCopaDeOro) {
        const uri = categoriasCopaDeOro[categoria];
  
        const $ = await request({
          uri: uri,
          transform: body => cheerio.load(body)
        });
  
        // Realiza el scrapeo para extraer la información deseada
        const tablaPosiciones = [];
        $('.table tr').each((i, row) => {
          const columns = $(row).find('td');
          const posicion = $(columns[0]).text().trim();
          const puntos = $(columns[1]).text().trim();
          const piloto = $(columns[2]).text().trim();
  
          tablaPosiciones.push({ posicion, piloto, puntos,  });
        });
  
        // Almacena los datos obtenidos para esta categoría
        datosPorCategoria[categoria] = tablaPosiciones;
      }
  
      // Devuelve el objeto JSON con los datos por categoría
      return datosPorCategoria;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }


  module.exports = copaDeOro;