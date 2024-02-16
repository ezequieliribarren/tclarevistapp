 const cheerio = require('cheerio');
 const request = require('request-promise');

 async function realTime() {
  try {
    const datosPorCategoria = {};
     // Suponiendo que categorias es un objeto definido en otro lugar de tu código
    for (const categoria in categorias) {
      const uri = 'www.apat.realtime.com.ar/'

     const $ = await request({
         uri: uri,
      transform: body => cheerio.load(body)
     });

// Realiza el scrapeo para extraer la información deseada
const tiempos = [];
$('.table tr').each((i, row) => {
const columns = $(row).find('td');
const posicion = $(columns[0]).text().trim();
const nro = $(columns[2]).text().trim();
const piloto = $(columns[3]).text().trim();
const marca = $(columns[1]).html();
const vtas = $(columns[4]).text().trim();
const tiempo = $(columns[5]).text().trim();
const dif = $(columns[6]).text().trim();

tiempos.push({ posicion, marca, nro, piloto, vtas, tiempo, dif });
 });

// Almacena los datos obtenidos para esta categoría
 datosPorCategoria[categoria] = tiempos;
 }

// Devuelve el objeto JSON con los datos por categoría
 return datosPorCategoria;
 } catch (error) {
   console.error('Error fetching data:', error);
    throw error;
  }
 }

 module.exports = realTime;
