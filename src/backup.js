
// IP 1 
const scrapeData = require('./routes/ip/1.js');
app.get('/ip1', async (req, res) => {
    try {
        const resultados = await scrapeData();
        res.json(resultados);
    } catch (error) {
        console.error('Ocurrió un error al obtener los resultados:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los resultados' });
    }
});

// IP 2 
const scrapeData2 = require('./routes/ip/2.js');
app.get('/ip2/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const resultados = await scrapeData2();
        if (indice < resultados.length) {
            res.json(resultados[indice]);
        } else {
            res.status(404).json({ error: 'No se encontró el índice especificado' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del array ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del array ${indice}` });
    }
});

// IP 3
const scrapeData3 = require('./routes/ip/3.js');
app.get('/ip3/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const resultados = await scrapeData3();
        if (indice < resultados.length) {
            res.json(resultados[indice]);
        } else {
            res.status(404).json({ error: 'No se encontró el índice especificado' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del array ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del array ${indice}` });
    }
});

// IP 4
const scrapeData4 = require('./routes/ip/4.js');
app.get('/ip4/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);
    try {
        const resultados = await scrapeData4();
        if (indice < resultados.length) {
            res.json(resultados[indice]);
        } else {
            res.status(404).json({ error: 'No se encontró el índice especificado' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del array ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del array ${indice}` });
    }
});



// MENU 1
const scrapeData1menu = require('./routes/ip/1menu.js');
app.get('/ip1menu/', async (req, res) => {
    try {
        const resultados = await scrapeData1menu();
        if (resultados) {
            res.json(resultados);
        } else {
            res.status(500).json({ error: 'Error al obtener los resultados' });
        }
    } catch (error) {
        console.error('Error al obtener los resultados:', error);
        res.status(500).json({ error: 'Error al obtener los resultados' });
    }
});


// MENU 2
const scrapeData2menu = require('./routes/ip/2menu.js');
app.get('/ip2menu/', async (req, res) => {
    try {
        const resultados = await scrapeData2menu();
        if (resultados) {
            res.json(resultados);
        } else {
            res.status(500).json({ error: 'Error al obtener los resultados' });
        }
    } catch (error) {
        console.error('Error al obtener los resultados:', error);
        res.status(500).json({ error: 'Error al obtener los resultados' });
    }
});


// MENU 3
const scrapeData3menu = require('./routes/ip/3menu.js');
app.get('/ip3menu/', async (req, res) => {
    try {
        const resultados = await scrapeData3menu();
        if (resultados) {
            res.json(resultados);
        } else {
            res.status(500).json({ error: 'Error al obtener los resultados' });
        }
    } catch (error) {
        console.error('Error al obtener los resultados:', error);
        res.status(500).json({ error: 'Error al obtener los resultados' });
    }
});


// MENU 4
const scrapeData4menu = require('./routes/ip/4menu.js');
app.get('/ip4menu/', async (req, res) => {
    try {
        const resultados = await scrapeData4menu();
        if (resultados) {
            res.json(resultados);
        } else {
            res.status(500).json({ error: 'Error al obtener los resultados' });
        }
    } catch (error) {
        console.error('Error al obtener los resultados:', error);
        res.status(500).json({ error: 'Error al obtener los resultados' });
    }
});