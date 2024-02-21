const express = require('express');
const router = express.Router();
const fsPromises = require('fs').promises;

router.get('/', async (req, res) => {
    try {
        // Obtén los datos completos
        const publiData = await fsPromises.readFile(`src/publicidad.json`, 'utf-8');
        const publicidades = JSON.parse(publiData);
        res.json(publicidades);
    } catch (error) {
        console.error('Error al obtener los datos', error);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});

module.exports = router;