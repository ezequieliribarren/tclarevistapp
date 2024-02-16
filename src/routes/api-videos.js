const express = require('express');
const router = express.Router();
const fsPromises = require('fs').promises;


router.get('/:category', async (req, res) => {
  const category = req.params.category.toLowerCase();
  const filenames = {
    'tc': 'turismo-carretera.json',
      'tn': 'turismo-nacional.json',
      'f2': 'f2-nacional.json',
      'formula-e': 'fe.json',
      'm-gp': 'moto-gp.json',
      'nascar': 'nascar.json',
      'rally-cross-country': 'rally-cross-country.json',
      'rally': 'rally.json',
      'tc-2000': 'tc-2000.json',
      'tc-2000-series': 'tc-2000-series.json',
      'tc-mouras': 'tc-mouras.json',
      'tc-pick-up': 'tc-pick-up.json',
      'tc-pista': 'tc-pista.json',
      'tcr': 'tcr.json',
      'top-race-series': 'top-race-series.json',
      'tn': 'turismo-nacional.json'
  };

  try {
      if (category in filenames) {
          const noticiasData = await fsPromises.readFile(`src/videos/${filenames[category]}`, 'utf-8');
          const noticias = JSON.parse(noticiasData);
          res.json(noticias);
      } else {
          res.status(404).json({ error: 'Categoría no encontrada' });
      }
  } catch (error) {
      console.error('Error al obtener noticias:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;