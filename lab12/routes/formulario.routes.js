const express = require('express');
const path    = require('path');
const fs      = require('fs');
const router = express.Router();

router.get('/form_method', (req, res) => {
    res.render('form', {numRuta: 5});
});

router.post('/form_method', (req, res) => {
    const imprimir = req.body.imprimir;
    fs.writeFileSync(path.resolve(__dirname, '../mensaje.txt'), imprimir, 'utf8');
    res.status(200).send('Texto guardado');
});

module.exports = router;