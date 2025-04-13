/* Lab 8 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((request, response) => {
    console.log("Petición recibida:", request.url);
    if (request.url === "/") {
        fs.readFile(path.join(__dirname, "../index.html"), "utf8", (err, data) => {
            if (err) {
                response.statusCode = 500;
                response.end("Error en el servidor");
                return;
            }
            response.setHeader("Content-Type", "text/html");
            response.end(data);
        });
    }
    else if (request.url === "/styles.css") {
        fs.readFile(path.join(__dirname, "../styles.css"), (err, data) => {
            if (err) {
                response.statusCode = 500;
                response.end("Error en el servidor");
                return;
            }
            response.setHeader("Content-Type", "text/css");
            response.end(data);
        });
    }
    else {
        response.statusCode = 404;
        response.end("Archivo no encontrado");
    }
});

server.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
