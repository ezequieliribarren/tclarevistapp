const express = require('express');
const router = express.Router();
const fsPromises = require('fs').promises;
const {en1} = require ('./tcppk/entrenamiento1.js')
const {en2} = require ('./tcppk/entrenamiento2.js')
const {en3} = require ('./tcppk/entrenamiento3.js')
const {en4} = require ('./tcppk/entrenamiento4.js')
const {clasificacion} = require ('./tcppk/clasificacion.js')
const {final} = require ('./tcppk/final.js')
const { horarios } = require('./tcppk/horarios.js');
const { pilotos } = require('./tcppk/pilotos.js');
const { menu } = require('./tcppk/menu.js');
const path = require('path'); // Importación del módulo path
const cron = require('node-cron');

// VIVO
const {en1V} = require ('./tcppk/tcppk/entrenamiento1.js')
const {en2V} = require ('./tcppk/tcppk/entrenamiento2.js')
const {en3V} = require ('./tcppk/tcppk/entrenamiento3.js')
const {en4V} = require ('./tcppk/tcppk/entrenamiento4.js')
const {en5V} = require ('./tcppk/tcppk/entrenamiento5.js')
const {en6V} = require ('./tcppk/tcppk/entrenamiento6.js')
const {clasificacionV} = require ('./tcppk/tcppk/clasificacion.js')
const {serie1V} = require ('./tcppk/tcppk/serie1.js')
const {serie2V} = require ('./tcppk/tcppk/serie2.js')
const {finalV} = require ('./tcppk/tcppk/final.js')
const { horariosV } = require('./tcppk/tcppk/horarios.js');
const { pilotosV } = require('./tcppk/tcppk/pilotos.js');
const { menuV } = require('./tcppk/tcppk/menu.js');


const jsonFilePath1 = path.join(__dirname, 'tcppk', 'en1.json');
const jsonFilePath2 = path.join(__dirname, 'tcppk', 'en2.json');
const jsonFilePath3 = path.join(__dirname, 'tcppk', 'en3.json');
const jsonFilePath4 = path.join(__dirname, 'tcppk', 'en4.json');
const jsonFilePathClasificacion = path.join(__dirname, 'tcppk', 'clasificacion.json');
const jsonFilePathFinal= path.join(__dirname, 'tcppk', 'final.json');
const jsonFilePathPilotos= path.join(__dirname, 'tcppk', 'pilotos.json');
const jsonFilePathHorarios= path.join(__dirname, 'tcppk', 'horarios.json');


// 1° ENTRENAMIENTO
router.get('/en1/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePath1, 'utf-8');
        const datos = JSON.parse(data);
        if (indice < datos.length) {
            res.send(datos[indice]);
        } else {
            res.status(404).json({ error: 'No se encontró el índice especificado' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// 2° ENTRENAMIENTO
router.get('/en2/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePath2, 'utf-8');
        const datos = JSON.parse(data);
        if (indice < datos.length) {
            res.send(datos[indice]);
        } else {
            res.status(404).json({ error: 'No se encontró el índice especificado' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// 3° ENTRENAMIENTO
router.get('/en3/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePath3, 'utf-8');
        const datos = JSON.parse(data);
        if (indice < datos.length) {
            res.send(datos[indice]);
        } else {
            res.status(404).json({ error: 'No se encontró el índice especificado' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// 4° ENTRENAMIENTO
router.get('/en4/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePath4, 'utf-8');
        const datos = JSON.parse(data);
        if (indice < datos.length) {
            res.send(datos[indice]);
        } else {
            res.status(404).json({ error: 'No se encontró el índice especificado' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// CLASIFICACION
router.get('/clasificacion/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePathClasificacion, 'utf-8');
        const datos = JSON.parse(data);
        if (indice < datos.length) {
            res.send(datos[indice]);
        } else {
            res.status(404).json({ error: 'No se encontró el índice especificado' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// FINAL
router.get('/final/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePathFinal, 'utf-8');
        const datos = JSON.parse(data);
        if (indice < datos.length) {
            res.send(datos[indice]);
        } else {
            res.status(404).json({ error: 'No se encontró el índice especificado' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// PILOTOS
router.get('/pilotos/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePathPilotos, 'utf-8');
        const datos = JSON.parse(data);
        if (indice < datos.length) {
            res.send(datos[indice]);
        } else {
            res.status(404).json({ error: 'No se encontró el índice especificado' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// HORARIOS
router.get('/horarios/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePathHorarios, 'utf-8');
        const datos = JSON.parse(data);
        if (indice < datos.length) {
            res.send(datos[indice]);
        } else {
            res.status(404).json({ error: 'No se encontró el índice especificado' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});


async function realizarScrapeYGuardar() {
    try {
        const datos = await en1();
        await fsPromises.writeFile(jsonFilePath1, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en1.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  }
async function realizarScrapeYGuardar2() {
    try {
        const datos = await en2();
        await fsPromises.writeFile(jsonFilePath2, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en2.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en2.json:', error);
    }
}
async function realizarScrapeYGuardar3() {
    try {
        const datos = await en3();
        await fsPromises.writeFile(jsonFilePath3, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en3.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en3.json:', error);
    }
}
async function realizarScrapeYGuardar4() {
    try {
        const datos = await en4();
        await fsPromises.writeFile(jsonFilePath4, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en3.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en3.json:', error);
    }
}
async function realizarScrapeYGuardarClasificacion() {
    try {
        const datos = await clasificacion();
        await fsPromises.writeFile(jsonFilePathClasificacion, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en3.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en3.json:', error);
    }
}
async function realizarScrapeYGuardarFinal() {
    try {
        const datos = await final();
        await fsPromises.writeFile(jsonFilePathFinal, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en3.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en3.json:', error);
    }
}
async function realizarScrapeYGuardarPilotos() {
    try {
        const datos = await pilotos();
        await fsPromises.writeFile(jsonFilePathPilotos, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en3.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en3.json:', error);
    }
}
async function realizarScrapeYGuardarHorarios() {
    try {
        const datos = await horarios();
        await fsPromises.writeFile(jsonFilePathHorarios, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en3.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en3.json:', error);
    }
}



  cron.schedule('00 01 * * *', async () => {
    try {
        await realizarScrapeYGuardar();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
  cron.schedule('01 01 * * *', async () => {
    try {
        await realizarScrapeYGuardar2();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
  cron.schedule('02 01 * * *', async () => {
    try {
        await realizarScrapeYGuardar3();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
  cron.schedule('03 01 * * *', async () => {
    try {
        await realizarScrapeYGuardar4();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
  cron.schedule('04 01 * * *', async () => {
    try {
        await realizarScrapeYGuardarClasificacion();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
  cron.schedule('05 01 * * *', async () => {
    try {
        await realizarScrapeYGuardarFinal();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
  cron.schedule('06 01 * * *', async () => {
    try {
        await realizarScrapeYGuardarPilotos();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
  cron.schedule('07 01 * * *', async () => {
    try {
        await realizarScrapeYGuardarHorarios();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });

//   MENU
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

//   VIVO
// 1° ENTRENAMIENTO
router.get('/en1/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
      const datos = await en1V();
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
  router.get('/en2/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
      const datos = await en2V();
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
    router.get('/en3/vivo/:indice', async (req, res) => {
      const indice = parseInt(req.params.indice);
      try {
        const datos = await en3V();
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
    router.get('/en4/vivo/:indice', async (req, res) => {
      const indice = parseInt(req.params.indice);
      try {
        const datos = await en4V();
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
    router.get('/en5/vivo/:indice', async (req, res) => {
      const indice = parseInt(req.params.indice);
      try {
        const datos = await en5V();
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
    router.get('/en6/vivo/:indice', async (req, res) => {
      const indice = parseInt(req.params.indice);
      try {
        const datos = await en6V();
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
  router.get('/clasificacion/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
      const datos = await clasificacionV();
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
  router.get('/serie1/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
      const datos = await serie1V();
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
  router.get('/serie2/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
      const datos = await serie2V();
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
  router.get('/final/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const datos = await finalV();
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
  router.get('/horarios/vivo/:indice', async (req, res) => {
      const indice = parseInt(req.params.indice);
      try {
          const datos = await horariosV();
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
  
  router.get('/pilotos/vivo/:indice', async (req, res) => {
      const indice = parseInt(req.params.indice);
      try {
          const datos = await pilotosV();
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
    router.get('/menu/vivo/:indice', async (req, res) => {
      const indice = parseInt(req.params.indice);
      try {
        const datos = await menuV();
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
