const Book = require('../models/books.models');

exports.mostrarLibros = async function(req, res) {
    try {
        const books = await Book.obtenerLibros();
        res.render('books/list', {books, numRuta: 3});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar libros');
    }
};

exports.mostrarFormAdd = function(req, res) {
    res.render('books/add', {numRuta: 3});
};

exports.agregarLibro = async function(req, res) {
    try {
        await Book.agregarLibro(req.body.title);
        res.redirect('/books');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error al guardar libro');
    }
};

exports.mostrarFormEdit = async function(req, res) {
    try {
        const [book] = await Book.obtenerLibroID(req.params.id);
        res.render('books/edit', {book, numRuta: 3});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar libro');
    }
};

exports.actualizarLibro = async function(req, res) {
    try {
        await Book.actualizarLibro(req.params.id, req.body.title);
        res.redirect('/books');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar libro');
    }
};