const express = require('express');
const router = express.Router();
const fsPromises = require('fs').promises;
const campeonatos = require('./campeonatos.js');
const { obtenerYMostrarDatos } = require('./horariosActc.js');
const copaDeOro = require('./copaDeOro.js');
const campeonatoTc2000 = require('./campeonatoTc2000.js');
const campeonatoRallyArgentino = require ('./campeonatoRallyArgentino.js')


// API TODAS LAS NOTICIAS
router.get('/noticias', async (req, res) => {
    try {
      const noticiasData = await fsPromises.readFile('src/noticias.json', 'utf-8');
      const noticias = JSON.parse(noticiasData);
      res.json(noticias);
    } catch (error) {
      console.error('Error al obtener noticias:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });


  // API CAMPEONATOS
  router.get('/campeonatos/:categoria', async (req, res) => {
    const categoria = req.params.categoria.toLowerCase(); // Convierte la categoría a minúsculas para que sea insensible a mayúsculas/minúsculas
    try {
        const datos = await campeonatos();
        if (categoria in datos) {
            res.send(datos[categoria]);
        } else {
            res.status(404).json({ error: 'No se encontró la categoría especificada' });
        }
    } catch (error) {
        console.error('Error al realizar scraping:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// API CAMPEONATO TC2000
router.get('/campeonato/tc2000', async (req, res) => {
  try {
    const datos = await campeonatoTc2000();
    res.json(datos);
  } catch (error) {
    console.error('Error al obtener datos del campeonato TC2000:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// API CAMPEONATO RALLY ARGENTINO
router.get('/campeonato/rally-argentino', async (req, res) => {
  try {
    const datos = await campeonatoRallyArgentino();
    res.json(datos);
  } catch (error) {
    console.error('Error al obtener datos del campeonato TC2000:', error);
    res.status(500).send('Error interno del servidor');
  }
});


  // API COPA DE ORO
router.get('/copa-de-oro/:categoria', async (req, res) => {
  const categoria = req.params.categoria.toLowerCase(); // Convierte la categoría a minúsculas para que sea insensible a mayúsculas/minúsculas
  try {
      const datos = await copaDeOro();
      if (categoria in datos) {
          res.send(datos[categoria]);
      } else {
          res.status(404).json({ error: 'No se encontró la categoría especificada' });
      }
  } catch (error) {
      console.error('Error al realizar scraping:', error);
      res.status(500).send('Error interno del servidor');
  }
});


  // API HORARIOS
  // 1° ENTRENAMIENTO
router.get('/horarios', async (req, res) => {
  try {
    // Obtén los datos completos
    const datos = await obtenerYMostrarDatos();
    
    // Envía los resultados filtrados como respuesta JSON
    res.send(datos);
  } catch (error) {
    console.error('Error al obtener los resultados del primer entrenamiento:', error);
    res.status(500).json({ error: 'Error al obtener los resultados del primer entrenamiento' });
  }
});


  


module.exports = router;