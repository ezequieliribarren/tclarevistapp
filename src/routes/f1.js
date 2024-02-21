const cheerio = require('cheerio');
const request = require('request-promise');

async function calendariof1() {
    try {
     
       const uri = 'https://www.formula1.com/en/racing/2024.html';
   
       const $ = await request({
           uri: uri,
           transform: body => cheerio.load(body)
       });
       const eventos = [];
   
       $('.event-item').each((i, element) => {
           const round = $(element).find('.card-title').text().trim();
           const rawDate = $(element).find('.date-month').text().trim();
           // Limpiar y formatear la fecha
           const date = formatFecha(rawDate);
           const country = $(element).find('.event-place').text().trim();
           const raceName = $(element).find('.event-title').text().trim();
           // Obtener la URL de la imagen del circuito
           const circuitImageUrl = $(element).find('.event-image img').attr('data-src');
   
           eventos.push({ round, date, country, raceName, circuitImageUrl });
       });
   
       // Ordenar los eventos por fecha
       eventos.sort((a, b) => new Date(a.date.split(' - ')[0]) - new Date(b.date.split(' - ')[0]));
   
       // Devolver los eventos
       return eventos;
   
   } catch (error) {
     console.error('Error fetching data:', error);
     throw error;
    }
   }
   
   // Función para formatear las fechas
   function formatFecha(rawDate) {
       // Reemplazar caracteres no deseados en la fecha y separar la fecha por inicio y fin
       const cleanedDate = rawDate.replace(/\n|\s/g, '');
       const parts = cleanedDate.split('-').map(part => part.trim());
       return parts[0] + ' - ' + parts[1];
   }
   

module.exports = calendariof1;
