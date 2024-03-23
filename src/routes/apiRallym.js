const express = require('express');
const router = express.Router();
const { p1 } = require('./rallym/ss1.js');
const { p2 } = require('./rallym/ss2.js');
const { p3 } = require('./rallym/ss3.js');
const { p4 } = require('./rallym/ss4.js');
const { p5 } = require('./rallym/ss5.js');
const { p6 } = require('./rallym/ss6.js');
const { p7 } = require('./rallym/ss7.js');
const { p8 } = require('./rallym/ss8.js');
const { p9 } = require('./rallym/ss9.js');
const { p10 } = require('./rallym/ss10.js');
const { p11 } = require('./rallym/ss11.js');
const { p12 } = require('./rallym/ss12.js');
const { p13 } = require('./rallym/ss13.js');
const { p14 } = require('./rallym/ss14.js');
const { p15 } = require('./rallym/ss15.js');
const { p16 } = require('./rallym/ss16.js');
const { p17 } = require('./rallym/ss17.js');
const { p18 } = require('./rallym/ss18.js');
const { p19 } = require('./rallym/ss19.js');
const { p20 } = require('./rallym/ss20.js');
const { p21 } = require('./rallym/ss21.js');
const { p22 } = require('./rallym/ss22.js');
const { p23 } = require('./rallym/ss23.js');
const { p24 } = require('./rallym/ss24.js');
const { p25 } = require('./rallym/ss25.js');
const { p26 } = require('./rallym/ss26.js');
const { p27 } = require('./rallym/ss27.js');
const { p28 } = require('./rallym/ss28.js');
const { p29 } = require('./rallym/ss29.js');
const { p30 } = require('./rallym/ss30.js');
const { shake } = require('./rallym/shake.js');
const { pilotos } = require('./rallym/pilotos.js');


// SHAKE
router.get('/shake/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await shake();


        // Verificar si el índice es válido
        if (datos && datos.length > indice) {
            res.json(datos[indice]);
        } else {
            res.status(404).json({ error: 'No se encontró el índice especificado' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});

// P1
router.get('/p1/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p1();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});

module.exports = router;

// P2
router.get('/p2/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p2();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});

// P3
router.get('/p3/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p3();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});

// P4
router.get('/p4/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p4();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});

// P5
router.get('/p5/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p5();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});

// P6
router.get('/p6/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p6();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});

// P7
router.get('/p7/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p7();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});

// P8
router.get('/p8/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p8();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});

// P9
router.get('/p9/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p9();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});

// P10
router.get('/p10/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p10();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});

// P11
router.get('/p11/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p11();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});

// P12
router.get('/p12/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p12();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});

// P13
router.get('/p13/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p13();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});

// P14
router.get('/p14/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p14();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});

// P15
router.get('/p15/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p15();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});

// P16
router.get('/p16/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p16();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// P17
router.get('/p17/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p17();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// P18
router.get('/p18/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p18();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// P19
router.get('/p19/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p19();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// P20
router.get('/p20/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p20();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// P21
router.get('/p21/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p21();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// P22
router.get('/p22/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p22();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// P23
router.get('/p23/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p23();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// P24
router.get('/p24/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p24();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// P25
router.get('/p25/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p25();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// P26
router.get('/p26/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p26();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// P27
router.get('/p27/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p27();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// P28
router.get('/p28/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await 28();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// P29
router.get('/p29/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p29();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// P30
router.get('/p30/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await p30();

        // Verificar si el índice es válido
        if (datos && datos.length > 0) {
            const [resultadosCol10, resultadosCol11] = datos;
            
            // Verificar si el índice está dentro del rango de resultados
            if (resultadosCol10.length > indice && resultadosCol11.length > indice) {
                const filaCol10 = resultadosCol10[indice];
                const filaCol11 = resultadosCol11[indice];
                res.json({ col10: filaCol10, col11: filaCol11 });
            } else {
                res.status(404).json({ error: 'No se encontró el índice especificado' });
            }
        } else {
            res.status(404).json({ error: 'No se encontraron datos para mostrar' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});
// PILOTOS
router.get('/pilotos/:indice', async (req, res) => {
    const indice = parseInt(req.params.indice);

    try {
        const datos = await pilotos();


        // Verificar si el índice es válido
        if (datos && datos.length > indice) {
            res.json(datos[indice]);
        } else {
            res.status(404).json({ error: 'No se encontró el índice especificado' });
        }
    } catch (error) {
        console.error(`Error al obtener los resultados del índice ${indice}:`, error);
        res.status(500).json({ error: `Error al obtener los resultados del índice ${indice}` });
    }
});




module.exports = router;
