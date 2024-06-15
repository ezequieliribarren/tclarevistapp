const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');
const scrapeData = require('../ip/4.js'); // Importar el scraper del endpoint ip2

async function verificarYGuardarResultados2() {
    try {
        const resultados = await scrapeData();

        for (let indice = 0; indice < resultados.length; indice++) {
            const resultado = resultados[indice];

            if (resultado && resultado.Estado === 'finalizado') {
                await guardarJSON(resultado, indice);
            }
        }
    } catch (error) {
        console.error('Error al procesar los resultados:', error);
    }
}

async function guardarJSON(data, indice) {
    try {
        const dirPath = path.join(__dirname, 'ip2'); // Directorio para el endpoint ip2
        await fs.mkdir(dirPath, { recursive: true });

        const filePath = path.join(dirPath, `${indice}.json`);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`Datos guardados en: ${filePath}`);
    } catch (error) {
        console.error('Error al guardar el archivo JSON:', error);
    }
}

module.exports = { verificarYGuardarResultados2, guardarJSON };
