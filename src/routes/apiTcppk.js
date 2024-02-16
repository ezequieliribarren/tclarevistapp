const express = require('express');
const router = express.Router();
const fsPromises = require('fs').promises;
const {en1} = require ('./tcppk/entrenamiento1.js')
const {en2} = require ('./tcppk/entrenamiento2.js')
const {en3} = require ('./tcppk/entrenamiento3.js')
const {en4} = require ('./tcppk/entrenamiento4.js')
const {en5} = require ('./tcppk/entrenamiento5.js')
const {en6} = require ('./tcppk/entrenamiento6.js')
const {clasificacion} = require ('./tcppk/clasificacion.js')
const {serie1} = require ('./tcppk/serie1.js')
const {serie2} = require ('./tcppk/serie2.js')
const {final} = require ('./tcppk/final.js')

// 1° ENTRENAMIENTO
router.get('/restcppk/en1', async (req, res) => {
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
router.get('/restcppk/en2', async (req, res) => {
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
router.get('/restcppk/en3', async (req, res) => {
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
router.get('/restcppk/en4', async (req, res) => {
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
router.get('/restcppk/en5', async (req, res) => {
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
router.get('/restcppk/en6', async (req, res) => {
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
router.get('/restcppk/clasificacion', async (req, res) => {
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
    router.get('/restcppk/serie1', async (req, res) => {
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
router.get('/restcppk/serie2', async (req, res) => {
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

// FINAL
    router.get('/restcppk/final', async (req, res) => {
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
