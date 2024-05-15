const express = require('express');
const router = express.Router();
const { p1 } = require('./rally/p1.js');
const { p2 } = require('./rally/p2.js');
const { p3 } = require('./rally/p3.js');
const { p4 } = require('./rally/p4.js');
const { p5 } = require('./rally/p5.js');
const { p6 } = require('./rally/p6.js');
const { p7 } = require('./rally/p7.js');
const { p8 } = require('./rally/p8.js');
const { p9 } = require('./rally/p9.js');
const { p10 } = require('./rally/p10.js');
const { p11 } = require('./rally/p11.js');
const { p12 } = require('./rally/p12.js');
const { p13 } = require('./rally/p13.js');
const { p14 } = require('./rally/p14.js');
const { p15 } = require('./rally/p15.js');
const { p16 } = require('./rally/p16.js');
const { shake } = require('./rally/shake.js');


// SHAKE
router.get('/shake/:indice', async (req, res) => {
  const indice = parseInt(req.params.indice);

  try {
    const datos = await shake();

    
    // Verificar si el índice es válido
    if (datos && datos.length > indice) {
        res.json(datos[indice]);
    } else {
        res.status(404).json({ error: 'No se encontró el índice especificado' });
    }
  } catch (error) {
    console.error(`Error al obtener los resultados del índice ${indice}:`, error);
    res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
  }
});

// P1
router.get('/p1/:indice', async (req, res) => {
  const indice = parseInt(req.params.indice);

  try {
    const datos = await p1();

    
    // Verificar si el índice es válido
    if (datos && datos.length > indice) {
        res.json(datos[indice]);
    } else {
        res.status(404).json({ error: 'No se encontró el índice especificado' });
    }
  } catch (error) {
    console.error(`Error al obtener los resultados del índice ${indice}:`, error);
    res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
  }
});

// P2
router.get('/p2/:indice', async (req, res) => {
  const indice = parseInt(req.params.indice);

  try {
    const datos = await p2();

    
    // Verificar si el índice es válido
    if (datos && datos.length > indice) {
        res.json(datos[indice]);
    } else {
        res.status(404).json({ error: 'No se encontró el índice especificado' });
    }
  } catch (error) {
    console.error(`Error al obtener los resultados del índice ${indice}:`, error);
    res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
  }
});

// P3
router.get('/p3/:indice', async (req, res) => {
  const indice = parseInt(req.params.indice);

  try {
    const datos = await p3();

    
    // Verificar si el índice es válido
    if (datos && datos.length > indice) {
        res.json(datos[indice]);
    } else {
        res.status(404).json({ error: 'No se encontró el índice especificado' });
    }
  } catch (error) {
    console.error(`Error al obtener los resultados del índice ${indice}:`, error);
    res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
  }
});

// P4
router.get('/p4/:indice', async (req, res) => {
  const indice = parseInt(req.params.indice);

  try {
    const datos = await p4();

    
    // Verificar si el índice es válido
    if (datos && datos.length > indice) {
        res.json(datos[indice]);
    } else {
        res.status(404).json({ error: 'No se encontró el índice especificado' });
    }
  } catch (error) {
    console.error(`Error al obtener los resultados del índice ${indice}:`, error);
    res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
  }
});

// P5
router.get('/p5/:indice', async (req, res) => {
  const indice = parseInt(req.params.indice);

  try {
    const datos = await p5();

    
    // Verificar si el índice es válido
    if (datos && datos.length > indice) {
        res.json(datos[indice]);
    } else {
        res.status(404).json({ error: 'No se encontró el índice especificado' });
    }
  } catch (error) {
    console.error(`Error al obtener los resultados del índice ${indice}:`, error);
    res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
  }
});

// P6
router.get('/p6/:indice', async (req, res) => {
  const indice = parseInt(req.params.indice);

  try {
    const datos = await p6();

    
    // Verificar si el índice es válido
    if (datos && datos.length > indice) {
        res.json(datos[indice]);
    } else {
        res.status(404).json({ error: 'No se encontró el índice especificado' });
    }
  } catch (error) {
    console.error(`Error al obtener los resultados del índice ${indice}:`, error);
    res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
  }
});

// P7
router.get('/p7/:indice', async (req, res) => {
  const indice = parseInt(req.params.indice);

  try {
    const datos = await p7();

    
    // Verificar si el índice es válido
    if (datos && datos.length > indice) {
        res.json(datos[indice]);
    } else {
        res.status(404).json({ error: 'No se encontró el índice especificado' });
    }
  } catch (error) {
    console.error(`Error al obtener los resultados del índice ${indice}:`, error);
    res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
  }
});

// P8
router.get('/p8/:indice', async (req, res) => {
  const indice = parseInt(req.params.indice);

  try {
    const datos = await p8();

    
    // Verificar si el índice es válido
    if (datos && datos.length > indice) {
        res.json(datos[indice]);
    } else {
        res.status(404).json({ error: 'No se encontró el índice especificado' });
    }
  } catch (error) {
    console.error(`Error al obtener los resultados del índice ${indice}:`, error);
    res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
  }
});

// P9
router.get('/p9/:indice', async (req, res) => {
  const indice = parseInt(req.params.indice);

  try {
    const datos = await p9();

    
    // Verificar si el índice es válido
    if (datos && datos.length > indice) {
        res.json(datos[indice]);
    } else {
        res.status(404).json({ error: 'No se encontró el índice especificado' });
    }
  } catch (error) {
    console.error(`Error al obtener los resultados del índice ${indice}:`, error);
    res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
  }
});

// P10
router.get('/p10/:indice', async (req, res) => {
  const indice = parseInt(req.params.indice);

  try {
    const datos = await p10();

    
    // Verificar si el índice es válido
    if (datos && datos.length > indice) {
        res.json(datos[indice]);
    } else {
        res.status(404).json({ error: 'No se encontró el índice especificado' });
    }
  } catch (error) {
    console.error(`Error al obtener los resultados del índice ${indice}:`, error);
    res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
  }
});

// P11
router.get('/p11/:indice', async (req, res) => {
  const indice = parseInt(req.params.indice);

  try {
    const datos = await p11();

    
    // Verificar si el índice es válido
    if (datos && datos.length > indice) {
        res.json(datos[indice]);
    } else {
        res.status(404).json({ error: 'No se encontró el índice especificado' });
    }
  } catch (error) {
    console.error(`Error al obtener los resultados del índice ${indice}:`, error);
    res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
  }
});

// P12
router.get('/p12/:indice', async (req, res) => {
  const indice = parseInt(req.params.indice);

  try {
    const datos = await p12();

    
    // Verificar si el índice es válido
    if (datos && datos.length > indice) {
        res.json(datos[indice]);
    } else {
        res.status(404).json({ error: 'No se encontró el índice especificado' });
    }
  } catch (error) {
    console.error(`Error al obtener los resultados del índice ${indice}:`, error);
    res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
  }
});

// P13
router.get('/13/:indice', async (req, res) => {
  const indice = parseInt(req.params.indice);

  try {
    const datos = await p13();

    
    // Verificar si el índice es válido
    if (datos && datos.length > indice) {
        res.json(datos[indice]);
    } else {
        res.status(404).json({ error: 'No se encontró el índice especificado' });
    }
  } catch (error) {
    console.error(`Error al obtener los resultados del índice ${indice}:`, error);
    res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
  }
});

// P14
router.get('/p14/:indice', async (req, res) => {
  const indice = parseInt(req.params.indice);

  try {
    const datos = await p14();

    
    // Verificar si el índice es válido
    if (datos && datos.length > indice) {
        res.json(datos[indice]);
    } else {
        res.status(404).json({ error: 'No se encontró el índice especificado' });
    }
  } catch (error) {
    console.error(`Error al obtener los resultados del índice ${indice}:`, error);
    res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
  }
});

// P15
router.get('/p15/:indice', async (req, res) => {
  const indice = parseInt(req.params.indice);

  try {
    const datos = await p15();

    
    // Verificar si el índice es válido
    if (datos && datos.length > indice) {
        res.json(datos[indice]);
    } else {
        res.status(404).json({ error: 'No se encontró el índice especificado' });
    }
  } catch (error) {
    console.error(`Error al obtener los resultados del índice ${indice}:`, error);
    res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
  }
});

// P16
router.get('/p16/:indice', async (req, res) => {
  const indice = parseInt(req.params.indice);

  try {
    const datos = await p16();

    
    // Verificar si el índice es válido
    if (datos && datos.length > indice) {
        res.json(datos[indice]);
    } else {
        res.status(404).json({ error: 'No se encontró el índice especificado' });
    }
  } catch (error) {
    console.error(`Error al obtener los resultados del índice ${indice}:`, error);
    res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
  }
});



module.exports = router;
