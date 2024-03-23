const express = require('express');
const router = express.Router();
const { scrapeData } = require('./ip/1.js');

// PRIMER CATEGORIA
router.get('/ip1/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const resultados = await scrapeData();
        if (indice < resultados.length) {
            res.json(resultados[indice]);
        } else {
            res.status(404).json({ error: 'No se encontró el índice especificado' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del array ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del array ${indice}` });
    }
});

module.exports = router;