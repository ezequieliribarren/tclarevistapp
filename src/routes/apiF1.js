const express = require('express');
const router = express.Router();
const fsPromises = require('fs').promises;
const {en1} = require ('./f1/entrenamiento1.js')
const {en2} = require ('./f1/entrenamiento2.js')
const {en3} = require ('./f1/entrenamiento3.js')
const {clasificacion} = require ('./f1/clasificacion.js')
const {sprint} = require ('./f1/sprint.js')
const {final} = require ('./f1/final.js')


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

// 3° ENTRENAMIENTO
router.get('/en3/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const datos = await en3();
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

// CLASIFICACION
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


// SPRINT
router.get('/sprint/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
      const datos = await sprint();
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
  
  // FINAL
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

  module.exports = router;