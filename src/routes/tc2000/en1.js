const puppeteer = require('puppeteer');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets'); 

async function en1() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "901761059"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo

    // Filtrar y obtener solo las URL que no son null
    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[8] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[8].v);

    // Array para almacenar todas las promesas de las solicitudes
    const promesasSolicitudes = [];

    // Enviar solicitudes en paralelo
    for (const url of urlsEntrenamiento) {
      promesasSolicitudes.push(obtenerResultados(url));
    }

    // Esperar a que todas las solicitudes se completen
    const resultadosPorUrl = await Promise.all(promesasSolicitudes);

    console.log('Resultados por URL:', resultadosPorUrl);

    // Devolver los resultados obtenidos
    return resultadosPorUrl;
  } catch (error) {
    console.error('Error al obtener y mostrar datos:', error);
    throw error;
  }
}

async function obtenerResultados(url) {
  try {
    if (url === "") {
      // Si la URL está vacía, devolver un valor predeterminado (por ejemplo, un arreglo vacío)
      return [];
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Hacer clic en el elemento que contiene el texto "1° Entrenamiento"
    await page.evaluate(() => {
      const elements = document.querySelectorAll('.ui-accordion-header');
      for (const element of elements) {
        if (element.textContent.includes('1° Entrenamiento')) {
          element.click();
          break;
        }
      }
    });

    // Esperar a que la tabla de tiempos esté presente en el DOM
    await page.waitForSelector('.tabla_tiempos');

    // Extraer datos de la tabla
    const resultados = await page.evaluate(() => {
      const rows = document.querySelectorAll('.tabla_tiempos tbody tr');
      const data = [];

      rows.forEach(row => {
        const columns = row.querySelectorAll('td');
        const pos = columns[0].textContent.trim();
        const piloto = columns[1].textContent.trim();
        const marca = columns[2].textContent.trim();
        const vueltas = columns[3].textContent.trim();
        const tiempo = columns[4].textContent.trim();
        const diferencia = columns[5].textContent.trim();

        data.push({ pos, piloto, marca, vueltas, tiempo, diferencia });
      });

      return data;
    });

    await browser.close();

    // Filtrar los resultados vacíos si existen
    const resultadosFiltrados = resultados.filter(resultado => {
      return Object.values(resultado).some(value => value !== '');
    });

    return resultadosFiltrados;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
  module.exports = {
    en1
  };
