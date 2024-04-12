const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('./googleSheets');

async function urlsCampeonatos() {
    try {
        const sheetId = "1579842406"; // ID de la hoja que deseas obtener
        const datos = await obtenerDatosDesdeGoogleSheets([sheetId]);

        // Obtener el nombre de la categoría y la URL de la fila 0, columna 4
        const nombreCategoria = datos[0]?.data[0]?.c[5]?.v;
        const urlCategoria = datos[0]?.data[1]?.c[5]?.v;

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

async function obtenerResultados(url) {
    try {
        if (!url) {
            return [];
        }

        const $ = await request({
            uri: url,
            transform: body => cheerio.load(body)
        });

        const tablaPosiciones = [];
        $('.table-group-divider tr').each((i, row) => {
            const columns = $(row).find('td');
            const piloto = $(columns[0]).text().trim();
            const marcaElemento = $(columns).find('img').attr('src'); // Buscar el elemento img en todas las columnas
            const marca = marcaElemento ? marcaElemento.match(/\/([^\/.]+)\./)[1] : ''; // Extraer el nombre de la marca de la URL
            const puntos = $(columns[13]).text().trim(); // Se cambió el índice a 13

            tablaPosiciones.push({ piloto, marca, puntos,  });
        });

        return tablaPosiciones;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}


async function obtenerResultadosRallyArgentino() {
    try {
        const categorias = await urlsCampeonatos();
        const urlRallyArgentino = categorias["Rally Argentino"]; // Obtener la URL específica del Rally Argentino

        return await obtenerResultados(urlRallyArgentino); // Llamar directamente a la función para obtener los resultados del Rally Argentino
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

module.exports = obtenerResultadosRallyArgentino;
