// Lab18
// Marco Iván Flores Villanueva

const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const csrf = require('csurf');
const bcrypt = require('bcryptjs');
const app = express();
const isAuth = require('./middleware/auth');

app.use(session({
    secret: 'stringsesiob',
    resave: false,
    saveUninitialized: false,
}));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const csrfProtection = csrf();
app.use(csrfProtection);

app.use((request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
});

const rutasBooks = require('./routes/books.routes');
const rutasFormulario = require("./routes/formulario.routes");
const rutasAuth = require('./routes/auth.routes');

app.use('/books', isAuth, rutasBooks);
app.use('/formulario', rutasFormulario);
app.use('/auth', rutasAuth);

let valorPrueba = 1;

app.get('/', (req, res) => {
    res.render('index', {
        numRuta: valorPrueba,
        isAuthenticated: req.session.isLoggedIn || false,
        csrfToken: req.csrfToken()
    });
});

app.get('/ruta2', (req, res, next) => {
    res.render('ruta2', {numRuta: 2, isAuthenticated: req.session.isLoggedIn});
});

app.get('/ruta4', (req, res, next) => {
    res.render('ruta4', {numRuta: 4, isAuthenticated: req.session.isLoggedIn});
});

app.use((req, res) => {
    res.status(404).send('ERROR 404: pagina no encontrada');
});

app.listen(3000);