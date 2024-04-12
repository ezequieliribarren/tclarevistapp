const puppeteer = require('puppeteer');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

async function scrapeData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        // Obtener los datos desde Google Sheets
        const sheetId = "1579842406"; // ID de la hoja de cálculo que deseas obtener
        const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo
        
        // Obtener la URL de la columna 3, fila 1
        const url = datos[0].data[1].c.find((_, index) => index === 3)?.v || null;
        console.log(url)

        // Verificar si la URL es válida
        if (url) {
            // Ir a la URL obtenida desde Google Sheets
            await page.goto(url);

            // Esperar a que el tercer botón del menú esté disponible
            await page.waitForSelector('.menuTabFijo li:nth-child(1) a', { timeout: 35000 });

            // Obtener el tercer botón del menú y hacer clic en él
            await page.click('.menuTabFijo li:nth-child(1) a');

            // Esperar a que al menos un elemento 'li' con clase 'datas' esté disponible
            await page.waitForSelector('li.datas', { timeout: 35000 });

            // Obtener todos los elementos 'li' con clase 'datas'
            const liDatas = await page.$$('li.datas');

            // Array para almacenar los resultados de cada 'li datas'
            const resultados = [];

            // Iterar sobre cada 'li datas'
            for (const [index, li] of liDatas.entries()) {
                // Obtener la tanda y procesarla
                let tanda = '';
                const tandaElement = await li.$('.datas');
                if (tandaElement) {
                    tanda = (await (await tandaElement.getProperty('textContent')).jsonValue()).split('\n')[0].trim().toUpperCase();
                } else {
                    // Si el elemento li.datas no es clickeable, obtener su contenido interno
                    tanda = await page.evaluate(li => li.innerText, li);
                }
            
                // Esperar a que la tabla esté disponible
                await page.waitForSelector('table.table');
            
                // Verificar si está en vivo o finalizado
                const icono = await li.$('i img');
                let estado = '';
                if (icono) {
                    const src = await icono.evaluate(img => img.getAttribute('src'));
                    estado = src.includes('ppcev_state_4.png') ? 'finalizado' : 'vivo';
                }
            
                // Obtener los datos de la tabla del 'li datas' actual
                const datosTabla = await page.$$eval('table.table tbody tr', rows => {
                    return rows.map(row => {
                        const columns = row.querySelectorAll('td');
                        return {
                            Pos: columns[0] ? columns[0].textContent.trim() : '',
                            Numero: columns[1] ? columns[1].textContent.trim() : '',
                            Piloto: columns[2] ? columns[2].textContent.trim() : '',
                            Marca: columns[3] ? columns[3].textContent.trim() : '',
                            Vueltas: columns[4] ? columns[4].textContent.trim() : '',
                            Tiempo: columns[5] ? columns[5].textContent.trim() : '',
                            Diferencia: columns[6] ? columns[6].textContent.trim() : ''
                        };
                    });
                });
            
                // Retornar los datos de la tabla del 'li datas' actual
                resultados.push({
                    Tanda: tanda,
                    Estado: estado,
                    DatosTabla: datosTabla
                });
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

// Se ejecuta al iniciar el script
scrapeData().then(resultados => {
    if (resultados) {
        resultados.forEach(resultado => {
            console.log('Tanda:', resultado.Tanda);
            console.log('Estado:', resultado.Estado);
            
            // Iterar sobre los datos de la tabla
            resultado.DatosTabla.forEach(fila => {
                console.log('Pos:', fila.Pos);
                console.log('Numero:', fila.Numero);
                console.log('Piloto:', fila.Piloto);
                console.log('Marca:', fila.Marca);
                console.log('Vueltas:', fila.Vueltas);
                console.log('Tiempo:', fila.Tiempo);
                console.log('Diferencia:', fila.Diferencia);
                console.log('---');
            });
        });
    }
}).catch(error => {
    console.error('Ocurrió un error:', error);
});

module.exports = scrapeData;
