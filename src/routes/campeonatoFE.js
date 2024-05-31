const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('./googleSheets');

async function obtenerurlFE() {
    try {
        const sheetId = "1579842406"; // ID de la hoja que deseas obtener
        const datos = await obtenerDatosDesdeGoogleSheets([sheetId]);

        // Obtener la URL de FE directamente
        const urlFE = datos[0]?.data[1]?.c[9]?.v;

        return urlFE;
    } catch (error) {
        console.error('Error al obtener y mostrar datos:', error);
        throw error;
    }
}

async function extraerDatosFE() {
    try {
        // Obtener la URL de FE
        const urlFE = await obtenerurlFE();

        // Realizar una solicitud HTTP GET a la URL de FE con el encabezado de agente de usuario
        const html = await request(urlFE, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        // Load the HTML content using Cheerio
        const $ = cheerio.load(html);

        // Objeto para almacenar los datos extraídos de la tabla
        const data = [];

        // Extraer datos de la tabla
        $('tbody tr').each((index, element) => {
            const posicion = $(element).find('td:nth-child(1)').text().trim();
            const pilotoDirty = $(element).find('td:nth-child(2) .name-short').text().trim();
            // Limpiar el nombre del piloto
            const piloto = pilotoDirty.replace(/\s+/g, ' ').trim();
            const puntos = $(element).find('td:nth-child(3)').text().trim();

            data.push({
                posicion,
                piloto,
                puntos
            });
        });

        return data;
    } catch (error) {
        console.error('Error al extraer datos de FE:', error);
        throw error;
    }
}

module.exports = { extraerDatosFE };
