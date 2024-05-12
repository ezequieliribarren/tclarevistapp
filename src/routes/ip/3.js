const puppeteer = require('puppeteer');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

async function scrapeData3() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        // Obtener los datos desde Google Sheets
        const sheetId = "1579842406"; // ID de la hoja de cálculo que deseas obtener
        const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo
        
        // Obtener la URL de la columna 3, fila 1
        const url = datos[0].data[1].c.find((_, index) => index === 3)?.v || null;

        // Verificar si la URL es válida
        if (url) {
            // Ir a la URL obtenida desde Google Sheets
            await page.goto(url);

            // Esperar a que el tercer botón del menú esté disponible
            await page.waitForSelector('.menuTabFijo li:nth-child(3) a', { timeout: 2000 });

            // Obtener el tercer botón del menú y hacer clic en él
            await page.click('.menuTabFijo li:nth-child(3) a');

            // Esperar a que al menos un elemento 'li' con clase 'datas' esté disponible
            await page.waitForSelector('li.datas a');

            // Obtener todos los enlaces dentro de los elementos 'li' con clase 'datas'
            const enlacesDatas = await page.$$('li.datas a');

            // Array para almacenar los resultados de todas las tandas
            const resultados = [];

            // Iterar sobre cada enlace 'a' dentro de los 'li datas'
            for (const enlace of enlacesDatas) {
                // Hacer clic en el enlace 'a' dentro del 'li datas'
                await enlace.click();

                // Esperar a que la tabla esté disponible
                await page.waitForSelector('table.table');

                // Obtener los datos de la tabla
                const datosTabla = await page.$$eval('table.table tbody tr', rows => {
                    return rows.map(row => {
                        const columns = row.querySelectorAll('td');
                        // Modificar la forma de obtener la columna 3
                        const marcaColumn = columns[3];
                        const marcaText = marcaColumn ? (marcaColumn.querySelector('img') ? marcaColumn.querySelector('img').getAttribute('src') : '') : '';
                        return {
                            Pos: columns[0] ? columns[0].textContent.trim() : '',
                            Numero: columns[1] ? columns[1].textContent.trim() : '',
                            Piloto: columns[2] ? columns[2].textContent.trim() : '',
                            // Cambiar la asignación de Marca para usar el contenido del atributo src del elemento img
                            Marca: marcaText,
                            Vueltas: columns[4] ? columns[4].textContent.trim() : '',
                            Tiempo: columns[5] ? columns[5].textContent.trim() : '',
                            Diferencia: columns[6] ? columns[6].textContent.trim() : ''
                        };
                    });
                });

                // Obtener la tanda del 'li datas' actual
                let tanda = await enlace.evaluate(el => el.textContent.trim().toUpperCase());

                // Verificar si está en vivo o finalizado
                let estado = await enlace.$eval('i img', img => img.src.includes('ppcev_state_4.png') ? 'finalizado' : 'vivo');

                // Agregar los datos de la tanda al array de resultados
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
scrapeData3().then(resultados => {
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

module.exports = scrapeData3;