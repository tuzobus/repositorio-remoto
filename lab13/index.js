// Lab13
// Marco Iván Flores Villanueva

const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

let valorPrueba = 1;

app.get('/', (req, res, next) => {
    res.render('index', {numRuta: valorPrueba});
});

app.get('/ruta2', (req, res, next) => {
    res.render('ruta2', {numRuta: 2});
});

app.get('/ruta3', (req, res, next) => {
    res.render('ruta3', {numRuta: 3});
});

app.get('/ruta4', (req, res, next) => {
    res.render('ruta4', {numRuta: 4});
});

// Ruta 5: formulario
const rutasFormulario = require("./routes/formulario.routes");
app.use('/formulario', rutasFormulario);

app.use((req, res) => {
    res.status(404).send('ERROR 404: pagina no encontrada');
});

const server = http.createServer((req, res) => {
    console.log(req.url);
});
app.listen(3000);