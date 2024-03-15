// googleSheets.js

const fetch = require('node-fetch');

const spreadsheetId = "15F2oc2Aki9WnGWgKFo4Ms3kzpuUR3BoUe8nkM15-Vgo";

function generarEnlaceConParametros(spreadsheetId, sheetId) {
  const enlace = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&gid=${sheetId}`;
  return enlace;
}

async function obtenerDatosDesdeGoogleSheets(sheetIds) {
  const datosPorHoja = [];

  for (const sheetId of sheetIds) {
    try {
      const enlace = generarEnlaceConParametros(spreadsheetId, sheetId);
      const response = await fetch(enlace);
      const textData = await response.text();
      const jsonData = textData.substring(47, textData.length - 2);
      const parsedData = JSON.parse(jsonData);
      datosPorHoja.push({ sheetId, data: parsedData.table.rows });
    } catch (error) {
      console.error(`Error al obtener datos desde la hoja ${sheetId}:`, error);
    }
  }

  return datosPorHoja;
}





module.exports = { obtenerDatosDesdeGoogleSheets };