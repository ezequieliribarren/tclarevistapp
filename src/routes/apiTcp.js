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
const { obtenerYMostrarDatos } = require('./tcp/horarios.js');
const { pilotos } = require('./tcp/pilotos.js');
const { sheets, menu } = require('./tcp/menu.js');


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

  // 4° ENTRENAMIENTO
  router.get('/en4/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
      const datos = await en4();
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

  // 5° ENTRENAMIENTO
  router.get('/en5/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
      const datos = await en5();
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

  // 6° ENTRENAMIENTO
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

// 1° SERIE
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

// 2° SERIE
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

// 6° FINAL
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

// HORARIOS
router.get('/horarios/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const datos = await horarios();
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


  router.get('/menu/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
      const datos = await menu();
      if (indice < datos.length) {
          res.json(datos[indice]);
      } else {
          res.status(404).json({ error: 'No se encontró el índice especificado' });
      }
    } catch (error) {
      console.error(`Error al obtener los resultados del array ${indice}:`, error);
      res.status(500).json({ error: `Error al obtener los resultados del array ${indice}` });
    }
  });
  module.exports = router;
