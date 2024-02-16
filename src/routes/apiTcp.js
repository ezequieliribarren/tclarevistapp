const express = require('express');
const router = express.Router();
const fsPromises = require('fs').promises;
const {en1} = require ('./tcp/entrenamiento1.js')
const {en2} = require ('./tcp/entrenamiento2.js')
const {en3} = require ('./tcp/entrenamiento3.js')
const {en4} = require ('./tcp/entrenamiento4.js')
const {en5} = require ('./tcp/entrenamiento5.js')
const {en6} = require ('./tcp/entrenamiento6.js')
const {clasificacion} = require ('./tcp/clasificacion.js')
const {serie1} = require ('./tcp/serie1.js')
const {serie2} = require ('./tcp/serie2.js')
const {final} = require ('./tcp/final.js')

// 1° ENTRENAMIENTO
router.get('/restcp/en1', async (req, res) => {
    try {
      // Obtén los datos completos
      const datos = await en1();
      
      // Envía los resultados filtrados como respuesta JSON
      res.send(datos);
    } catch (error) {
      console.error('Error al obtener los resultados del primer entrenamiento:', error);
      res.status(500).json({ error: 'Error al obtener los resultados del primer entrenamiento' });
    }
  });

// 2° ENTRENAMIENTO
router.get('/restcp/en2', async (req, res) => {
    try {
      // Obtén los datos completos
      const datos = await en2();
      
      // Envía los resultados filtrados como respuesta JSON
      res.send(datos);
    } catch (error) {
      console.error('Error al obtener los resultados del primer entrenamiento:', error);
      res.status(500).json({ error: 'Error al obtener los resultados del primer entrenamiento' });
    }
  });

  // 3° ENTRENAMIENTO
router.get('/restcp/en3', async (req, res) => {
    try {
      // Obtén los datos completos
      const datos = await en3();
      
      // Envía los resultados filtrados como respuesta JSON
      res.send(datos);
    } catch (error) {
      console.error('Error al obtener los resultados del primer entrenamiento:', error);
      res.status(500).json({ error: 'Error al obtener los resultados del primer entrenamiento' });
    }
  });

  // 4° ENTRENAMIENTO
router.get('/restcp/en4', async (req, res) => {
    try {
      // Obtén los datos completos
      const datos = await en4();
      
      // Envía los resultados filtrados como respuesta JSON
      res.send(datos);
    } catch (error) {
      console.error('Error al obtener los resultados del primer entrenamiento:', error);
      res.status(500).json({ error: 'Error al obtener los resultados del primer entrenamiento' });
    }
  });

  // 5° ENTRENAMIENTO
router.get('/restcp/en5', async (req, res) => {
    try {
      // Obtén los datos completos
      const datos = await en5();
      
      // Envía los resultados filtrados como respuesta JSON
      res.send(datos);
    } catch (error) {
      console.error('Error al obtener los resultados del primer entrenamiento:', error);
      res.status(500).json({ error: 'Error al obtener los resultados del primer entrenamiento' });
    }
  });

  // 6° ENTRENAMIENTO
router.get('/restcp/en6', async (req, res) => {
    try {
      // Obtén los datos completos
      const datos = await en6();
      
      // Envía los resultados filtrados como respuesta JSON
      res.send(datos);
    } catch (error) {
      console.error('Error al obtener los resultados del primer entrenamiento:', error);
      res.status(500).json({ error: 'Error al obtener los resultados del primer entrenamiento' });
    }
  });

// CLASIFICACION
router.get('/restcp/clasificacion', async (req, res) => {
  try {
    // Obtén los datos completos
    const datos = await clasificacion();
    
    // Envía los resultados filtrados como respuesta JSON
    res.send(datos);
  } catch (error) {
    console.error('Error al obtener los resultados del primer entrenamiento:', error);
    res.status(500).json({ error: 'Error al obtener los resultados del primer entrenamiento' });
  }
});

// 1° SERIE
    router.get('/restcp/serie1', async (req, res) => {
      try {
        // Obtén los datos completos
        const datos = await serie1();
        
        // Envía los resultados filtrados como respuesta JSON
        res.send(datos);
      } catch (error) {
        console.error('Error al obtener los resultados del primer entrenamiento:', error);
        res.status(500).json({ error: 'Error al obtener los resultados del primer entrenamiento' });
      }
    });

// 2° SERIE
router.get('/restcp/serie2', async (req, res) => {
  try {
    // Obtén los datos completos
    const datos = await serie2();
    
    // Envía los resultados filtrados como respuesta JSON
    res.send(datos);
  } catch (error) {
    console.error('Error al obtener los resultados del primer entrenamiento:', error);
    res.status(500).json({ error: 'Error al obtener los resultados del primer entrenamiento' });
  }
});

// 6° FINAL
    router.get('/restcp/final', async (req, res) => {
      try {
        // Obtén los datos completos
        const datos = await final();
        
        // Envía los resultados filtrados como respuesta JSON
        res.send(datos);
      } catch (error) {
        console.error('Error al obtener los resultados del primer entrenamiento:', error);
        res.status(500).json({ error: 'Error al obtener los resultados del primer entrenamiento' });
      }
    });
  






  

  module.exports = router;
