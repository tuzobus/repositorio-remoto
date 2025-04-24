const express = require('express');
const path    = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const rutasFormulario = require('./routes/formulario.routes');
app.use('/formulario', rutasFormulario);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/ruta2', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send("Ruta 2");
});

app.get('/ruta3', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send("Ruta 3");
});

app.get('/ruta4', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send("Ruta 4");
});

app.get('/ruta5', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send("Ruta 5");
});

app.use((req, res) => {
    res.status(404).send('ERROR 404: pagina no encontrada');
});

app.listen(3000);