const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');
const scrapeData = require('../ip/1.js'); // Importar directamente el scraper del endpoint ip1

async function verificarYGuardarResultados() {
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
        const dirPath = path.join(__dirname, 'ip1'); // Directorio para el endpoint ip1
        await fs.mkdir(dirPath, { recursive: true });

        const filePath = path.join(dirPath, `${indice}.json`);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`Datos guardados en: ${filePath}`);
    } catch (error) {
        console.error('Error al guardar el archivo JSON:', error);
    }
}

module.exports = { verificarYGuardarResultados, guardarJSON };
