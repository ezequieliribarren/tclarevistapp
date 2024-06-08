const express = require('express');
const router = express.Router();
const fsPromises = require('fs').promises;
const { en1 } = require('./fe/entrenamiento1.js')
const { en2 } = require('./fe/entrenamiento2.js')
const { clasificacion } = require('./fe/clasificacion.js')
const { final } = require('./fe/final.js')
const { pilotos } = require('./fe/pilotos.js');
const path = require('path'); // Importación del módulo path
const cron = require('node-cron');

const jsonFilePath1 = path.join(__dirname, 'fe', 'en1.json');
const jsonFilePath2 = path.join(__dirname, 'fe', 'en2.json');
const jsonFilePathClasificacion = path.join(__dirname, 'fe', 'clasificacion.json');
const jsonFilePathSprint= path.join(__dirname, 'fe', 'sprint.json');
const jsonFilePathFinal= path.join(__dirname, 'fe', 'final.json');
const jsonFilePathPilotos= path.join(__dirname, 'fe', 'pilotos.json');


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


cron.schedule('42 20 * * *', async () => {
    try {
        await realizarScrapeYGuardar();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
});
cron.schedule('47 20 * * *', async () => {
    try {
        await realizarScrapeYGuardar2();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
});
cron.schedule('48 20 * * *', async () => {
    try {
        await realizarScrapeYGuardarClasificacion();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
});
cron.schedule('49 20 * * *', async () => {
    try {
        await realizarScrapeYGuardarSprint();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
});
cron.schedule('50 20 * * *', async () => {
    try {
        await realizarScrapeYGuardarFinal();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
});
cron.schedule('51 20 * * *', async () => {
    try {
        await realizarScrapeYGuardarPilotos();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
});


module.exports = router;










// // 1° ENTRENAMIENTO
// router.get('/en1/:indice', async (req, res) => {
//     const indice = parseInt(req.params.indice);
//     try {
//         const datos = await en1();
//         if (indice < datos.length) {
//             res.send(datos[indice]);
//         } else {
//             res.status(404).json({ error: 'No se encontró el índice especificado' });
//         }
//     } catch (error) {
//         console.error(`Error al obtener los resultados del array ${indice}:`, error);
//         res.status(500).json({ error: `Error al obtener los resultados del array ${indice}` });
//     }
// });

// // 2° ENTRENAMIENTO
// router.get('/en2/:indice', async (req, res) => {
//     const indice = parseInt(req.params.indice);
//     try {
//         const datos = await en2();
//         if (indice < datos.length) {
//             res.send(datos[indice]);
//         } else {
//             res.status(404).json({ error: 'No se encontró el índice especificado' });
//         }
//     } catch (error) {
//         console.error(`Error al obtener los resultados del array ${indice}:`, error);
//         res.status(500).json({ error: `Error al obtener los resultados del array ${indice}` });
//     }
// });



// // CLASIFICACION (Q1)
// router.get('/clasificacion/:indice', async (req, res) => {
//     const indice = parseInt(req.params.indice);
//     try {
//         const datos = await clasificacion();
//         if (indice < datos.length) {
//             res.send(datos[indice]);
//         } else {
//             res.status(404).json({ error: 'No se encontró el índice especificado' });
//         }
//     } catch (error) {
//         console.error(`Error al obtener los resultados del array ${indice}:`, error);
//         res.status(500).json({ error: `Error al obtener los resultados del array ${indice}` });
//     }
// });


// // 6° FINAL (RACE)
// router.get('/final/:indice', async (req, res) => {
//     const indice = parseInt(req.params.indice);
//     try {
//         const datos = await final();
//         if (indice < datos.length) {
//             res.send(datos[indice]);
//         } else {
//             res.status(404).json({ error: 'No se encontró el índice especificado' });
//         }
//     } catch (error) {
//         console.error(`Error al obtener los resultados del array ${indice}:`, error);
//         res.status(500).json({ error: `Error al obtener los resultados del array ${indice}` });
//     }
// });


// // PILOTOS
// router.get('/pilotos/:indice', async (req, res) => {
//     const indice = parseInt(req.params.indice);
//     try {
//         const datos = await pilotos();
//         if (indice < datos.length) {
//             res.send(datos[indice]);
//         } else {
//             res.status(404).json({ error: 'No se encontró el índice especificado' });
//         }
//     } catch (error) {
//         console.error(`Error al obtener los resultados del array ${indice}:`, error);
//         res.status(500).json({ error: `Error al obtener los resultados del array ${indice}` });
//     }
//   });
//   module.exports = router;
