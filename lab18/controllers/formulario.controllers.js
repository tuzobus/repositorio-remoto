const express = require("express");
const path = require("path");
const fs = require("fs");

const model = require("../models/formulario.models");

module.exports.index = async(req,res) =>{
    res.render("./formulario/guardar_texto", {
        numRuta: 5
    });
};

module.exports.guardar_texto = async(req,res) =>{
    const imprimir = req.body.imprimir;
    model.procesarTexto(imprimir);
    res.status(200).send('Texto procesado y guardado exitosamente');
};