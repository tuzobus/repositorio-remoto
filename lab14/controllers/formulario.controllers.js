const express = require("express");
const path = require("path");
const fs = require("fs");

const model = require("../models/formulario.models");

module.exports.index = async (req, res) => {
    const ultimoTexto = req.cookies.ultimoTexto || '';

    res.render("./formulario/guardar_texto", {
        numRuta: 5,
        visitas: req.session.contadorVisitas['/formulario/guardar_texto'] || 0,
        ultimoTexto: ultimoTexto
    });
};

module.exports.guardar_texto = async (req, res) => {
    const texto = req.body.imprimir;

    model.procesarTexto(texto);

    res.cookie('ultimoTexto', texto, {
        maxAge: 3600,
        httpOnly: true
    });

    res.redirect('/formulario/guardar_texto');
};