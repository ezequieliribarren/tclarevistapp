const puppeteer = require('puppeteer');

async function extraerDatosTabla(urlCarrera) {
    let tablaHtml = '';

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(urlCarrera);
        
        // Esperar a que se cargue la tabla
        await page.waitForSelector('.table-carreras');

        // Extraer HTML de la tabla
        tablaHtml = await page.evaluate(() => {
            return document.querySelector('.table-carreras').outerHTML;
        });

        await browser.close();
    } catch (error) {
        console.error('Error al cargar la URL de la carrera:', error.message);
    }

    return tablaHtml;
}

module.exports = {
    extraerDatosTabla
};