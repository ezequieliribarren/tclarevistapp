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


// API VIDEOS CATEGORIAS
const apiVideos = require('./routes/api-videos.js');
app.use('/api-videos', apiVideos);


// API PUBLICIDADES
const apiPublicidades = require('./routes/api-publicidad.js');
app.use('/publicidades', apiPublicidades);


// APIS RESULTADOS ACTC
const apiTcpk = require('./routes/apiTcpk.js');
app.use('/apiTcpk', apiTcpk);

const apiTC = require('./routes/apiTc.js');
app.use('/apiTc', apiTC);

const apiTcppk = require('./routes/apiTcppk.js');
app.use('/apiTcppk', apiTcppk);

const apiTcpm = require('./routes/apiTcpm.js');
app.use('/apiTcpm', apiTcpm);

const apiTcp = require('./routes/apiTcp.js');
app.use('/apiTcp', apiTcp);

const apiTcm = require('./routes/apiTcm.js');
app.use('/apiTcm', apiTcm);





// Rutas de renderizado
const renderRoutes = require('./routes/index.js');

app.use('/', renderRoutes);

// Static
app.use(express.static(path.join(__dirname, 'public')));

// 404 handler
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});


app.get('/scrape', async (req, res) => {
    try {
      const pageContent = await scrapeAndPrint();
      res.send(`Scraping successful. Check the console for output.`);
    } catch (error) {
      console.error('Error during scraping:', error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = app;
