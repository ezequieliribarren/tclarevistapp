// config.js
console.log('FRONTEND_URL:', process.env.FRONTEND_URL); // Agrega esto para depuración
const FRONTEND_URL = process.env.FRONTEND_URL || "http://195.200.5.59/";
const PORT = process.env.PORT || 5000; // Define el puerto aquí

module.exports = {
    FRONTEND_URL,
    PORT
};
