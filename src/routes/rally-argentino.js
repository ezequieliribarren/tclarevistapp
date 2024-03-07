
// const cheerio = require('cheerio');
// const request = require('request-promise');

// const tramos = {
//     // 'shake': 'https://www.rallyargentino.com/tiempos2010/2023/carrera10/SHAKEARG.HTM',
//     'p1': 'https://www.rallyargentino.com/tiempos2010/2023/carrera10/ARGGR_PE01.HTM',
//     // 'p2': 'https://www.rallyargentino.com/tiempos2010/2023/carrera10/ARGGR_PE02.HTM',
//     // 'p3': 'https://www.rallyargentino.com/tiempos2010/2023/carrera10/ARGGR_PE03.HTM',
//     // 'p4': 'https://www.rallyargentino.com/tiempos2010/2023/carrera10/ARGGR_PE04.HTM',
//     // 'p5': 'https://www.rallyargentino.com/tiempos2010/2023/carrera10/ARGGR_PE05.HTM',
//     // 'p6': 'https://www.rallyargentino.com/tiempos2010/2023/carrera10/ARGGR_PE06.HTM',
//     // 'p7': 'https://www.rallyargentino.com/tiempos2010/2023/carrera10/ARGGR_PE07.HTM',
//     // 'p8': 'https://www.rallyargentino.com/tiempos2010/2023/carrera10/ARGGR_PE08.HTM',
//     // 'p9': 'https://www.rallyargentino.com/tiempos2010/2023/carrera10/ARGGR_PE09.HTM',
//     // 'p10': 'https://www.rallyargentino.com/tiempos2010/2023/carrera10/ARGGR_PE10.HTM',
//     // 'p11': 'https://www.rallyargentino.com/tiempos2010/2023/carrera10/ARGGR_PE11.HTM',
//     // 'p12': 'https://www.rallyargentino.com/tiempos2010/2023/carrera10/ARGGR_PE12.HTM',
//     // 'p13': 'https://www.rallyargentino.com/tiempos2010/2023/carrera10/ARGGR_PE13.HTM',
//     // 'p14': 'https://www.rallyargentino.com/tiempos2010/2023/carrera10/ARGGR_PE14.HTM', 
//     // 'p15': 'https://www.rallyargentino.com/tiempos2010/2023/carrera10/ARGGR_PE15.HTM', 
//     // 'p16': 'https://www.rallyargentino.com/tiempos2010/2023/carrera10/ARGGR_PE16.HTM', 
//   };

// async function rallyArgentino() {
//     try {
//         const datosPorTramo = {};

//         // Itera sobre cada categoría y realiza el scrapeo correspondiente
//         for (const tramo in tramos) {
//             const uri = tramos[tramo];

//             const $ = await request({
//                 uri: uri,
//                 transform: body => cheerio.load(body)
//             });

//             // Realiza el scrapeo para extraer la información deseada
//             const tablaPosiciones = [];
//             $('.titulo_grande_blanco3').each((i, row) => {
//                 const columns = $(row).find('td');
//                 const posicion = $(columns[0]).text().trim().replace(/\n/g, '').replace(/\s+/g, ' ');
//                 const numero = $(columns[2]).text().trim().replace(/\n/g, '').replace(/\s+/g, ' ');
//                 const piloto = $(columns[3]).text().trim().replace(/\n/g, '').replace(/\s+/g, ' ');
//                 const tiempo = $(columns[4]).text().trim().replace(/\n/g, '').replace(/\s+/g, ' ');
//                 const dif = $(columns[5]).text().trim().replace(/\n/g, '').replace(/\s+/g, ' ');
                

//                 tablaPosiciones.push({ posicion, numero, piloto, tiempo, dif  });
//             });

//             // Almacena los datos obtenidos para esta categoría
//             datosPorTramo[tramo] = tablaPosiciones.slice(7);


//         }

//         // Devuelve el objeto JSON con los datos por categoría
//         return datosPorTramo;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// }

// module.exports = rallyArgentino;



