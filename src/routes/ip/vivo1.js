const scrapeData1menu = require('./scrapeData1menu');
const scrapeData = require('./scrapeData');

async function combinedScrape() {
    try {
        const data1 = await scrapeData1menu();
        const data2 = await scrapeData();

        return { ...data1, ...data2 }; // Combinar ambos resultados en un solo objeto
    } catch (error) {
        console.error('Ocurrió un error:', error);
        return null;
    }
}

// Llamar a la función combinedScrape al iniciar el script
combinedScrape().then(resultados => {
    if (resultados) {
        // Aquí puedes manejar los resultados combinados
        console.log(resultados);
    }
}).catch(error => {
    console.error('Ocurrió un error:', error);
});

module.exports = combinedScrape;