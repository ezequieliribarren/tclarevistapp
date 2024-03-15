
const { Router } = require('express');
const router = Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const fsPromises = require('fs').promises;
const moment = require('moment-timezone');
const multer = require('multer');
const path = require('path');


// RUTA NOTICIAS GENERALES
const noticiasFilePath = 'src/noticias.json';

// RUTAS DE CATEGORIAS
const filePaths = [
    'src/noticias/turismo-carretera.json',
    'src/noticias/turismo-nacional.json',
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
    'src/noticias/rally-cross-country.json',
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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/images');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/new-entry', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'secondImage', maxCount: 1 }]), (req, res) => {
    const { title, cuerpo, categoria, video, idVideo, param, imageCuerpo } = req.body;

    if (!title || !categoria) {
        res.status(400).send('Faltan campos');
        return;
    }

    const now = moment();

    // Agrega la zona horaria de Argentina a la fecha
    const formattedDate = now.tz('America/Argentina/Buenos_Aires').format();

    let image = "";
    let secondImage = "";

    if (req.files['image']) {
        image = `images/${req.files['image'][0].filename}`;
    }

    if (req.files['secondImage']) {
        secondImage = `images/${req.files['secondImage'][0].filename}`;
    }

    const nuevaNoticia = {
        id: uuidv4(),
        categoria: Array.isArray(categoria) ? categoria : [categoria],
        title,
        priority: "general",
        date: formattedDate,
        param,
        image,
        secondImage, // Agrega el segundo parámetro para la segunda imagen
        video,
        idVideo,
        cuerpo,
        imageCuerpo
    };

    // Verifica la prioridad seleccionada
    if (nuevaNoticia.priority && ["primaria", "secundaria", "terciaria"].includes(nuevaNoticia.priority.toLowerCase())) {
        // Si tiene prioridad, agrega la noticia al array correspondiente
        noticias.prioridad[priority.toLowerCase()] = noticias.prioridad[priority.toLowerCase()] || [];
        noticias.prioridad[priority.toLowerCase()].unshift(nuevaNoticia);

        // Mueve la noticia anterior al array general
        moverNoticia(noticias.prioridad[priority.toLowerCase()]);
    } else {
        // Si no tiene prioridad, agrega la noticia al array general
        noticias.general = noticias.general || [];
        noticias.general.push(nuevaNoticia);
    }

    // Restringir la noticia a categorías únicas (eliminar duplicados)
    const categoriasUnicas = Array.from(new Set(nuevaNoticia.categoria));

    // Guarda las noticias actualizadas en el archivo JSON
    guardarNoticiasEnArchivo();

    // Verifica las categorías seleccionadas
    categoriasUnicas.forEach(cat => {
        if (cat.toLowerCase() !== 'general') {
            // Si es otra categoría, sigue el procedimiento actual
            guardarNoticiaEnCategoria(nuevaNoticia, cat);
        }
    });

    res.redirect('/new-entry');
});

router.post('/move-to-priority/:id', (req, res) => {
    const { priority } = req.body;
    const noticiaId = req.params.id;

    // Verifica si la prioridad es válida
    if (!["primaria", "secundaria", "terciaria"].includes(priority.toLowerCase())) {
        res.status(400).send('Prioridad no válida');
        return;
    }

    // Mueve la noticia a la categoría correspondiente
    if (priority.toLowerCase() === 'primaria') {
        moverNoticiaAPrimaria(noticias, noticiaId);
    } else {
        moverNoticiaAPrioridad(noticias, noticiaId, priority.toLowerCase());
    }

    res.redirect('/new-entry');
});

function guardarNoticiasEnArchivo() {
    // Guarda las noticias actualizadas en el archivo JSON
    const jsonNoticiasActualizado = JSON.stringify(noticias);
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

    // Mover la noticia a primaria
    if (noticia) {
        noticia.prioridad = 'primaria';
        noticias.prioridad.primaria.unshift(noticia);

        // Verificar si hay una noticia anterior en primaria
        if (noticias.prioridad.primaria.length > 1) {
            // Mover la noticia anterior de primaria a secundaria
            const noticiaAnteriorPrimaria = noticias.prioridad.primaria.splice(1, 1)[0];
            noticiaAnteriorPrimaria.prioridad = 'secundaria';
            noticias.prioridad.secundaria.unshift(noticiaAnteriorPrimaria);

            // Verificar si hay una noticia anterior en secundaria
            if (noticias.prioridad.secundaria.length > 1) {
                // Mover la noticia anterior de secundaria a terciaria
                const noticiaAnteriorSecundaria = noticias.prioridad.secundaria.splice(1, 1)[0];
                noticiaAnteriorSecundaria.prioridad = 'terciaria';
                noticias.prioridad.terciaria.unshift(noticiaAnteriorSecundaria);

                // Verificar si hay una noticia anterior en terciaria
                if (noticias.prioridad.terciaria.length > 1) {
                    // Mover la noticia anterior de terciaria a general
                    const noticiaAnteriorTerciaria = noticias.prioridad.terciaria.splice(1, 1)[0];
                    noticiaAnteriorTerciaria.prioridad = 'general';
                    noticias.general.unshift(noticiaAnteriorTerciaria);
                }
            }
        }

        // Guardar las noticias actualizadas en el archivo JSON
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
        // Elimina la noticia del array en memoria
        const noticiaEliminada = array.splice(indice, 1)[0];

        // Eliminar también del archivo JSON de la categoría si no es general
        if (!esGeneral) {
            const categoriaFilePath = `src/noticias/${categoria.toLowerCase().replace(/\s+/g, '-')}.json`;
            eliminarNoticiaDeArchivoPorCategoria(id, categoriaFilePath);
        }

        return noticiaEliminada; // Devuelve la noticia eliminada para su posterior manipulación si es necesario
    }
    return null; // Retorna null si no se encuentra la noticia en el array en memoria
}

// VINCULAR
router.post('/vincular', upload.single('image'), (req, res) => {
    const now = moment();
    const formattedDate = now.tz('America/Argentina/Buenos_Aires').format();
    const { link, title } = req.body; // Actualizado para obtener los campos del formulario desde req.body

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
        link
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

    res.redirect('/new-entry');
});


// const obtenerHorarios = require('./tcpk/horarios');
// const rallyArgentino = require('./rally-argentino')


// async function init() {
//     try {
//         const data = await rallyArgentino();
//         console.log(data);
//     } catch (error) {
//         console.error('Error al obtener y mostrar datos:', error);
//     }
// }

// init();

// const { en6 } = require('./tcpk/entrenamiento5');

// async function imprimirInformacion() {
//   try {
//     const resultados = await en6();
//     // Recorre los resultados y los imprime
//     resultados.forEach((resultadosPorUrl, index) => {
//       console.log(`Resultados para la URL ${index + 1}:`);
//       resultadosPorUrl.forEach((resultado, i) => {
//         console.log(`Resultado ${i + 1}:`, resultado);
//       });
//     });
//   } catch (error) {
//     console.error('Error al imprimir información:', error);
//   }
// }

// imprimirInformacion();


module.exports = router;
