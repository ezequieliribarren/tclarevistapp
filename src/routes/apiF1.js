const express = require('express');
const router = express.Router();
const fsPromises = require('fs').promises;
const { en1 } = require('./f1/entrenamiento1.js');
const { en2 } = require('./f1/entrenamiento2.js');
const { en3 } = require('./f1/entrenamiento3.js');
const { clasificacion } = require('./f1/clasificacion.js');
const { sprint } = require('./f1/sprint.js');
const { final } = require('./f1/final.js');
const { pilotos } = require('./f1/pilotos.js');
const { menu } = require('./f1/menu.js');
// VIVO
const { en1V } = require('./f1/f1/entrenamiento1.js')
const { en2V } = require('./f1/f1/entrenamiento2.js')
const { en3V } = require('./f1/f1/entrenamiento3.js')
const { clasificacionV } = require('./f1/f1/clasificacion.js')
const { sprintV } = require('./f1/f1/sprint.js')
const { finalV } = require('./f1/f1/final.js');
const { pilotosV } = require('./f1/f1/pilotos.js');
const { menuV } = require('./f1/f1/menu.js');


const path = require('path'); // Importación del módulo path
const cron = require('node-cron');
const jsonFilePath1 = path.join(__dirname, 'f1', 'en1.json');
const jsonFilePath2 = path.join(__dirname, 'f1', 'en2.json');
const jsonFilePath3 = path.join(__dirname, 'f1', 'en3.json');
const jsonFilePathClasificacion = path.join(__dirname, 'f1', 'clasificacion.json');
const jsonFilePathSprint= path.join(__dirname, 'f1', 'sprint.json');
const jsonFilePathFinal= path.join(__dirname, 'f1', 'final.json');
const jsonFilePathPilotos= path.join(__dirname, 'f1', 'pilotos.json');


// JSON
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
// SPRINT
router.get('/serie3/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePathSprint, 'utf-8');
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
// MENU
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
async function realizarScrapeYGuardarClasificacion() {
    try {
        const datos = await clasificacion();
        await fsPromises.writeFile(jsonFilePathClasificacion, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en3.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en3.json:', error);
    }
}
async function realizarScrapeYGuardarSprint() {
    try {
        const datos = await sprint();
        await fsPromises.writeFile(jsonFilePathSprint, JSON.stringify(datos, null, 2), 'utf-8');
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


cron.schedule('45 04 * * *', async () => {
    try {
        await realizarScrapeYGuardar();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
});
cron.schedule('46 04 * * *', async () => {
    try {
        await realizarScrapeYGuardar2();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
});
cron.schedule('47 04 * * *', async () => {
    try {
        await realizarScrapeYGuardar3();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
});
cron.schedule('48 04 * * *', async () => {
    try {
        await realizarScrapeYGuardarClasificacion();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
});
cron.schedule('49 04 * * *', async () => {
    try {
        await realizarScrapeYGuardarSprint();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
});
cron.schedule('50 04 * * *', async () => {
    try {
        await realizarScrapeYGuardarFinal();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
});
cron.schedule('51 04 * * *', async () => {
    try {
        await realizarScrapeYGuardarPilotos();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
});


// VIVO
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

// SPRINT
router.get('/serie3/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const datos = await sprintV();
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

// MENU
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