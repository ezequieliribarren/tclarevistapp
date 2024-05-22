const express = require('express');
const router = express.Router();
const fsPromises = require('fs').promises;
const {en1} = require ('./tn3/en1.js');
const { en2 } = require('./tn3/en2.js');
const { en3 } = require('./tn3/en3.js');
const { en5 } = require('./tn3/en5.js');
const { en6 } = require('./tn3/en6.js');
const { clasificacion } = require('./tn3/clasificacion.js');
const { serie1 } = require('./tn3/serie1.js');
const { serie2 } = require('./tn3/serie2.js');
const { serie3 } = require('./tn3/serie3.js');
const { final } = require('./tn3/final.js');


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

// 3° SERIE
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

  
  module.exports = router;