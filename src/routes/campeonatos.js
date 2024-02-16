const cheerio = require('cheerio');
const request = require('request-promise');

// Mapeo de categorías y sus respectivas URLs
const categorias = {
  'tc': 'https://www.actc.org.ar/tc/campeonato.html',
  'tcm': 'https://www.actc.org.ar/tcm/campeonato.html',
  'tcp': 'https://www.actc.org.ar/tcp/campeonato.html',
  'tcpm': 'https://www.actc.org.ar/tcpm/campeonato.html',
  'tcpk': 'https://www.actc.org.ar/tcpk/campeonato.html',
  'tcppk': 'https://www.actc.org.ar/tcppk/campeonato.html',
};


async function campeonatos() {
  try {
    const datosPorCategoria = {};

    // Itera sobre cada categoría y realiza el scrapeo correspondiente
    for (const categoria in categorias) {
      const uri = categorias[categoria];

      const $ = await request({
        uri: uri,
        transform: body => cheerio.load(body)
      });

      // Realiza el scrapeo para extraer la información deseada
      const tablaPosiciones = [];
      $('.table tr').each((i, row) => {
        const columns = $(row).find('td');
        const posicion = $(columns[0]).text().trim();
        const nro = $(columns[1]).text().trim();
        const piloto = $(columns[2]).text().trim();
        const marca = $(columns[4]).html();
        const puntos = $(columns[5]).text().trim();

        tablaPosiciones.push({ nro, posicion, piloto, marca, puntos,  });
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


module.exports = campeonatos;
