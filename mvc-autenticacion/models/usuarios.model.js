const db = require("../utils/database.js");
const bcrypt = require("bcryptjs");

exports.login = function(correo,contrasena){
    return {
        nombre:"Samuel",
        id:1,
        activo:true
    };
}

exports.User = class  {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(my_username, my_name, my_password) {
        this.username = my_username;
        this.name = my_name;
        this.password = my_password;
    }
    //Este metodo servirá para guardar de manera persistente el nuevo objeto.
    async save() {
        try {
            const connection = await db();
            const hashedPass = await bcrypt.hash(this.password, 12);
            const result = await connection.execute(
                `INSERT INTO users (username, name, password) VALUES (?, ?, ?)`,
                [this.username, this.name, hashedPass]
            );
            await connection.release();
            return result;
        } catch (error) {
            throw error; // Re-throw the error for proper handling
        }
    }
    //Este metodo servirá para buscar un usuario por username
    //Es estático ya que a diferencia de save(), el primero se guarda al crear un usuario siempre, pero en este segundo podemos buscar un usuario sin crear un nuevo objeto usuario.
    static async findUser(username) {
        try {
            const connection = await db();
            const result = await connection.execute('Select * from users WHERE username = ?', [username]);
            await connection.release();
            return result;
        } catch (error) {
            throw error; // Re-throw the error for proper handling
        }
    }
}
