const puppeteer = require('puppeteer');

async function scrapeData3menu() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto('http://186.0.207.212:8082/modules/ppcev/index.php');

        // Esperar a que el tercer botón del menú esté disponible
        await page.waitForSelector('.menuTabFijo li:nth-child(3) a', { timeout: 35000 });

        // Obtener el tercer botón del menú y hacer clic en él
        await page.click('.menuTabFijo li:nth-child(3) a');

        // Esperar un breve momento para que la página se cargue completamente
        await page.waitForTimeout(2000); // Puedes ajustar este valor según sea necesario

        // Esperar a que el elemento menuTabFijo esté disponible
        await page.waitForSelector('.menuTabFijo', { timeout: 35000 });

        const results = [];

        // Obtener todos los elementos h3 dentro de div_activities
        const h3Elements = await page.$$('#div_activities h3');

        // Iterar sobre los elementos h3
        for (const h3 of h3Elements) {
            const text = await page.evaluate(h3 => h3.textContent.trim(), h3);
            results.push({ title: text, items: [] });

            // Obtener todos los elementos li.datas dentro del hermano siguiente del h3
            const liDatas = await h3.evaluateHandle(sibling => {
                let siblingElement = sibling.nextElementSibling;
                const datas = [];
                while (siblingElement && siblingElement.tagName === 'LI' && siblingElement.classList.contains('datas')) {
                    datas.push(siblingElement.textContent.trim());
                    siblingElement = siblingElement.nextElementSibling;
                }
                return datas;
            });

            results[results.length - 1].items = await liDatas.jsonValue();
        }

        // Eliminar el último objeto del array results
        results.splice(-1, 1);

        return results;
    } catch (error) {
        console.error('Ocurrió un error:', error);
        return null;
    } finally {
        await browser.close();
    }
}

// Se ejecuta al iniciar el script
scrapeData3menu().then(resultados => {
    resultados.forEach(resultado => {
        console.log('Title:', resultado.title);
        console.log('Items:', resultado.items);
    });
}).catch(error => {
    console.error('Ocurrió un error:', error);
});

module.exports = scrapeData3menu;
