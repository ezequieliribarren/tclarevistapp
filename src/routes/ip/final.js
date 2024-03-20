// const puppeteer = require('puppeteer');

// async function scrapeData() {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     await page.goto('http://45.5.0.178:8082/modules/ppcev/index.php');

//     const categorias = ['TC', 'TCP', 'TCPM', 'TCPK', 'TCPPK', 'TCM'];
//     const dataObj = {};

//     for (const categoria of categorias) {
//         const buttonText = await page.evaluate((categoria) => {
//             const button = Array.from(document.querySelectorAll('a')).find(a => a.textContent === categoria);
//             return button ? button.textContent.trim() : null;
//         }, categoria);

//         if (buttonText === categoria) {
//             await page.click(`#div_tabs_ppcev_activities_notselected_${categoria === 'TC' ? '1' : '2'} a`);
//             await page.waitForSelector('table.table-bordered');

//             const tableData = await page.evaluate(() => {
//                 const tableRows = Array.from(document.querySelectorAll('table.table-bordered tbody tr'));
//                 const rowData = tableRows.map(row => {
//                     const cells = Array.from(row.querySelectorAll('td'));
//                     return cells.map(cell => cell.textContent.trim());
//                 });
//                 return rowData;
//             });

//             const tandaData = await page.evaluate(() => {
//                 const tandaElements = Array.from(document.querySelectorAll('li.datas'));
//                 const tandaInfo = tandaElements.map(tanda => {
//                     const titleElement = tanda.querySelector('span strong');
//                     const title = titleElement ? titleElement.textContent.trim() : '';

//                     return title;
//                 });
//                 return tandaInfo;
//             });

//             dataObj[categoria] = {
//                 table: tableData,
//                 tandas: tandaData
//             };

//             console.log(`Datos de la categoría ${categoria}:`, dataObj[categoria]);
//         }
//     }

//     await browser.close();
// }

// scrapeData();
