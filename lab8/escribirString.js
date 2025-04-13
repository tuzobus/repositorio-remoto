const fs = require('fs');

function escribirString(nombreArchivo, contenido) {
    fs.writeFile(nombreArchivo, contenido, err => {
        if (err) {
            console.error(err);
        } else {
            console.log('Archivo creado: ', nombreArchivo);
        }
    });
}

escribirString('mensaje.txt', 'Este texto fue escrito con node.js');