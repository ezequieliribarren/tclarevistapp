const puppeteer = require('puppeteer');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

async function scrapeData2menu() {
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

            // Esperar a que el segundo botón del menú esté disponible o hasta que pasen 500 ms
            await Promise.race([
                page.waitForSelector('.menuTabFijo li:nth-child(2) a', { timeout: 500 }),
                page.waitForTimeout(500)
            ]);

            // Verificar si existe el segundo botón del menú
            const secondMenuItem = await page.$('.menuTabFijo li:nth-child(2) a');

            // Si no existe, retornar un array vacío
            if (!secondMenuItem) {
                return [];
            }

            // Obtener el texto del botón y asignarlo a la variable categoria
            const categoria = await page.evaluate(element => element.textContent.trim(), secondMenuItem);

            // Esperar 1000 ms para verificar si es clickeable
            await page.waitForTimeout(1000);

            // Verificar si el botón es clickeable
            const isClickable = await page.evaluate(element => !element.disabled, secondMenuItem);

            // Si no es clickeable, retornar un array vacío
            if (!isClickable) {
                return [];
            }

            // Hacer clic en el segundo botón del menú
            await secondMenuItem.click();

            // Esperar un breve momento para que la página se cargue completamente
            await page.waitForTimeout(2000); // Puedes ajustar este valor según sea necesario

            // Esperar a que el elemento menuTabFijo esté disponible
            await page.waitForSelector('.menuTabFijo', { timeout: 1000 });

            const results = [];

            // Obtener todos los elementos h3 dentro de div_activities
            const h3Elements = await page.$$('#div_activities h3');

            // Iterar sobre los elementos h3
            for (const h3 of h3Elements) {
                const tanda = await page.evaluate(h3 => h3.textContent.trim(), h3);
                results.push({ title: tanda, items: [], categoria }); // Agregar la categoría aquí

                // Obtener todos los elementos li.datas dentro del hermano siguiente del h3
                const liDatas = await h3.evaluateHandle(sibling => {
                    let siblingElement = sibling.nextElementSibling;
                    const datas = [];
                    while (siblingElement && siblingElement.tagName === 'LI' && siblingElement.classList.contains('datas')) {
                        // Verificar si el elemento tiene un <i>
                        const icono = siblingElement.querySelector('i');
                        let estado = '';
                        if (icono) {
                            const img = icono.querySelector('img');
                            if (img) {
                                const src = img.getAttribute('src');
                                if (src.includes('ppcev_state_4.png')) {
                                    estado = 'finalizado';
                                } else if (src.includes('ppcev_state_2.png')) {
                                    estado = 'vivo';
                                } else {
                                    estado = 'próximo';
                                }
                            } else {
                                estado = 'próximo';
                            }
                        }
                        
                        datas.push({ tanda: siblingElement.textContent.trim(), estado }); // Agregar el texto y el estado
                        siblingElement = siblingElement.nextElementSibling;
                    }
                    return datas;
                });

                results[results.length - 1].items = await liDatas.jsonValue();
            }

            return results;
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
scrapeData2menu().then(resultados => {
    if (resultados) {
        resultados.forEach(resultado => {
            console.log('Title:', resultado.title);
            resultado.items.forEach(item => {
                console.log('Item:', item.tanda);
                console.log('Estado:', item.estado);
                console.log('Categoria:', resultado.categoria); // Mostrar la categoría
            });
        });
    }
}).catch(error => {
    console.error('Ocurrió un error:', error);
});

module.exports = scrapeData2menu;
