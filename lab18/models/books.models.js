const db = require('../util/database');

exports.obtenerLibros = function() {
    return db.query("SELECT * FROM books");
};

exports.obtenerLibroID = function(id) {
    return db.query("SELECT * FROM books WHERE BookID = ?", [id]);
};

exports.agregarLibro = function(title, seriesId, authorId) {
    seriesId = seriesId || null;
    authorId = authorId || null;
    return db.query(
        "INSERT INTO books (Title, SeriesID, AuthorID) VALUES (?, ?, ?)",
        [title, seriesId, authorId]
    );
};

exports.actualizarLibro = function(id, newTitle) {
    return db.query(
        "UPDATE books SET Title = ? WHERE BookID = ?",
        [newTitle, id]
    );
};