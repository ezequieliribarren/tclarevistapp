const express = require('express');
const router = express.Router();
const fsPromises = require('fs').promises;
const campeonatos = require('./campeonatos.js');
const { obtenerYMostrarDatos } = require('./horariosActc.js');
const copaDeOro = require('./copaDeOro.js');
const campeonatoTc2000 = require('./campeonatoTc2000.js');
const campeonatoRallyArgentino = require ('./campeonatoRallyArgentino.js')
const { extraerDatosF1 } = require('./campeonatoF1');
const { extraerDatosMotoGp } = require('./campeonatoMotoGp.js');
const { extraerDatosIndycar } = require('./campeonatoIndycar.js');
const { extraerDatosFE } = require('./campeonatoFE.js');
const { extraerDatosWRC } = require('./campeonatoWRC.js');
const { extraerDatosNascar } = require('./campeonatoNascar.js');
const { extraerDatosTP, obtenerUrlsTP } = require('./campeonatoTP.js');

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

// API TP C
router.get('/campeonato/tp', async (req, res) => {
  try {
      // Obtener URLs de TP
      const urlsTP = await obtenerUrlsTP();

      // Objeto para almacenar los datos de todas las clases
      const datosTP = {};

      // Iterar sobre las URLs y extraer los datos
      for (let i = 0; i < urlsTP.length; i++) {
          const url = urlsTP[i];
          let clase;

          // Asignar clase basada en el índice
          if (i === 0) clase = 3;
          else if (i === 1) clase = 2;
          else if (i === 2) clase = 1;

          // Extraer datos de la URL actual
          const datos = await extraerDatosTP(url);

          // Agregar datos al objeto utilizando la clase como clave
          datosTP[`clase${clase}`] = datos;
      }

      // Devolver los datos como respuesta
      res.json(datosTP);
  } catch (error) {
      console.error('Error al obtener datos de TP:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});



// API F1
router.get('/campeonato/f1', async (req, res) => {
  try {
      // Extraer los datos de la Fórmula 1
      const data = await extraerDatosF1();
      
      // Devolver los datos como respuesta
      res.json(data);
  } catch (error) {
      // Manejar errores
      console.error('Error al obtener los datos de la Fórmula 1:', error);
      res.status(500).json({ error: 'Error al obtener los datos de la Fórmula 1' });
  }
});

// API MOTO-GP
router.get('/campeonato/moto-gp', async (req, res) => {
  try {
      // Extraer los datos de la Fórmula 1
      const data = await extraerDatosMotoGp();
      
      // Devolver los datos como respuesta
      res.json(data);
  } catch (error) {
      // Manejar errores
      console.error('Error al obtener los datos de la Fórmula 1:', error);
      res.status(500).json({ error: 'Error al obtener los datos de la Fórmula 1' });
  }
});

// API INDYCAR
router.get('/campeonato/indycar-series', async (req, res) => {
  try {
      // Extraer los datos de la Fórmula 1
      const data = await extraerDatosIndycar();
      
      // Devolver los datos como respuesta
      res.json(data);
  } catch (error) {
      // Manejar errores
      console.error('Error al obtener los datos de la Fórmula 1:', error);
      res.status(500).json({ error: 'Error al obtener los datos de la Fórmula 1' });
  }
});

// API FORMULA E
router.get('/campeonato/formula-e', async (req, res) => {
  try {
      // Extraer los datos de la Fórmula 1
      const data = await extraerDatosFE();
      
      // Devolver los datos como respuesta
      res.json(data);
  } catch (error) {
      // Manejar errores
      console.error('Error al obtener los datos de la Fórmula 1:', error);
      res.status(500).json({ error: 'Error al obtener los datos de la Fórmula 1' });
  }
});

// API WRC
router.get('/campeonato/rally-mundial', async (req, res) => {
  try {
      // Extraer los datos de la Fórmula 1
      const data = await extraerDatosWRC();
      
      // Devolver los datos como respuesta
      res.json(data);
  } catch (error) {
      // Manejar errores
      console.error('Error al obtener los datos de la Fórmula 1:', error);
      res.status(500).json({ error: 'Error al obtener los datos de la Fórmula 1' });
  }
});

// API NASCAR
router.get('/campeonato/nascar', async (req, res) => {
  try {
      // Extraer los datos de la Fórmula 1
      const data = await extraerDatosNascar();
      
      // Devolver los datos como respuesta
      res.json(data);
  } catch (error) {
      // Manejar errores
      console.error('Error al obtener los datos de la Fórmula 1:', error);
      res.status(500).json({ error: 'Error al obtener los datos de la Fórmula 1' });
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