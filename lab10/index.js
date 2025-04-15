/* Lab 10 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const {parse} = require("querystring");

const server = http.createServer((req, res) => {
    console.log("Petición recibida:", req.method, req.url);

    if (req.method === "GET") {
        if (req.url === "/") {
            fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
                if (err) {
                    res.writeHead(500, {"Content-Type": "text/plain"});
                    res.end("Error 500");
                } else {
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.end(data);
                }
            });
        } else if (req.url === "/contacto") {
            fs.readFile(path.join(__dirname, "contacto.html"), (err, data) => {
                if (err) {
                    res.writeHead(500, {"Content-Type": "text/plain"});
                    res.end("Error 500");
                } else {
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.end(data);
                }
            });
        } else if (req.url === "/acerca") {
            fs.readFile(path.join(__dirname, "acerca.html"), (err, data) => {
                if (err) {
                    res.writeHead(500, {"Content-Type": "text/plain"});
                    res.end("Error 500");
                } else {
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.end(data);
                }
            });
        } else if (req.url === "/styles.css") {
            fs.readFile(path.join(__dirname, "../styles.css"), (err, data) => {
                if (err) {
                    res.writeHead(500, {"Content-Type": "text/plain"});
                    res.end("Error 500");
                } else {
                    res.writeHead(200, {"Content-Type": "text/css"});
                    res.end(data);
                }
            });
        } else {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.end("Error 404: ruta no encontrada");
        }
    }

    else if (req.method === "POST" && req.url === "/enviar-datos") {
        let cuerpo = "";
        req.on("data", chunk => {
            cuerpo += chunk.toString();
        });
        req.on("end", () => {
            const datos = parse(cuerpo);
            const mensaje = datos.mensaje;

            fs.appendFile("datos.txt", mensaje + "\n", err => {
                if (err) {
                    res.writeHead(500, {"Content-Type": "text/plain"});
                    res.end("Error al guardar los datos.");
                } else {
                    res.writeHead(200, {"Content-Type": "text/plain"});
                    res.end("Datos recibidos y guardados.");
                }
            });
        });
    }

    else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("Error 404: ruta no encontrada");
    }
});

server.listen(3000);