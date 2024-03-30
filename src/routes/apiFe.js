const express = require('express');
const router = express.Router();
const fsPromises = require('fs').promises;
const { en1 } = require('./fe/entrenamiento1.js')
const { en2 } = require('./fe/entrenamiento2.js')
const { clasificacion } = require('./fe/clasificacion.js')
const { final } = require('./fe/final.js')
const { pilotos } = require('./fe/pilotos.js');


// 1° ENTRENAMIENTO
router.get('/en1/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const datos = await en1();
        if (indice < datos.length) {
            res.send(datos[indice]);
        } else {
            res.status(404).json({ error: 'No se encontró el índice especificado' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del array ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del array ${indice}` });
    }
});

// 2° ENTRENAMIENTO
router.get('/en2/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const datos = await en2();
        if (indice < datos.length) {
            res.send(datos[indice]);
        } else {
            res.status(404).json({ error: 'No se encontró el índice especificado' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del array ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del array ${indice}` });
    }
});



// CLASIFICACION (Q1)
router.get('/clasificacion/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const datos = await clasificacion();
        if (indice < datos.length) {
            res.send(datos[indice]);
        } else {
            res.status(404).json({ error: 'No se encontró el índice especificado' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del array ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del array ${indice}` });
    }
});


// 6° FINAL (RACE)
router.get('/final/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const datos = await final();
        if (indice < datos.length) {
            res.send(datos[indice]);
        } else {
            res.status(404).json({ error: 'No se encontró el índice especificado' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del array ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del array ${indice}` });
    }
});


// PILOTOS
router.get('/pilotos/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const datos = await pilotos();
        if (indice < datos.length) {
            res.send(datos[indice]);
        } else {
            res.status(404).json({ error: 'No se encontró el índice especificado' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del array ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del array ${indice}` });
    }
  });
  module.exports = router;
