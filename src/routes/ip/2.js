const puppeteer = require('puppeteer');

async function scrapeData2() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto('http://186.0.207.212:8082/modules/ppcev/index.php');

        // Esperar a que el tercer botón del menú esté disponible
        await page.waitForSelector('.menuTabFijo li:nth-child(2) a', { timeout: 35000 });

        // Obtener el tercer botón del menú y hacer clic en él
        await page.click('.menuTabFijo li:nth-child(2) a');

        // Esperar a que al menos un elemento 'li' con clase 'datas' esté disponible
        await page.waitForSelector('li.datas', { timeout: 35000 });

        // Obtener el contenido dentro del div con id 'div_ppcev_content'
        const divContent = await page.$('#div_ppcev_content');

        // Obtener el texto del h3 dentro del div 'radiousTop3Ppcev' dentro de 'div_ppcev_content'
        let categoria = await divContent.$eval('#radiousTop3Ppcev h3', h3 => h3.textContent.trim());

        // Extraer el texto entre paréntesis
        categoria = categoria.match(/\((.*?)\)/)[1];

        // Obtener todos los elementos 'li' con clase 'datas'
        const liDatas = await page.$$('li.datas');

        // Array para almacenar los resultados de cada 'li datas'
        const resultados = [];

        // Iterar sobre cada 'li datas'
        for (const [index, li] of liDatas.entries()) {
            // Obtener la tanda y procesarla
            const tandaElement = await li.$('.datas');
            let tanda = '';
            if (tandaElement) {
                tanda = (await (await tandaElement.getProperty('textContent')).jsonValue()).split('\n')[0].trim().toUpperCase();
            }

            // Hacer clic en el elemento 'li'
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
                Categoria: categoria,
                Tanda: tanda,
                Estado: estado,
                DatosTabla: datosTabla
            });
        }

        return resultados;
    } catch (error) {
        console.error('Ocurrió un error:', error);
        return null;
    } finally {
        await browser.close();
    }
}

scrapeData2().then(resultados => {
    resultados.forEach(resultado => {
        console.log('Categoria:', resultado.Categoria);
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
}).catch(error => {
    console.error('Ocurrió un error:', error);
});

module.exports = scrapeData2;
