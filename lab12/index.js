// Lab12
// Marco Iván Flores Villanueva
// Uso de EJS como motor

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const rutasFormulario = require('./routes/formulario.routes');
app.use('/formulario', rutasFormulario);

let valorPrueba = 1;

app.get('/', (req, res) => {
    res.render('index', {numRuta: valorPrueba});
});

app.get('/ruta2', (req, res) => {
    res.render('ruta2', {numRuta: 2});
});

app.get('/ruta3', (req, res) => {
    res.render('ruta3', {numRuta: 3});
});

app.get('/ruta4', (req, res) => {
    res.render('ruta4', {numRuta: 4});
});

app.use((req, res) => {
    res.status(404).send('ERROR 404: pagina no encontrada');
});

app.listen(3000);