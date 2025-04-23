const http    = require('http');
const express = require('express');
const path    = require('path');
const fs      = require('fs');
const app     = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const mariadb = require("mariadb");
const pool = mariadb.createPool({
    host:"localhost",
    user:"root",
    password:"875182",
    connectionLimit:5,
    database: "test",
    port:3306,
});

app.get('/', (request, response, next) => {
    response.setHeader('Content-Type', 'text/plain');
    response.send("Hola Mundo");
    response.end();
});

app.get("/test_db", async (req,res)=>{
    let conn;

    try{
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * from books");
        console.log(rows);
        const jsonS = JSON.stringify(rows);
        res.writeHead(200,{'Content-type':'text/html'});
        res.end(jsonS);
    } catch(e){
        console.log(e);
    }
});

const server = http.createServer( (request, response) => {
    console.log(request.url);
});
app.listen(3000);

/*
➜  interaccion-bd git:(ivan/feature) ✗ brew services start mariadb

Service `mariadb` already started, use `brew services restart mariadb` to restart.
➜  interaccion-bd git:(ivan/feature) ✗
➜  interaccion-bd git:(ivan/feature) ✗ pm2 start index.js --watch
[PM2] Spawning PM2 daemon with pm2_home=/Users/ivanfv/.pm2
[PM2] PM2 Successfully daemonized
[PM2] Starting /Users/ivanfv/tc2005b/interaccion-bd/index.js in fork_mode (1 instance)
[PM2] Done.
┌────┬──────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name     │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼──────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0  │ index    │ default     │ 1.0.0   │ fork    │ 89287    │ 0s     │ 0    │ online    │ 0%       │ 944.0kb  │ ivanfv   │ enabled  │
└────┴──────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
➜  interaccion-bd git:(ivan/feature) ✗
*/