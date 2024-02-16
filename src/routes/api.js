const express = require('express');
const router = express.Router();
const fsPromises = require('fs').promises;
const campeonatos = require('./campeonatos.js');
const { obtenerYMostrarDatos } = require('./horariosActc.js');


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
  router.get('/campeonatos', async (req, res) => {
    try {
      const campeonatosData = await campeonatos();
      res.send(campeonatosData);
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