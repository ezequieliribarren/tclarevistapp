const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('./googleSheets'); // Importa la función para obtener datos desde Google Sheets
const unorm = require('unorm');

// Función para obtener la URL de MotoGP desde Google Sheets
async function obtenerUrlMotoGp() {
    try {
        const sheetId = "1579842406"; // ID de la hoja que deseas obtener
        const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Obtener datos de Google Sheets

        // Obtener la URL de MotoGP directamente de los datos obtenidos
        const urlMotoGp = datos[0]?.data[1]?.c[7]?.v;

        return urlMotoGp;
    } catch (error) {
        console.error('Error al obtener y mostrar datos:', error);
        throw error;
    }
}

// Función principal para extraer datos de MotoGP
async function extraerDatosMotoGp() {
    try {
        // Obtener la URL de MotoGP desde Google Sheets
        const urlMotoGp = await obtenerUrlMotoGp();

        // Realizar una solicitud HTTP GET a la URL de MotoGP
        const body = await request({
            uri: urlMotoGp, // Usar urlMotoGp en lugar de url
            encoding: 'latin1', // Especificar la codificación de caracteres
        });

        // Cargar el contenido HTML utilizando Cheerio
        const $ = cheerio.load(body);

        // Objeto para almacenar los datos extraídos de la tabla
        const data = [];

        // Función para quitar acentos y caracteres especiales solo de los nombres de los pilotos
        function quitarAcentosPilotos(texto) {
            return unorm.nfd(texto).replace(/[\u0300-\u036f]/g, "");
          }

        // Extraer datos de la tabla
        $('table.clas_motociclismo tbody tr').each((index, element) => {
            const posicion = $(element).find('td.posicion').text().trim();
            const piloto = quitarAcentosPilotos($(element).find('td.piloto').text().trim());
            const puntos = $(element).find('td.puntosmundial').text().trim();
            
            // Agregar los datos extraídos al objeto data
            data.push({
                posicion,
                piloto, // Aplicar la función quitarAcentosPilotos directamente aquí
                puntos
            });
        });

        // Devolver los datos extraídos
        return data;
    } catch (error) {
        console.error('Error al extraer datos de MotoGP:', error);
        throw error;
    }
}

// Exportar la función para extraer datos de MotoGP
module.exports = { extraerDatosMotoGp };
