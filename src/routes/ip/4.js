const puppeteer = require('puppeteer');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

async function scrapeData4() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        const sheetId = "1579842406";
        const datos = await obtenerDatosDesdeGoogleSheets([sheetId]);
        const url = datos[0].data[1].c.find((_, index) => index === 3)?.v || null;

        if (url) {
            await page.goto(url);
            await page.waitForSelector('.menuTabFijo li:nth-child(4) a', { timeout: 2000 });
            await page.click('.menuTabFijo li:nth-child(4) a');
            await page.waitForSelector('li.datas a');

            const enlacesDatas = await page.$$('li.datas a');
            const resultados = [];

            for (let i = 0; i < enlacesDatas.length; i++) {
                const enlace = enlacesDatas[i];
                try {
                    await enlace.click();
                    await page.waitForSelector('table.table', { timeout: 2000 });

                    const datosTabla = await page.$$eval('table.table tbody tr', rows => {
                        return rows.map(row => {
                            const columns = row.querySelectorAll('td');
                            const marcaColumn = columns[3];
                            const marcaText = marcaColumn ? (marcaColumn.querySelector('img') ? marcaColumn.querySelector('img').getAttribute('src') : '') : '';

                            const flagIcon = row.querySelector('i.fa-flag');
                            const flag = flagIcon && getComputedStyle(flagIcon).color === 'rgb(92, 184, 92)';

                            return {
                                Pos: columns[0] ? columns[0].textContent.trim() : '',
                                Numero: columns[1] ? columns[1].textContent.trim() : '',
                                Piloto: columns[2] ? columns[2].textContent.trim() : '',
                                Marca: marcaText,
                                Vueltas: columns[4] ? columns[4].textContent.trim() : '',
                                Tiempo: columns[5] ? columns[5].textContent.trim() : '',
                                Diferencia: columns[6] ? columns[6].textContent.trim() : '',
                                Flag: flag
                            };
                        });
                    });

                    let tanda = await enlace.evaluate(el => el.textContent.trim().toUpperCase());
                    let estado = await enlace.$eval('i img', img => img.src.includes('ppcev_state_4.png') ? 'finalizado' : 'vivo');

                    resultados.push({
                        Indice: i,
                        Tanda: tanda,
                        Estado: estado,
                        DatosTabla: datosTabla
                    });
                } catch (error) {
                    console.warn(`Error al procesar el enlace: ${error.message}`);
                    resultados.push({
                        Indice: i,
                        Tanda: '',
                        Estado: '',
                        DatosTabla: []
                    });
                }
            }

            return resultados;
        } else {
            console.log('La URL obtenida desde Google Sheets es nula. No se puede continuar.');
            return null;
        }
    } catch (error) {
        console.error('Ocurrió un error:', error);
        return null;
    } finally {
        await browser.close();
    }
}

module.exports = scrapeData4;
