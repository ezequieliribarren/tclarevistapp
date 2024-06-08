
const { Router } = require('express');
const router = Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const fsPromises = require('fs').promises;
const moment = require('moment-timezone');
const multer = require('multer');
const path = require('path');
const puppeteer = require('puppeteer');


// RUTA NOTICIAS GENERALES
const noticiasFilePath = 'src/noticias.json';

// RUTAS DE CATEGORIAS
const filePaths = [
    'src/noticias/turismo-carretera.json',
    'src/noticias/turismo-nacional.json',
    'src/noticias/turismo-nacional-c3.json',
    'src/noticias/top-race.json',
    'src/noticias/tc-2000.json',
    'src/noticias/tc-2000-series.json',
    'src/noticias/rally.json',
    'src/noticias/rally-mundial.json',
    'src/noticias/nascar.json',
    'src/noticias/f1.json',
    'src/noticias/f2-nacional.json',
    'src/noticias/dakar.json',
    'src/noticias/fe.json',
    'src/noticias/moto-gp.json',
    'src/noticias/arg-mundo.json',
    'src/noticias/tc-mouras.json',
    'src/noticias/tc-pista.json',
    'src/noticias/tcr.json',
    'src/noticias/tc-pista-pick-up.json',
    'src/noticias/tc-pick-up.json',
    'src/noticias/top-race-series.json',
    'src/noticias/turismo-pista.json',
    'src/noticias/indycar-series.json',
    'src/noticias/tc-pista-mouras.json'
];

// ELIMINAR NOTICIAS 
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;

    // Llamada a la función eliminarNoticiaDeArchivo con el id y las rutas de archivo
    eliminarNoticiaDeArchivo(id, filePaths);

    function eliminarNoticiaEnArrayYCategoria(array, id) {
        const indice = array.findIndex(noticia => noticia.id === id);
        if (indice !== -1) {
            // Elimina la noticia del array en memoria
            const noticiaEliminada = array.splice(indice, 1)[0];

            return noticiaEliminada; // Devuelve la noticia eliminada para su posterior manipulación si es necesario
        }
        return null; // Retorna null si no se encuentra la noticia en el array en memoria
    }

    // Buscar y eliminar en el array general y en la categoría
    eliminarNoticiaEnArrayYCategoria(noticias.general, id, 'General', true);

    // Buscar y eliminar en primaria, secundaria y terciaria
    ["primaria", "secundaria", "terciaria"].forEach(categoria => {
        if (noticias.prioridad[categoria]) {
            eliminarNoticiaEnArrayYCategoria(noticias.prioridad[categoria], id, categoria, false);
        }
    });

    // Guardar las noticias actualizadas en el archivo JSON
    const jsonNoticiasActualizado = JSON.stringify(noticias);
    fs.writeFileSync(noticiasFilePath, jsonNoticiasActualizado, 'utf-8');

    // Redireccionar al usuario a la página principal
    res.redirect('/new-entry');
});


function eliminarNoticiaDeArchivo(id, filePaths) {
    filePaths.forEach(filePath => {
        if (fs.existsSync(filePath)) {
            try {
                const jsonNoticias = fs.readFileSync(filePath, 'utf-8');
                const noticias = JSON.parse(jsonNoticias);

                // Filtrar las noticias que no coincidan con el ID a eliminar
                const noticiasFiltradas = noticias.filter(noticia => noticia.id !== id);

                // Escribe de vuelta al archivo JSON la información actualizada
                const jsonNoticiasActualizado = JSON.stringify(noticiasFiltradas);
                fs.writeFileSync(filePath, jsonNoticiasActualizado, 'utf-8');
                console.log(`Noticia eliminada con éxito del archivo: ${filePath}`);
            } catch (error) {
                console.error(`Error al analizar o escribir en el archivo JSON ${filePath}:`, error.message);
            }
        } else {
            console.warn(`El archivo ${filePath} no existe.`);
        }
    });
}

// GENERAR NOTICIAS
let noticias = {};

if (fs.existsSync(noticiasFilePath)) {
    const json_noticias = fs.readFileSync(noticiasFilePath, 'utf-8');
    try {
        noticias = JSON.parse(json_noticias);

        // Asegurar que existan las propiedades primaria, secundaria y terciaria
        noticias.prioridad = noticias.prioridad ?? {};
        noticias.prioridad.primaria = noticias.prioridad.primaria ?? [];
        noticias.prioridad.secundaria = noticias.prioridad.secundaria ?? [];
        noticias.prioridad.terciaria = noticias.prioridad.terciaria ?? [];
    } catch (error) {
        console.error('Error al analizar el archivo JSON de noticias generales:', error.message);
    }
}

router.get('/new-entry', (req, res) => {
    res.render('new-entry', {
        noticias: noticias || {}
    });
});

router.get('/', (req, res) => {
    res.render('index.ejs', {
        noticias
    });
});

// AUDIO
const audioStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/audio');
    },
    filename: (req, file, cb) => {
        const audioPath = 'src/public/audio/' + file.originalname;
        fs.access(audioPath, fs.constants.F_OK, (err) => {
            if (err) {
                // El archivo no existe, puedes usar este nombre de archivo
                cb(null, file.originalname);
            } else {
                // El archivo ya existe, devuelve un mensaje de error
                cb(new Error('El nombre del audio ya existe en la carpeta pública'));
            }
        });
    }
});

// IMAGENES
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/images');
    },
    filename: (req, file, cb) => {
        const imagePath = 'src/public/images/' + file.originalname;
        fs.access(imagePath, fs.constants.F_OK, (err) => {
            if (err) {
                // El archivo no existe, puedes usar este nombre de archivo
                cb(null, file.originalname);
            } else {
                // El archivo ya existe, devuelve un mensaje de error
                cb(new Error('El nombre de la imagen ya existe en la carpeta pública'));
            }
        });
    }
});

// HTML
const htmlStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/html');
    },
    filename: (req, file, cb) => {
        const htmlPath = 'src/public/html/' + file.originalname;
        fs.access(htmlPath, fs.constants.F_OK, (err) => {
            if (err) {
                // El archivo no existe, puedes usar este nombre de archivo
                cb(null, file.originalname);
            } else {
                // El archivo ya existe, devuelve un mensaje de error
                cb(new Error('El nombre del archivo HTML ya existe en la carpeta pública'));
            }
        });
    }
});

const upload = multer({ storage: storage });
const uploadAudio = multer({ storage: audioStorage });
const uploadHTML = multer({ storage: htmlStorage });


router.post('/new-entry', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'secondImage', maxCount: 1 },
    { name: 'imageCuerpo', maxCount: 10 },
    { name: 'audio', maxCount: 1 },
    { name: 'htmlFile', maxCount: 1 } // Agregamos la carga de archivos HTML
]), (req, res) => {
    const { title, cuerpo, categoria, video, idVideo, param, priority } = req.body; // Capturar prioridad
    
    const audioFile = req.files['audio'] ? `audio/${req.files['audio'][0].filename}` : '';
    const htmlFile = req.files['htmlFile'] ? `html/${req.files['htmlFile'][0].filename}` : ''; // Obtener el nombre del archivo HTML si se proporciona

    if (!title || !categoria) {
        res.status(400).send('Faltan campos');
        return;
    }

    const now = moment();
    const formattedDate = now.tz('America/Argentina/Buenos_Aires').format();

    let image = "";
    let secondImage = "";
    let imageCuerpo = [];

    if (req.files['image']) {
        image = `images/${req.files['image'][0].filename}`;
    }

    if (req.files['secondImage']) {
        secondImage = `images/${req.files['secondImage'][0].filename}`;
    }

    if (req.files['imageCuerpo']) {
        imageCuerpo = req.files['imageCuerpo'].map(file => `images/${file.filename}`);
    }

    const nuevaNoticia = {
        id: uuidv4(),
        categoria: Array.isArray(categoria) ? categoria : [categoria],
        title,
        priority: priority ? priority.toLowerCase() : "general",
        date: formattedDate,
        param,
        image,
        secondImage,
        video: idVideo ? `https://www.youtube.com/watch?v=${idVideo}` : "", 
        miniatura: idVideo ? `https://i1.ytimg.com/vi/${idVideo}/mqdefault.jpg` : "", 
        idVideo,
        cuerpo,
        imageCuerpo,
        audio: audioFile,
        html: htmlFile // Agregamos el nombre del archivo HTML a la nueva noticia
    };
    
    if (nuevaNoticia.priority && ["primaria", "secundaria", "terciaria"].includes(nuevaNoticia.priority)) {
        noticias.prioridad[nuevaNoticia.priority] = noticias.prioridad[nuevaNoticia.priority] || [];
        noticias.prioridad[nuevaNoticia.priority].unshift(nuevaNoticia);

        moverNoticia(noticias.prioridad[nuevaNoticia.priority]);
    } else {
        noticias.general = noticias.general || [];
        noticias.general.push(nuevaNoticia);
    }

    const categoriasUnicas = Array.from(new Set(nuevaNoticia.categoria));
    guardarNoticiasEnArchivo();

    categoriasUnicas.forEach(cat => {
        if (cat.toLowerCase() !== 'general') {
            guardarNoticiaEnCategoria(nuevaNoticia, cat);
        }
    });

    res.redirect('/new-entry');
});


router.post('/move-to-priority/:id', (req, res) => {
    const { priority } = req.body;
    const noticiaId = req.params.id;

    if (!["primaria", "secundaria", "terciaria"].includes(priority.toLowerCase())) {
        res.status(400).send('Prioridad no válida');
        return;
    }

    if (priority.toLowerCase() === 'primaria') {
        moverNoticiaAPrimaria(noticias, noticiaId);
    } else if (priority.toLowerCase() === 'secundaria') {
        moverNoticiaAPrioridad(noticias, noticiaId, 'secundaria');
    } else if (priority.toLowerCase() === 'terciaria') {
        moverNoticiaAPrioridad(noticias, noticiaId, 'terciaria');
    }

    res.redirect('/new-entry');
});

function moverNoticiaAPrioridad(noticias, noticiaId, prioridad) {
    const noticia = eliminarNoticiaEnArrayYCategoria(noticias.general, noticiaId, 'General', true);

    if (noticia) {
        noticia.prioridad = prioridad;
        noticias.prioridad[prioridad].unshift(noticia);

        if (noticias.prioridad[prioridad].length > 1) {
            const noticiaAnterior = noticias.prioridad[prioridad].splice(1, 1)[0];
            noticiaAnterior.prioridad = 'general';
            noticias.general.push(noticiaAnterior); // Añadir al final de la lista general
        }

        guardarNoticiasEnArchivo();
    }
}



function guardarNoticiasEnArchivo() {
    const jsonNoticiasActualizado = JSON.stringify(noticias, null, 2);
    fs.writeFileSync(noticiasFilePath, jsonNoticiasActualizado, 'utf-8');
}


function guardarNoticiaEnCategoria(nuevaNoticia, categoria) {
    // Obtén el nombre del archivo JSON según la categoría seleccionada
    const categoriaFileName = `src/noticias/${categoria.toLowerCase().replace(/\s+/g, '-')}.json`;

    let noticiasCategoria = [];

    if (fs.existsSync(categoriaFileName)) {
        const jsonNoticiasCategoria = fs.readFileSync(categoriaFileName, 'utf-8');
        try {
            noticiasCategoria = JSON.parse(jsonNoticiasCategoria);
        } catch (error) {
            console.error(`Error al analizar el archivo JSON de ${categoria}:`, error.message);
        }
    }

    // Añade la nueva noticia al array de la categoría
    noticiasCategoria.push(nuevaNoticia);

    // Convierte y escribe el JSON actualizado
    const jsonNoticiasCategoriaActualizado = JSON.stringify(noticiasCategoria);
    fs.writeFileSync(categoriaFileName, jsonNoticiasCategoriaActualizado, 'utf-8');
}

function moverNoticiaAPrimaria(noticias, noticiaId) {
    const noticia = eliminarNoticiaEnArrayYCategoria(noticias.general, noticiaId, 'General', true);

    if (noticia) {
        noticia.prioridad = 'primaria';
        noticias.prioridad.primaria.unshift(noticia);

        if (noticias.prioridad.primaria.length > 1) {
            const noticiaAnteriorPrimaria = noticias.prioridad.primaria.splice(1, 1)[0];
            noticiaAnteriorPrimaria.prioridad = 'secundaria';
            noticias.prioridad.secundaria.unshift(noticiaAnteriorPrimaria);

            if (noticias.prioridad.secundaria.length > 1) {
                const noticiaAnteriorSecundaria = noticias.prioridad.secundaria.splice(1, 1)[0];
                noticiaAnteriorSecundaria.prioridad = 'terciaria';
                noticias.prioridad.terciaria.unshift(noticiaAnteriorSecundaria);

                if (noticias.prioridad.terciaria.length > 1) {
                    const noticiaAnteriorTerciaria = noticias.prioridad.terciaria.splice(1, 1)[0];
                    noticiaAnteriorTerciaria.prioridad = 'general';
                    noticias.general.push(noticiaAnteriorTerciaria); // Añadir al final de la lista general
                }
            }
        }

        guardarNoticiasEnArchivo();
    }
}



function eliminarNoticiaDeArchivoPorCategoria(id, filePath) {
    if (fs.existsSync(filePath)) {
        try {
            const jsonNoticias = fs.readFileSync(filePath, 'utf-8');
            const noticias = JSON.parse(jsonNoticias);

            // Filtrar las noticias que no coincidan con el ID a eliminar
            const noticiasFiltradas = noticias.filter(noticia => noticia.id !== id);

            // Escribe de vuelta al archivo JSON la información actualizada
            const jsonNoticiasActualizado = JSON.stringify(noticiasFiltradas);
            fs.writeFileSync(filePath, jsonNoticiasActualizado, 'utf-8');
        } catch (error) {
            console.error(`Error al analizar o escribir en el archivo JSON ${filePath}:`, error.message);
        }
    }
}

function eliminarNoticiaEnArrayYCategoria(array, id, categoria, esGeneral) {
    const indice = array.findIndex(noticia => noticia.id === id);
    if (indice !== -1) {
        const noticiaEliminada = array.splice(indice, 1)[0];

        if (!esGeneral) {
            const categoriaFilePath = `src/noticias/${categoria.toLowerCase().replace(/\s+/g, '-')}.json`;
            eliminarNoticiaDeArchivoPorCategoria(id, categoriaFilePath);
        }

        return noticiaEliminada;
    }
    return null;
}






// VINCULAR
router.get('/vincular', (req, res) => {
    res.render('vincular'); // Renderiza la plantilla vincular.ejs o el archivo HTML correspondiente
});

router.post('/vincular', upload.single('image'), (req, res) => {
    const now = moment();
    const formattedDate = now.tz('America/Argentina/Buenos_Aires').format();
    const { link, title } = req.body; // Actualizado para obtener los campos del formulario desde req.body
    const vivo = req.body.vivo ? true : false; // Verifica si la casilla de verificación "Vivo" está marcada

    // Verifica si los campos del formulario están presentes
    if (!req.file || !link || !title) {
        res.status(400).send('Faltan campos');
        return;
    }

    const noticiaVincular = {
        id: uuidv4(),
        title,
        date: formattedDate,
        image: `images/${req.file.filename}`, // Ahora accedes al nombre del archivo desde req.file
        link,
        vivo // Agrega la propiedad "vivo" al objeto de la noticia vinculada
    };

    // Ruta al archivo JSON de vincular
    const vincularFilePath = 'src/vincular.json';

    let noticiasVincular = [];

    if (fs.existsSync(vincularFilePath)) {
        const jsonNoticias = fs.readFileSync(vincularFilePath, 'utf-8');
        // Verificar si el JSON tiene un formato válido antes de intentar analizarlo
        if (jsonNoticias.trim() !== '') {
            noticiasVincular = JSON.parse(jsonNoticias);
        }
    }

    noticiasVincular.unshift(noticiaVincular);

    const jsonNoticiasActualizado = JSON.stringify(noticiasVincular, null, 2);

    fs.writeFileSync(vincularFilePath, jsonNoticiasActualizado, 'utf-8');

    res.redirect('/new-entry');
});


// // PUBLICIDAD
router.get('/publicidad', (req, res) => {
    res.render('publicidad');
});

// PUBLICIDAD
router.post('/publicidad', upload.single('image'), (req, res) => {
    const now = moment();
    const formattedDate = now.tz('America/Argentina/Buenos_Aires').format();
    const { link } = req.body; // Actualizado para obtener los campos del formulario desde req.body

    const publicidad = {
        id: uuidv4(),
        date: formattedDate,
        image: `images/${req.file.filename}`, // Ahora accedes al nombre del archivo desde req.file
        link
    };

    // Ruta al archivo JSON de vincular
    const vincularFilePath = 'src/publicidad.json';

    let publicidades = [];

    if (fs.existsSync(vincularFilePath)) {
        const jsonNoticias = fs.readFileSync(vincularFilePath, 'utf-8');
        // Verificar si el JSON tiene un formato válido antes de intentar analizarlo
        if (jsonNoticias.trim() !== '') {
            publicidades = JSON.parse(jsonNoticias);
        }
    }

    publicidades.unshift(publicidad);

    const jsonNoticiasActualizado = JSON.stringify(publicidades, null, 2);

    fs.writeFileSync(vincularFilePath, jsonNoticiasActualizado, 'utf-8');

    res.redirect('/publicidad');
});

router.get('/procesar', (req, res) => {
    res.render('procesar');
});
const tableStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/tandas');
    },
    filename: (req, file, cb) => {
        const filePath = path.join('public/tandas', file.originalname);
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                // El archivo no existe, puedes usar este nombre de archivo
                cb(null, file.originalname);
            } else {
                // El archivo ya existe, devuelve un mensaje de error
                cb(new Error('El nombre del archivo ya existe en la carpeta pública'));
            }
        });
    }
});

const tableUpload = multer({ storage: tableStorage });

router.post('/procesar', tableUpload.single('tableHTML'), async (req, res) => {
    const { url, fileName } = req.body;

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Esperar a que la página esté completamente cargada
        await page.goto(url, { waitUntil: 'load' });
        
        // Extraer el HTML de la tabla después de que la página esté completamente cargada
        const tableHTML = await page.$eval('.table-carreras', table => table.outerHTML);

        // Guardar el HTML de la tabla utilizando multer
        fs.writeFile(`public/tandas/${fileName}.html`, tableHTML, err => {
            if (err) {
                console.error(err);
                res.status(500).send('Error saving file');
            } else {
                res.send('Tanda processed successfully!');
            }
        });

        await browser.close();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing URL');
    }
});

// const { vivo } = require('./rally/vivo');

// vivo()
//   .then(resultados => {
//     console.log('Resultados obtenidos:');
//     console.log(resultados); // No necesitas JSON.stringify porque ya debería estar en formato de objeto o arreglo
//   })
//   .catch(error => {
//     console.error('Ocurrió un error:', error);
//   });
// 
// const { en1 } = require('./tn/en1');

// en1()
//   .then(resultados => {
//     console.log('Resultados obtenidos:', JSON.stringify(resultados, null, 2));
//   })
//   .catch(error => {
//     console.error('Error ejecutando el scraping:', error);
//   });

module.exports = router;
 