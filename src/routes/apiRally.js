const express = require('express');
const router = express.Router();
const fsPromises = require('fs').promises;
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

// VIVO
const { p1V } = require('./rally/rally/p1.js');
const { p2V } = require('./rally/rally/p2.js');
const { p3V } = require('./rally/rally/p3.js');
const { p4V } = require('./rally/rally/p4.js');
const { p5V } = require('./rally/rally/p5.js');
const { p6V } = require('./rally/rally/p6.js');
const { p7V } = require('./rally/rally/p7.js');
const { p8V } = require('./rally/rally/p8.js');
const { p9V } = require('./rally/rally/p9.js');
const { p10V } = require('./rally/rally/p10.js');
const { p11V } = require('./rally/rally/p11.js');
const { p12V } = require('./rally/rally/p12.js');
const { p13V } = require('./rally/rally/p13.js');
const { p14V } = require('./rally/rally/p14.js');
const { p15V } = require('./rally/rally/p15.js');
const { p16V } = require('./rally/rally/p16.js');
const { shakeV } = require('./rally/rally/shake.js');

const path = require('path'); // Importación del módulo path
const cron = require('node-cron');
const jsonFilePath1 = path.join(__dirname, 'rally', 'p1.json');
const jsonFilePath2 = path.join(__dirname, 'rally', 'p2.json');
const jsonFilePath3 = path.join(__dirname, 'rally', 'p3.json');
const jsonFilePath4 = path.join(__dirname, 'rally', 'p4.json');
const jsonFilePath5 = path.join(__dirname, 'rally', 'p5.json');
const jsonFilePath6 = path.join(__dirname, 'rally', 'p6.json');
const jsonFilePath7 = path.join(__dirname, 'rally', 'p7.json');
const jsonFilePath8 = path.join(__dirname, 'rally', 'p8.json');
const jsonFilePath9 = path.join(__dirname, 'rally', 'p9.json');
const jsonFilePath10 = path.join(__dirname, 'rally', 'p10.json');
const jsonFilePath11 = path.join(__dirname, 'rally', 'p11.json');
const jsonFilePath12 = path.join(__dirname, 'rally', 'p12.json');
const jsonFilePath13 = path.join(__dirname, 'rally', 'p13.json');
const jsonFilePath14 = path.join(__dirname, 'rally', 'p14.json');
const jsonFilePath15 = path.join(__dirname, 'rally', 'p15.json');
const jsonFilePath16 = path.join(__dirname, 'rally', 'p16.json');

// P1
router.get('/p1/:indice', async (req, res) => {
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
router.get('/p2/:indice', async (req, res) => {
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
  router.get('/p3/:indice', async (req, res) => {
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
  router.get('/p4/:indice', async (req, res) => {
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
  router.get('/p5/:indice', async (req, res) => {
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
  router.get('/p6/:indice', async (req, res) => {
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
  router.get('/p7/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePath7, 'utf-8');
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
  router.get('/p8/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePath8, 'utf-8');
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
  router.get('/p9/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePath9, 'utf-8');
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
  router.get('/p10/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePath10, 'utf-8');
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
  router.get('/p11/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePath11, 'utf-8');
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
  router.get('/p12/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePath12, 'utf-8');
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
  router.get('/p13/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePath13, 'utf-8');
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
  router.get('/p14/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePath14, 'utf-8');
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
  router.get('/p15/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePath15, 'utf-8');
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
  router.get('/p16/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const data = await fsPromises.readFile(jsonFilePath16, 'utf-8');
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
      const datos = await p1();
      await fsPromises.writeFile(jsonFilePath1, JSON.stringify(datos, null, 2), 'utf-8');
      console.log('Scrape realizado y datos guardados en en1.json.');
  } catch (error) {
      console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
  }
}
async function realizarScrapeYGuardar2() {
    try {
        const datos = await p2();
        await fsPromises.writeFile(jsonFilePath2, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en1.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  }
  async function realizarScrapeYGuardar3() {
    try {
        const datos = await p3();
        await fsPromises.writeFile(jsonFilePath3, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en1.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  }
  async function realizarScrapeYGuardar4() {
    try {
        const datos = await p4();
        await fsPromises.writeFile(jsonFilePath4, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en1.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  }
  async function realizarScrapeYGuardar5() {
    try {
        const datos = await p5();
        await fsPromises.writeFile(jsonFilePath5, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en1.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  }
  async function realizarScrapeYGuardar6() {
    try {
        const datos = await p6();
        await fsPromises.writeFile(jsonFilePath6, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en1.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  }
  async function realizarScrapeYGuardar7() {
    try {
        const datos = await p7();
        await fsPromises.writeFile(jsonFilePath7, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en1.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  }
  async function realizarScrapeYGuardar8() {
    try {
        const datos = await p8();
        await fsPromises.writeFile(jsonFilePath8, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en1.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  }
  async function realizarScrapeYGuardar9() {
    try {
        const datos = await p9();
        await fsPromises.writeFile(jsonFilePath9, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en1.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  }
  async function realizarScrapeYGuardar10() {
    try {
        const datos = await p10();
        await fsPromises.writeFile(jsonFilePath10, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en1.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  }
  async function realizarScrapeYGuardar11() {
    try {
        const datos = await p11();
        await fsPromises.writeFile(jsonFilePath11, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en1.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  }
  async function realizarScrapeYGuardar12() {
    try {
        const datos = await p12();
        await fsPromises.writeFile(jsonFilePath12, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en1.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  }
  async function realizarScrapeYGuardar13() {
    try {
        const datos = await p13();
        await fsPromises.writeFile(jsonFilePath13, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en1.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  }
  async function realizarScrapeYGuardar14() {
    try {
        const datos = await p14();
        await fsPromises.writeFile(jsonFilePath14, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en1.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  }
  async function realizarScrapeYGuardar15() {
    try {
        const datos = await p15();
        await fsPromises.writeFile(jsonFilePath15, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en1.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  }
  async function realizarScrapeYGuardar16() {
    try {
        const datos = await p16();
        await fsPromises.writeFile(jsonFilePath16, JSON.stringify(datos, null, 2), 'utf-8');
        console.log('Scrape realizado y datos guardados en en1.json.');
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  }


cron.schedule('37 05 * * *', async () => {
  try {
      await realizarScrapeYGuardar();
  } catch (error) {
      console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
  }
});
cron.schedule('43 05 * * *', async () => {
    try {
        await realizarScrapeYGuardar2();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
cron.schedule('44 05 * * *', async () => {
    try {
        await realizarScrapeYGuardar3();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
cron.schedule('45 05 * * *', async () => {
    try {
        await realizarScrapeYGuardar4();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
cron.schedule('46 05 * * *', async () => {
    try {
        await realizarScrapeYGuardar5();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
cron.schedule('47 05 * * *', async () => {
    try {
        await realizarScrapeYGuardar6();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
cron.schedule('48 05 * * *', async () => { 
    try {
        await realizarScrapeYGuardar7();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
cron.schedule('49 05 * * *', async () => {
    try {
        await realizarScrapeYGuardar8();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
cron.schedule('50 05 * * *', async () => {
    try {
        await realizarScrapeYGuardar9();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
cron.schedule('51 05 * * *', async () => {
    try {
        await realizarScrapeYGuardar10();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
cron.schedule('52 05 * * *', async () => {
    try {
        await realizarScrapeYGuardar11();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
cron.schedule('53 05 * * *', async () => {
    try {
        await realizarScrapeYGuardar12();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
cron.schedule('54 05 * * *', async () => {
    try {
        await realizarScrapeYGuardar13();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
cron.schedule('55 05 * * *', async () => {
    try {
        await realizarScrapeYGuardar14();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
cron.schedule('56 05 * * *', async () => {
    try {
        await realizarScrapeYGuardar15();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });
cron.schedule('57 05 * * *', async () => {
    try {
        await realizarScrapeYGuardar16();
    } catch (error) {
        console.error('Error al realizar el scrape y guardar los datos en en1.json:', error);
    }
  });


// VIVO
// SHAKE
router.get('/shake/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
  
    try {
      const datos = await shakeV();
  
      
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
  router.get('/p1/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
  
    try {
      const datos = await p1V();
  
      
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
  router.get('/p2/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
  
    try {
      const datos = await p2V();
  
      
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
  router.get('/p3/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
  
    try {
      const datos = await p3V();
  
      
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
  router.get('/p4/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
  
    try {
      const datos = await p4V();
  
      
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
  router.get('/p5/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
  
    try {
      const datos = await p5V();
  
      
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
  router.get('/p6/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
  
    try {
      const datos = await p6V();
  
      
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
  router.get('/p7/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
  
    try {
      const datos = await p7V();
  
      
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
  router.get('/p8/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
  
    try {
      const datos = await p8V();
  
      
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
  router.get('/p9/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
  
    try {
      const datos = await p9V();
  
      
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
  router.get('/p10/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
  
    try {
      const datos = await p10V();
  
      
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
  router.get('/p11/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
  
    try {
      const datos = await p11V();
  
      
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
  router.get('/p12/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
  
    try {
      const datos = await p12V();
  
      
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
  router.get('/13/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
  
    try {
      const datos = await p13V();
  
      
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
  router.get('/p14/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
  
    try {
      const datos = await p14V();
  
      
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
  router.get('/p15/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
  
    try {
      const datos = await p15V();
  
      
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
  router.get('/final/vivo/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
  
    try {
      const datos = await p16V();
  
      
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
