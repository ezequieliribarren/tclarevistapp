const express = require('express');
const router = express.Router();
const fsPromises = require('fs').promises;
const {en1} = require ('./tn/en1.js')
const {en2} = require ('./tn/en2.js')
const {en3} = require ('./tn/en3.js')
const {en5} = require ('./tn/en5.js')
const {en6} = require ('./tn/en6.js')
const {clasificacion} = require ('./tn/clasificacion.js')
const {serie1} = require ('./tn/serie1.js')
const {serie2} = require ('./tn/serie2.js')
const {final} = require ('./tn/final.js')
// const { obtenerYMostrarDatos, horarios } = require('./tn/horarios.js');
const { pilotos } = require('./tn/pilotos.js');
const { sheets, menu } = require('./tn/menu.js');
const path = require('path'); // Importación del módulo path
const cron = require('node-cron');

const jsonFilePath1 = path.join(__dirname, 'tn', 'en1.json');
const jsonFilePath2 = path.join(__dirname, 'tn', 'en2.json');
const jsonFilePath3 = path.join(__dirname, 'tn', 'en3.json');
const jsonFilePath5 = path.join(__dirname, 'tn', 'en5.json');
const jsonFilePath6 = path.join(__dirname, 'tn', 'en6.json');
const jsonFilePathClasificacion = path.join(__dirname, 'tn', 'clasificacion.json');
const jsonFilePathSerie1= path.join(__dirname, 'tn', 'serie1.json');
const jsonFilePathSerie2= path.join(__dirname, 'tn', 'serie2.json');
const jsonFilePathFinal= path.join(__dirname, 'tn', 'final.json');
const jsonFilePathPilotos= path.join(__dirname, 'tn', 'pilotos.json');
const jsonFilePathHorarios= path.join(__dirname, 'tc', 'horarios.json');


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
// 5° ENTRENAMIENTO
router.get('/en5/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePath5, 'utf-8');
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
// 6° ENTRENAMIENTO
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
async function realizarScrapeYGuardar5() {
    try {
        const datos = await en5();
        await fsPromises.writeFile(jsonFilePath5, JSON.stringify(datos, null, 2), 'utf-8');
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



  cron.schedule('02 18 * * *', async () => {
    try {
        await realizarScrapeYGuardar();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
  cron.schedule('03 18 * * *', async () => {
    try {
        await realizarScrapeYGuardar2();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
  cron.schedule('04 18 * * *', async () => {
    try {
        await realizarScrapeYGuardar3();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
  cron.schedule('05 18 * * *', async () => {
    try {
        await realizarScrapeYGuardar5();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
  cron.schedule('06 18 * * *', async () => {
    try {
        await realizarScrapeYGuardar6();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
  cron.schedule('07 18 * * *', async () => {
    try {
        await realizarScrapeYGuardarClasificacion();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
  cron.schedule('08 18 * * *', async () => {
    try {
        await realizarScrapeYGuardarSerie1();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
  cron.schedule('09 18 * * *', async () => {
    try {
        await realizarScrapeYGuardarSerie2();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
  cron.schedule('10 18 * * *', async () => {
    try {
        await realizarScrapeYGuardarFinal();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
  cron.schedule('11 18 * * *', async () => {
    try {
        await realizarScrapeYGuardarPilotos();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
  cron.schedule('12 18 * * *', async () => {
    try {
        await realizarScrapeYGuardarHorarios();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
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
  
  
  module.exports = router;