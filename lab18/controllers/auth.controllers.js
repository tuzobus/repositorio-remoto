const pool = require('../util/database');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        isAuthenticated: false,
        csrfToken: req.csrfToken()
    });
};

exports.getSignup = (req, res) => {
    res.render('auth/signup', {
        pageTitle: 'Signup',
        isAuthenticated: false,
        csrfToken: req.csrfToken()
    });
};

exports.postLogout = (req, res) => {
    req.session.destroy(err => {
        if (err) console.error(err);
        res.redirect('/');
    });
};

exports.postLogin = async (req, res) => {
    const { usuarioNombre, password } = req.body;
    let conn;

    try {
        conn = await pool.getConnection();
        const [user] = await conn.query(
            'SELECT usuarioID, usuarioNombre, password FROM usuarios WHERE usuarioNombre = ? LIMIT 1',
            [usuarioNombre]
        );

        if (!user) {
            return res.redirect('/auth/login');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.redirect('/auth/login');
        }

        req.session.isLoggedIn = true;
        req.session.user = {
            id: user.usuarioID,
            nombre: user.usuarioNombre
        };

        return res.redirect('/');
    } catch (err) {
        console.error('Error en login:', err);
        res.redirect('/auth/login');
    } finally {
        if (conn) conn.release();
    }
};

exports.postSignup = async (req, res) => {
    const { usuarioNombre, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.redirect('/auth/signup');
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const hashedPassword = await bcrypt.hash(password, 12);

        await conn.query(
            'INSERT INTO usuarios (usuarioNombre, password) VALUES (?, ?)',
            [usuarioNombre, hashedPassword]
        );

        res.redirect('/auth/login');
    } catch (err) {
        console.error('Error en registro:', err);
        res.redirect('/auth/signup');
    } finally {
        if (conn) conn.release();
    }
};