const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('./googleSheets');

async function obtenerURLF1() {
    try {
        const sheetId = "1579842406"; // ID de la hoja que deseas obtener
        const datos = await obtenerDatosDesdeGoogleSheets([sheetId]);

        // Obtener el nombre de la categoría y la URL de la fila 0, columna 6
        const nombreCategoria = datos[0]?.data[0]?.c[6]?.v;
        const urlCategoria = datos[0]?.data[1]?.c[6]?.v;

        // Crear un objeto con las categorías y las URLs
        const categorias = {
            [nombreCategoria]: urlCategoria,
        };

        return categorias;
    } catch (error) {
        console.error('Error al obtener y mostrar datos:', error);
        throw error;
    }
}

async function extraerDatosF1() {
    try {
        // Obtener la URL de la función obtenerURLF1
        const categorias = await obtenerURLF1();
        const urlF1 = categorias['F1']; // Suponiendo que la categoría se llama 'F1'

        // Realizar una solicitud HTTP GET a la URL de la Fórmula 1
        const html = await request(urlF1);

        // Load the HTML content using Cheerio
        const $ = cheerio.load(html);

        // Objeto para almacenar los datos extraídos de la tabla
        const data = [];

        // Extraer datos de la tabla
        $('tbody tr').each((index, element) => {
            const posicion = $(element).find('td:nth-child(2)').text().trim();
            const pilotoDirty = $(element).find('td:nth-child(3) a').text().trim();
            // Limpiar el nombre del piloto
            const piloto = pilotoDirty.replace(/\s+/g, ' ').trim();
            const nacionalidad = $(element).find('td:nth-child(4)').text().trim();
            const marca = $(element).find('td:nth-child(5) a').text().trim();
            const puntos = $(element).find('td:nth-child(6)').text().trim();

            data.push({
                posicion,
                piloto,
                nacionalidad,
                marca,
                puntos
            });
        });

        return data;
    } catch (error) {
        console.error('Error al extraer datos de la Fórmula 1:', error);
        throw error;
    }
}

module.exports = { extraerDatosF1 };
