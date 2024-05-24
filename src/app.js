const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const path = require('path');
const morgan = require('morgan');


// Settings
app.set('port', port);
// app.listen(port)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const cors = require('cors');
app.use(cors());

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Statics
app.use(express.static(path.join(__dirname,"public ")))


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

// API TP
const tp = require('./routes/apiTp.js');
app.use('/tp', tp);

// API TP1
const tp1 = require('./routes/apiTpC1.js');
app.use('/tp1', tp1);

// API TP2
const tp2 = require('./routes/apiTpC2.js');
app.use('/tp2', tp2);

// API TC2000
const tc2000 = require('./routes/apiTc2000.js');
app.use('/tc2000', tc2000);


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

// API TN
const tn = require('./routes/apiTn.js');
app.use('/tn', tn);

// API TN3
const tn3 = require('./routes/apiTn3.js');
app.use('/tn3', tn3);



// IP 1
const scrapeData = require('./routes/ip/1.js');
app.get('/ip1/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice, 10);

    try {
        const resultados = await scrapeData();

        if (resultados && indice >= 0 && indice < resultados.length) {
            const resultado = resultados[indice];

            res.json({
                Indice: resultado.Indice,
                Tanda: resultado.Tanda,
                Estado: resultado.Estado,
                DatosTabla: resultado.DatosTabla
            });
        } else {
            res.status(404).json([]);
        }
    } catch (error) {
        console.error('Error al obtener los resultados:', error);
        res.status(500).json([]);
    }
});

// IP 2
const scrapeData2 = require('./routes/ip/2.js');
app.get('/ip2/:indice', async (req, res) => {
    const { indice } = req.params;

    try {
        // Obtener los datos
        const resultados = await scrapeData2();

        // Verificar que el índice solicitado esté dentro de los límites del array
        if (resultados && resultados.length > indice) {
            const resultado = resultados[indice];

            // Enviar la respuesta con los datos del índice solicitado
            res.json({
                Tanda: resultado.Tanda,
                Estado: resultado.Estado,
                DatosTabla: resultado.DatosTabla
            });
        } else {
            res.status(404).json([]);
        }
    } catch (error) {
        console.error('Error al obtener los resultados:', error);
        res.status(500).json([]);
    }
});

// IP 3
const scrapeData3 = require('./routes/ip/3.js');
app.get('/ip3/:indice', async (req, res) => {
    const { indice } = req.params;

    try {
        // Obtener los datos
        const resultados = await scrapeData3();

        // Verificar que el índice solicitado esté dentro de los límites del array
        if (resultados && resultados.length > indice) {
            const resultado = resultados[indice];

            // Enviar la respuesta con los datos del índice solicitado
            res.json({
                Tanda: resultado.Tanda,
                Estado: resultado.Estado,
                DatosTabla: resultado.DatosTabla
            });
        } else {
            res.status(404).json([]);
        }
    } catch (error) {
        console.error('Error al obtener los resultados:', error);
        res.status(500).json([]);
    }
});

// IP 4
const scrapeData4 = require('./routes/ip/4.js');
app.get('/ip4/:indice', async (req, res) => {
    const { indice } = req.params;

    try {
        // Obtener los datos
        const resultados = await scrapeData4();

        // Verificar que el índice solicitado esté dentro de los límites del array
        if (resultados && resultados.length > indice) {
            const resultado = resultados[indice];

            // Enviar la respuesta con los datos del índice solicitado
            res.json({
                Tanda: resultado.Tanda,
                Estado: resultado.Estado,
                DatosTabla: resultado.DatosTabla
            });
        } else {
            res.status(404).json([]);
        }
    } catch (error) {
        console.error('Error al obtener los resultados:', error);
        res.status(500).json([]);
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


const obtenerClasificacionF1 = require('./routes/f1/live.js');

app.get('/f1/live', async (req, res) => {
    try {
        const clasificacion = await obtenerClasificacionF1('https://directo.caranddriver.es/');
        res.json(clasificacion);
    } catch (error) {
        console.error('Error al obtener la clasificación de F1:', error);
        res.status(500).json({ error: 'Error al obtener la clasificación de F1' });
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
