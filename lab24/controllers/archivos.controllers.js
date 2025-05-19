const express = require("express");
const fs = require("fs");
const log = console.log;
const multer = require("multer");
const path    = require('path');

module.exports.index = async(req,res) =>{
    res.render('archivos/index', {numRuta: 2});
};

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const destPath = path.resolve(__dirname, '../public');
        callback(null, destPath);
    },
    filename: function (req, file, callback) {
        return callback(null, file.originalname);
    }
});

const upload = multer({storage: storage}).array("file",1);

module.exports.upload_file = async (req,res) =>{
    log("Cargando el archivo");

    upload(req,res,function(err){
        if(err){
            console.error(err);
            console.log(err);
            return res.status(500).json({code: 500, msg:"Error uploading file"});
        }

        log("Upload succesful:", req.files); //Log uploaded files
        res.status(200).send('Archivo subido exitosamente');
    })
}

const storage_private = multer.diskStorage({
    destination: function (req, file, callback) {
        const destPath = path.resolve(__dirname, '../private');
        callback(null, destPath);
    },
    filename: function (req, file, callback) {
        return callback(null, file.originalname);
    }
});

const upload_private = multer({storage: storage_private}).array("file",1);

module.exports.upload_file_private = async (req,res) =>{
    log("Cargando el archivo");

    upload_private(req,res,function(err){
        if(err){
            console.error(err);
            return res.status(500).json({code: 500, msg:"Error uploading file"});
        }

        log("Upload succesful:", req.files); //Log uploaded files
        res.status(200).send('Archivo privado subido exitosamente');
    })
}

module.exports.get_private_file = async (req,res)=>{
    var fileName = req.params.file;
    res.sendFile(path.join(__dirname, "../private", fileName));
}