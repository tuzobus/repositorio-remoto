const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const controller = require('../controllers/books.controllers');

router.get('/', controller.mostrarLibros);
router.get('/add', controller.mostrarFormAdd);
router.post('/add', controller.agregarLibro);
router.get('/edit/:id', controller.mostrarFormEdit);
router.post('/edit/:id', controller.actualizarLibro);

module.exports = router;