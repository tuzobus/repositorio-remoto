const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host:"localhost",
    user:"root",
    password:"pass",
    connectionLimit:5,
    database: "test",
    port:3306,
});

module.exports = pool;