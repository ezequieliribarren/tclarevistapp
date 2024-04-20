const puppeteer = require('puppeteer');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

async function scrapeData2() {
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

            // Esperar a que el segundo botón del menú esté disponible
            await page.waitForSelector('.menuTabFijo li:nth-child(2) a', { timeout: 35000 });

            // Obtener los elementos .datas dentro de #titleAct para obtener las próximas tandas
            const proximasTandas = await page.$$eval('#titleAct .datas', datas => datas.map(data => data.textContent.trim()));

            // Obtener los días utilizando la función scrapeData2menu
            const dias = await scrapeDias(page);

            // Obtener los títulos utilizando la función scrapeData2menu
            const titles = await scrapeTitles(page);

            // Array para almacenar los resultados de cada 'li datas'
            const resultados = [];

            // Iterar sobre cada 'li datas'
            for (const [index, li] of proximasTandas.entries()) {
                // Obtener la tanda y procesarla
                let tanda = li.trim().toUpperCase();

                // Hacer clic en el 'li datas' actual
                await li.click();

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

            // Retornar todos los resultados juntos junto con los días, las próximas tandas y los títulos
            return {
                Dias: dias,
                ProximasTandas: proximasTandas,
                Resultados: resultados,
                Titles: titles
            };
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

// Función para obtener los días utilizando la lógica de scrapeData2menu
async function scrapeDias(page) {
    const results = await scrapeData2menu(page);
    return results.map(result => result.title);
}

// Función para obtener los títulos utilizando la lógica de scrapeData2menu
async function scrapeTitles(page) {
    const results = await scrapeData2menu(page);
    return results.reduce((titles, result) => {
        return [...titles, ...result.items.map(item => item.tanda)];
    }, []);
}

// Función que realiza la lógica de scrapeData2menu para obtener los títulos y los días
async function scrapeData2menu(page) {
    // Copia del código de scrapeData2menu
    // ...

    // Aquí retornas los resultados obtenidos de la misma manera que en scrapeData2menu
}

// Se ejecuta al iniciar el script
scrapeData2().then(resultados => {
    if (resultados) {
        const data = [];
        resultados.forEach(resultado => {
            resultado.Resultados.forEach(tanda => {
                const tandaInfo = {
                    tanda: tanda.Tanda,
                    estado: tanda.Estado,
                    titles: resultado.Titles // Agregar los títulos al objeto tandaInfo
                };
                // Agrupar por día
                const diaIndex = tanda.Tanda.indexOf(' ');
                const dia = tanda.Tanda.substring(0, diaIndex);
                const categoriaIndex = tanda.Tanda.lastIndexOf(' ');
                const categoria = tanda.Tanda.substring(diaIndex, categoriaIndex).trim();
                let diaExistente = data.find(item => item.title === dia);
                if (!diaExistente) {
                    diaExistente = { title: dia, items: [], categoria: categoria, titles: resultado.Titles }; // Agregar los títulos al objeto diaExistente
                    data.push(diaExistente);
                }
                diaExistente.items.push(tandaInfo);
            });
        });

        // Imprimir los datos reestructurados
        console.log(JSON.stringify(data, null, 2));
    }
}).catch(error => {
    console.error('Ocurrió un error:', error);
});

module.exports = scrapeData2;
