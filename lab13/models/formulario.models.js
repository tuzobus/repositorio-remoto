const path = require("path");
const fs = require("fs");

exports.procesarTexto = function(texto){
    fs.writeFileSync(path.resolve(__dirname, '../mensaje.txt'), texto, 'utf8');
}