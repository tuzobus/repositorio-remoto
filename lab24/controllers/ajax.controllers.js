const pool = require('../util/database');

exports.index = async (req, res) => {
    res.render('ajax/index', {
        numRuta: 1
    });
}

exports.visualizarClientes = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * from clientes");
        res.json(rows);
    } catch (e) {
        console.error('Database error:', e);
        res.status(500).json({ error: 'Database query failed' });
    } finally {
        if (conn) conn.release();
    }
};