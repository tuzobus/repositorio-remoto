const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host:"localhost",
    user:"root",
    password:"875182",
    connectionLimit:5,
    database: "ventadb-test",
    port:3306,
});

module.exports = pool;