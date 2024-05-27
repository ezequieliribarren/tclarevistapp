const puppeteer = require('puppeteer');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

async function en1() {
  process.setMaxListeners(15); // Cambia este número según sea necesario

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
  let browser;
  try {
    if (url === "") {
      // Si la URL está vacía, devolver un valor predeterminado (por ejemplo, un arreglo vacío)
      return [];
    }

    // Iniciar el navegador y la página
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Hacer clic en el primer elemento h5
    await page.click('#ui-accordion-accordion-header-0');
    await page.waitForSelector('#ui-accordion-accordion-panel-0');

    // Extraer datos de la tabla
    const resultados = await page.evaluate(() => {
      const rows = document.querySelectorAll('#ui-accordion-accordion-panel-0 .tabla_tiempos tbody tr');
      return Array.from(rows).map(row => {
        const columns = row.querySelectorAll('td');
        return {
          pos: columns[0].textContent.trim(),
          piloto: columns[1].textContent.trim(),
          marca: columns[2].textContent.trim(),
          vueltas: columns[3].textContent.trim(),
          tiempo: columns[4].textContent.trim(),
          diferencia: columns[5].textContent.trim()
        };
      });
    });

    // Filtrar los resultados vacíos si existen
    const resultadosFiltrados = resultados.filter(resultado => {
      return Object.values(resultado).some(value => value !== '');
    });

    return resultadosFiltrados;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}


module.exports = {
  en1
};
