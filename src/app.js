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

const rally = require('./routes/apiRally.js');
app.use('/rally-argentino', rally);




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
