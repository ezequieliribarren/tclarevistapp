const express = require('express');
const router = express.Router();
const fsPromises = require('fs').promises;


router.get('/:category', async (req, res) => {
  const category = req.params.category.toLowerCase();
  const filenames = {
    'tc': 'turismo-carretera.json',
      'tn': 'turismo-nacional.json',
      'f2-nacional': 'f2-nacional.json',
      'f1': 'f1.json',
      'formula-e': 'fe.json',
      'moto-gp': 'moto-gp.json',
      'indycar-series': 'indycar-series.json',
      'nascar': 'nascar.json',
      'dakar': 'dakar.json',
      'rally-mundial': 'rally-mundial.json',
      'arg-mundo': 'arg-mundo.json',
      'rally-argentino': 'rally.json',
      'tc2000': 'tc-2000.json',
      'tc2000-series': 'tc-2000-series.json',
      'tcm': 'tc-mouras.json',
      'tcpk': 'tc-pick-up.json',
      'tcppk': 'tc-pista-pick-up.json',
      'tcp': 'tc-pista.json',
      'tcpm': 'tc-pista-mouras.json',
      'tcr': 'tcr.json',
      'tr': 'top-race.json',
      'tr-series': 'top-race-series.json',
      'tp': 'turismo-pista.json',
      'tn': 'turismo-nacional.json'
  };

  try {
      if (category in filenames) {
          const noticiasData = await fsPromises.readFile(`src/noticias/${filenames[category]}`, 'utf-8');
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