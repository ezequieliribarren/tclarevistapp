const cheerio = require('cheerio');
const request = require('request-promise');
const { obtenerDatosDesdeGoogleSheets } = require('../googleSheets');

// Función para convertir una cadena de fecha a una fecha válida
function convertirAFechaValida(cadenaFecha) {
  // Mapeo de nombres de meses a números de mes
  const meses = {
    "JANUARY": 0, "FEBRUARY": 1, "MARCH": 2, "APRIL": 3, "MAY": 4, "JUNE": 5,
    "JULY": 6, "AUGUST": 7, "SEPTEMBER": 8, "OCTOBER": 9, "NOVEMBER": 10, "DECEMBER": 11
  };

  // Mapeo de nombres de días a nombres de días abreviados
  const dias = {
    "MONDAY": "Lun", "TUESDAY": "Mar", "WEDNESDAY": "Mié", "THURSDAY": "Jue",
    "FRIDAY": "Vie", "SATURDAY": "Sáb", "SUNDAY": "Dom"
  };

  // Dividir la cadena en día, mes y año
  const partes = cadenaFecha.split(" ");
  const dia = parseInt(partes[1].replace(/\D/g, ""));
  const mes = partes[2].toUpperCase();
  const año = new Date().getFullYear(); // Utilizamos el año actual ya que la cadena no proporciona el año

  // Verificar si el mes es válido
  if (!(mes in meses)) {
    throw new Error('Mes no válido');
  }

  // Crear la fecha en formato de fecha válida
  const fecha = new Date(año, meses[mes], dia);

  // Obtener el nombre del día de la semana abreviado con la primera letra mayúscula
  const diaSemana = dias[fecha.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()];

  return diaSemana;
}

async function menu() {
  try {
    // Obtener los datos desde Google Sheets
    const sheetId = "1870545693"; // ID de la hoja que deseas obtener
    const datos = await obtenerDatosDesdeGoogleSheets([sheetId]); // Pasar el sheetId como un arreglo

    // Filtrar y obtener solo las URL que no son null
    const urlsEntrenamiento = datos[0].data
      .filter(fila => fila.c[19] !== null) // Filtrar las filas con valor null
      .map(fila => fila.c[19].v);

    console.log(urlsEntrenamiento)

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
    const html = await request(url); // Obtener el HTML de la URL
    const $ = cheerio.load(html); // Cargar el HTML en Cheerio

    // Objeto para almacenar las tandas de Formula 1 agrupadas por fecha
    const tandasFormula1 = {};

    // Seleccionar todas las tablas
    $('table').each((index, table) => {
      const $table = $(table);

      // Obtener el nombre del día de la semana
      const dia = $table.find('thead th:first-child').text().trim();

      // Convertir la cadena de fecha a una fecha válida
      const diaSemana = convertirAFechaValida(dia);

      // Inicializar el array de tandas para el día actual
      if (!tandasFormula1[diaSemana]) {
        tandasFormula1[diaSemana] = [];
      }

      // Seleccionar todas las filas de la tabla y recorrerlas
      $table.find('tbody tr').each((index, element) => {
        const $row = $(element);

        // Extraer la categoría y la tanda de la celda de la fila
        const categoria = $row.find('td:nth-child(1)').text().trim();
        const tanda = $row.find('td:nth-child(2)').text().trim();

        // Si la categoría es "Formula 1"
        if (categoria === "FORMULA 1") {
          // Si la tanda contiene "GRAND PRIX", agregar solo "GRAND PRIX"
          if (tanda.includes("GRAND PRIX")) {
            tandasFormula1[diaSemana].push("GRAND PRIX");
          } else {
            // De lo contrario, agregar la tanda completa
            tandasFormula1[diaSemana].push(tanda);
          }
        }
      });
    });

    return tandasFormula1;
  } catch (error) {
    console.error('Error al obtener datos del calendario:', error);
    throw error;
  }
}

module.exports = {
  menu
};
