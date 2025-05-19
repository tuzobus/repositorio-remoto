const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const controller = require('../controllers/ajax.controllers');

router.get('/', controller.index);
router.get('/clientes', controller.visualizarClientes);

module.exports = router;