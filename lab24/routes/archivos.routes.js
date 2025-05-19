const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const controller = require("../controllers/archivos.controllers");

router.get('/', controller.index);

router.post("/upload_file", controller.upload_file);
router.post("/upload_file_private", controller.upload_file_private);

router.get("/get_private_file/:file", controller.get_private_file);

module.exports = router;