const puppeteer = require('puppeteer');

async function obtenerDatosF1(url) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(url);

        await page.waitForSelector('.f1.clasification tbody tr');

        // Obtener datos del div con la clase "status"
        const statusData = await page.evaluate(() => {
            const statusDiv = document.querySelector('.status');
            const vuelta = statusDiv.querySelector('.vueltas').textContent.trim();
            const situacion = statusDiv.querySelector('.situacion').textContent.trim();
            const weather = statusDiv.querySelector('.weather img').getAttribute('src');
            
            return { vuelta, situacion, weather };
        });

        // Obtener datos de la cabecera
        const headerData = await page.evaluate(() => {
            const header = document.querySelector('.content-header');
            const carrera = header.querySelector('.content-header--title').textContent.trim();
            const lugar = header.querySelector('.content-header--subtitle span').textContent.trim();
            const fechaInicio = header.querySelector('#startDate').getAttribute('datetime');
            const fechaFin = header.querySelector('#endDate').getAttribute('datetime');

            return { carrera, lugar, fechaInicio, fechaFin };
        });

        const clasificacion = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('.f1.clasification tbody tr'));

            const resultados = rows.map(row => {
                const columns = row.querySelectorAll('td');
                return {
                    posicion: columns[0]?.textContent.trim() || '',
                    piloto: columns[1]?.textContent.trim() || '',
                    dorsal: columns[2]?.textContent.trim() || '',
                    pais: columns[3]?.querySelector('img')?.getAttribute('title') || '',
                    equipo: columns[4]?.textContent.trim() || '',
                    neumatico: columns[5]?.querySelector('img')?.getAttribute('src') || '',
                    vueltas: columns[6]?.textContent.trim() || '',
                    tiempo: columns[7]?.textContent.trim() || ''
                };
            });

            return resultados;
        });

        await browser.close();
        
        // Devolver un objeto que contiene los datos del estado, la clasificación y los datos de la cabecera
        return { statusData, clasificacion, headerData };
    } catch (error) {
        console.error('Error al obtener los datos de F1:', error);
        throw error;
    }
}

module.exports = obtenerDatosF1;
