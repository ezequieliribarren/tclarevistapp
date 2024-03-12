const cheerio = require('cheerio');
const request = require('request-promise');
const obtenerDatosDesdeGoogleSheet = require('../googleSheets');

async function obtenerYMostrarDatos(indice = null) {
    try {
        // Obtener los datos desde Google Sheets
        const sheetId = "1112076324"; // ID de la hoja que deseas obtener
        const datos = await obtenerDatosDesdeGoogleSheet(sheetId);
  
        const urls = datos[0].data.map(fila => fila.c[6].v); // Obtener todas las URLs
  
        const horariosPorUrl = await obtenerHorarios(urls); // Obtener horarios para cada URL
  
        // Si se proporciona un índice, devolver los horarios correspondientes a ese índice
        if (indice !== null && indice >= 0 && indice < horariosPorUrl.length) {
            return horariosPorUrl[indice];
        }
  
        // Devolver todos los horarios si no se proporciona un índice
        return horariosPorUrl;
    } catch (error) {
        console.error('Error al obtener y mostrar datos:', error);
        throw error;
    }
}

async function obtenerHorarios(urls) {
    try {
        const horariosPorUrl = [];

        // Iterar sobre cada URL en el array
        for (const url of urls) {
            const $ = await request({
                uri: url,
                transform: body => cheerio.load(body)
            });

            const horarios = [];

            // Realizar scraping para la página actual
            $('.table tr').each((i, row) => {
                const columns = $(row).find('td');
                const titles = $(row).find('th');
                const title = titles.text().trim();
                const horario = $(columns[0]).text().trim();
                const tipo = $(columns[1]).text().trim();
                const categoria = $(columns[2]).text().trim();
                const grupo = $(columns[3]).text().trim();

                // Verificar si el título no es nulo antes de agregarlo al array de horarios
                if (title !== '') {
                    horarios.push({ title });
                }

                horarios.push({ categoria, tipo, grupo, horario });
            });

            // Eliminar el primer objeto vacío si existe
            if (horarios.length > 0 && Object.values(horarios[0]).every(value => value === '')) {
                horarios.shift();
            }

            // Agregar los horarios al array de horariosPorUrl
            horariosPorUrl.push(horarios);
        }

        return horariosPorUrl;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}


module.exports = {
  obtenerYMostrarDatos,
  obtenerHorarios
};
