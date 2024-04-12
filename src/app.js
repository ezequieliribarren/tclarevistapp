const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');


// Settings
app.set('port', 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const cors = require('cors');
app.use(cors());

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// API GENERAL
const apiRoutes = require('./routes/api.js');
app.use('/api', apiRoutes);


// API NOTICIAS CATEGORIAS
const apiCategorias = require('./routes/api-categorias.js');
app.use('/api-categorias', apiCategorias);

// API VINCULAR
const apiVincular = require('./routes/apiVincular.js');
app.use('/api-vincular', apiVincular);

// API PUBLICIDADES
const apiPublicidades = require('./routes/api-publicidad.js');
app.use('/publicidades', apiPublicidades);


// APIS RESULTADOS ACTC
const apiTcpk = require('./routes/apiTcpk.js');
app.use('/tcpk', apiTcpk);

const apiTC = require('./routes/apiTc.js');
app.use('/tc', apiTC);

const apiTcppk = require('./routes/apiTcppk.js');
app.use('/tcppk', apiTcppk);

const apiTcpm = require('./routes/apiTcpm.js');
app.use('/tcpm', apiTcpm);

const apiTcp = require('./routes/apiTcp.js');
app.use('/tcp', apiTcp);

const apiTcm = require('./routes/apiTcm.js');
app.use('/tcm', apiTcm);

// API TOP-RACE
const apiTopRace = require('./routes/apiTopRace.js');
app.use('/tr', apiTopRace);

// API TOP-RACE-SERIES
const apiTopRaceSeries = require('./routes/apiTopRaceSeries.js');
app.use('/tr-series', apiTopRaceSeries);


// API RALLY ARGENTINO
const rally = require('./routes/apiRally.js');
app.use('/rally-argentino', rally);

// API F1
const f1 = require('./routes/apiF1.js');
app.use('/f1', f1);

// API MOTO-GP
const motogp = require('./routes/apiMotogp.js');
app.use('/moto-gp', motogp);

// API INDYCAR
const indycar = require('./routes/apiIndycar.js');
app.use('/indycar-series', indycar);

// API NASCAR
const nascar = require('./routes/apiNascar.js');
app.use('/nascar', nascar);

// API RALLY-MUNDIAL
const rallym = require('./routes/apiRallym.js');
app.use('/rally-mundial', rallym);

// API FORMULA-E
const fe = require('./routes/apiFe.js');
app.use('/formula-e', fe);







// API IP 1 
const scrapeData = require('./routes/ip/1.js');
app.get('/ip1/', async (req, res) => {
    try {
        const resultados = await scrapeData();
        if (resultados) {
            const carreras = resultados.map(resultado => ({
                Tanda: resultado.Tanda,
                Estado: resultado.Estado,
                DatosTabla: resultado.DatosTabla
            }));
            res.json(carreras);
        } else {
            res.status(500).json({ error: 'Error al obtener los resultados' });
        }
    } catch (error) {
        console.error('Error al obtener los resultados:', error);
        res.status(500).json({ error: 'Error al obtener los resultados' });
    }
});

// API IP 1 MENU
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

// API IP 2
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

// API IP 2 MENU
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

// API IP 3
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

// API IP 3 MENU
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

// API IP 4
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

// API IP 4 MENU
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




// Rutas de renderizado
const renderRoutes = require('./routes/index.js');


app.use('/', renderRoutes);

// Static
app.use(express.static(path.join(__dirname, 'public')));

// 404 handler
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});


module.exports = app;
