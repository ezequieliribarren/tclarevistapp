const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('./googleSheets');

async function obtenerUrlsTP2() {
    try {
        // ID de la hoja de Google Sheets que contiene las URLs de TP
        const sheetId = "1579842406";

        // Obtener datos desde Google Sheets
        const datos = await obtenerDatosDesdeGoogleSheets([sheetId]);

        // Obtener las URLs de TP desde las posiciones 12, 13 y 14
        const urlsTP = [
            datos[0]?.data[1]?.c[13]?.v,
        ];

        return urlsTP;
    } catch (error) {
        console.error('Error al obtener y mostrar datos:', error);
        throw error;
    }
}

async function extraerDatosTP2(url) {
    try {
        // Realizar una solicitud HTTP GET a la URL de TP
        const html = await request(url);

        // Load the HTML content using Cheerio
        const $ = cheerio.load(html);

        // Objeto para almacenar los datos extraídos de la tabla
        const data = [];

        // Extraer datos de la tabla
        $('tbody tr').each((index, element) => {
            const posicion = $(element).find('td:nth-child(1)').text().trim();
            const numero = $(element).find('td:nth-child(2)').text().trim();
            const piloto = $(element).find('td:nth-child(3)').text().trim();
            const auto = $(element).find('td:nth-child(4)').text().trim();
            const puntos = $(element).find('td:nth-child(5)').text().trim();

            data.push({
                posicion,
                numero,
                piloto,
                auto,
                puntos
            });
        });

        return data;
    } catch (error) {
        console.error('Error al extraer datos de TP:', error);
        throw error;
    }
}

module.exports = { obtenerUrlsTP2, extraerDatosTP2 };
