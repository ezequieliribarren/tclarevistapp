const express = require('express');
const router = express.Router();
const fsPromises = require('fs').promises;
const { en1 } = require('./motogp/entrenamiento1.js')
const { en2 } = require('./motogp/entrenamiento2.js')
const { en3 } = require('./motogp/entrenamiento3.js')
const { en6 } = require('./motogp/entrenamiento6.js')
const { clasificacion } = require('./motogp/clasificacion.js')
const { serie1 } = require('./motogp/serie1.js')
const { serie2 } = require('./motogp/serie2.js')
const { serie3 } = require('./motogp/serie3.js')
const { final } = require('./motogp/final.js')
const { pilotos } = require('./motogp/pilotos.js');

// VIVO
const { en1V } = require('./motogp/motogp/entrenamiento1.js')
const { en2V } = require('./motogp/motogp/entrenamiento2.js')
const { en6V } = require('./motogp/motogp/entrenamiento6.js')
const { clasificacionV } = require('./motogp/motogp/clasificacion.js')
const { serie1V } = require('./motogp/motogp/serie1.js')
const { serie2V } = require('./motogp/motogp/serie2.js')
const { serie3V } = require('./motogp/motogp/serie3.js')
const { finalV } = require('./motogp/motogp/final.js')
const { pilotosV } = require('./motogp/motogp/pilotos.js');

const path = require('path'); // Importación del módulo path
const cron = require('node-cron');
const jsonFilePath1 = path.join(__dirname, 'motogp', 'en1.json');
const jsonFilePath2 = path.join(__dirname, 'motogp', 'en2.json');
const jsonFilePath3 = path.join(__dirname, 'motogp', 'en3.json');
const jsonFilePath6 = path.join(__dirname, 'motogp', 'en6.json');
const jsonFilePathClasificacion = path.join(__dirname, 'motogp', 'clasificacion.json');
const jsonFilePathSerie1= path.join(__dirname, 'motogp', 'serie1.json');
const jsonFilePathSerie2= path.join(__dirname, 'motogp', 'serie2.json');
const jsonFilePathSerie3= path.join(__dirname, 'motogp', 'serie3.json');
const jsonFilePathFinal= path.join(__dirname, 'motogp', 'final.json');
const jsonFilePathPilotos= path.join(__dirname, 'motogp', 'pilotos.json');



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
// 3° ENTRENAMIENTO
router.get('/en6/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePath6, 'utf-8');
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
// SERIE 1
router.get('/serie1/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePathSerie1, 'utf-8');
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
// SERIE 2
router.get('/serie2/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePathSerie2, 'utf-8');
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
// SERIE 3
router.get('/serie3/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePathSerie3, 'utf-8');
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
async function realizarScrapeYGuardar6() {
    try {
        const datos = await en6();
        await fsPromises.writeFile(jsonFilePath6, JSON.stringify(datos, null, 2), 'utf-8');
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
async function realizarScrapeYGuardarSerie1() {
    try {
        const datos = await serie1();
        await fsPromises.writeFile(jsonFilePathSerie1, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en3.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en3.json:', error);
    }
}
async function realizarScrapeYGuardarSerie2() {
    try {
        const datos = await serie2();
        await fsPromises.writeFile(jsonFilePathSerie2, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en3.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en3.json:', error);
    }
}
async function realizarScrapeYGuardarSerie3() {
    try {
        const datos = await serie3();
        await fsPromises.writeFile(jsonFilePathSerie3, JSON.stringify(datos, null, 2), 'utf-8');
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

cron.schedule('09 05 * * *', async () => {
    try {
        await realizarScrapeYGuardar();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
});
cron.schedule('10 05 * * *', async () => {
    try {
        await realizarScrapeYGuardar2();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
});
cron.schedule('11 05 * * *', async () => {
    try {
        await realizarScrapeYGuardar3();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
});
cron.schedule('12 05 * * *', async () => {
    try {
        await realizarScrapeYGuardar6();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
});
cron.schedule('13 05 * * *', async () => {
    try {
        await realizarScrapeYGuardarClasificacion();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
})
cron.schedule('14 05 * * *', async () => {
    try {
        await realizarScrapeYGuardarSerie1();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
});
cron.schedule('15 05 * * *', async () => {
    try {
        await realizarScrapeYGuardarSerie2();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
});
cron.schedule('16 05 * * *', async () => {
    try {
        await realizarScrapeYGuardarSerie3();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
});
cron.schedule('17 05 * * *', async () => {
    try {
        await realizarScrapeYGuardarFinal();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
});
cron.schedule('18 05 * * *', async () => {
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
// 6° ENTRENAMIENTO (CLASIFICACION PR)
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
// CLASIFICACION (Q1)
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
// 1° SERIE (Q2)
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
// 2° SERIE (SPRINT)
router.get('/serie2/vivo/:ndice', async (req, res) => {
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
// 3° SERIE (WUP)
router.get('/serie3/vivo/:ndice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const datos = await serie3V();
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
// 6° FINAL (RACE)
router.get('/final/vivo/:ndice', async (req, res) => {
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
router.get('/pilotos/vivo/:ndice', async (req, res) => {
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



  module.exports = router;
