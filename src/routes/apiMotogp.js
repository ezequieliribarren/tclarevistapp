const express = require('express');
const router = express.Router();
const fsPromises = require('fs').promises;
const { en1 } = require('./motogp/entrenamiento1.js')
const { en2 } = require('./motogp/entrenamiento2.js')
const { en6 } = require('./motogp/entrenamiento6.js')
const { clasificacion } = require('./motogp/clasificacion.js')
const { serie1 } = require('./motogp/serie1.js')
const { serie2 } = require('./motogp/serie2.js')
const { serie3 } = require('./motogp/serie3.js')
const { final } = require('./motogp/final.js')
const { pilotos } = require('./motogp/pilotos.js');
const { menu } = require('./motogp/menu.js');


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


// 6° ENTRENAMIENTO (CLASIFICACION PR)
router.get('/en6/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const datos = await en6();
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

// 1° SERIE (Q2)
router.get('/serie1/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const datos = await serie1();
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

// 2° SERIE (SPRINT)
router.get('/serie2/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const datos = await serie2();
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

// 3° SERIE (WUP)
router.get('/serie3/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const datos = await serie3();
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

// MENU
// router.get('/menu', async (req, res) => {
//     try {
//       const datos = await menu();
//       res.json(datos);
//     } catch (error) {
//       console.error('Error al obtener y mostrar el menú:', error);
//       res.status(500).json({ error: 'Error al obtener y mostrar el menú' });
//     }
// });



  module.exports = router;
