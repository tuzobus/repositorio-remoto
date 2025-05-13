const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const controller = require("../controllers/formulario.controllers");

router.get('/guardar_texto', controller.index);

router.post('/guardar_texto', controller.guardar_texto);

module.exports = router;