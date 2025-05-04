// Lab14
// Marco Iván Flores Villanueva

const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(session({
    secret: 'pass',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, httpOnly: true}
}));

app.use((req, res, next) => {
    if (!req.session.contadorVisitas) {
        req.session.contadorVisitas = {};
    }

    const rutaActual = req.path;
    req.session.contadorVisitas[rutaActual] = (req.session.contadorVisitas[rutaActual] || 0) + 1;

    next();
});

app.get('/', (req, res, next) => {
    res.render('index', {
        numRuta: 1,
        visitas: req.session.contadorVisitas['/'] || 0
    });
});

app.get('/ruta2', (req, res, next) => {
    res.render('ruta2', {
        numRuta: 2,
        visitas: req.session.contadorVisitas['/ruta2'] || 0
    });
});

app.get('/ruta3', (req, res, next) => {
    res.render('ruta3', {
        numRuta: 3,
        visitas: req.session.contadorVisitas['/ruta3'] || 0
    });
});

app.get('/ruta4', (req, res, next) => {
    res.render('ruta4', {
        numRuta: 4,
        visitas: req.session.contadorVisitas['/ruta4'] || 0
    });
});

const rutasFormulario = require("./routes/formulario.routes");
app.use('/formulario', rutasFormulario);

app.use((req, res) => {
    res.status(404).send('ERROR 404: pagina no encontrada');
});

const server = http.createServer((req, res) => {
    console.log(req.url);
});
app.listen(3000);