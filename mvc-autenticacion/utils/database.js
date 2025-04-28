const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host:"localhost",
    user:"root",
    password:"875182",
    connectionLimit:5,
    database: "users_test",
    port: "3306"
});

module.exports = async() =>{
    try {
        const connection = await pool.getConnection();
        return connection;
    }catch(error){
        throw error;
    }
}

/*
SELECT *
FROM users;
*/