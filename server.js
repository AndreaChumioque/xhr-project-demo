const express = require('express');
// Obtiene funciones express
const app = express();
// Crea servidor
const server = app.listen(3000, listening);

function listening() {
  console.log('Servidor encendido');
}

app.use(express.static('public'));