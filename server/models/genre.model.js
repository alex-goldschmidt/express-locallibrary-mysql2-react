const db = require("../config/db");

class Genre {
  constructor(genre) {
    this.genreId = genre.genreId;
    this.genreName = genre.genreName;
  }

  static async create(newGenre) {
    const [result] = await db.query("INSERT INTO genre SET ?", [newGenre]);
    return { genreId: result.insertId, genreName: newGenre.genreName };
  }

  static async queryAll() {
    const [rows] = await db.query("SELECT * FROM genre");
    return rows;
  }

  static async queryCount() {
    const [count] = await db.query("SELECT COUNT(*) AS genresCount FROM genre");
    let genresCount = count[0].genresCount;

    return genresCount;
  }

  static async queryByGenreId(genreId) {
    const [result] = await db.query("SELECT * FROM genre WHERE genreId = ?", [
      genreId,
    ]);
    return result[0];
  }

  static async queryByGenreName(genreName) {
    const [result] = await db.query("SELECT * FROM genre WHERE genreName = ?", [
      genreName,
    ]);
    return result[0];
  }

  static async queryAllByGenreName(genreName) {
    const [result] = await db.query("SELECT * FROM genre WHERE genreName = ?", [
      genreName,
    ]);
    return result;
  }

  static async updateByGenreId(genre, genreId) {
    const [rows] = await db.query(
      "UPDATE genre SET genreName = ? WHERE genreId = ?",
      [genre.genreName, genreId]
    );
    return rows;
  }

  static async deleteByGenreId(genreId) {
    const [result] = await db.query("DELETE FROM genre WHERE genreId = ?", [
      genreId,
    ]);
    return result[0];
  }

  static async queryBooksByGenreId(genreId) {
    const [result] = await db.query(
      `SELECT b.title AS bookTitle, b.summary AS bookSummary, b.bookId AS bookId, g.genreName AS genreName FROM book b 
      LEFT JOIN genre g ON b.genre = g.genreName WHERE genreId = ?`,
      [genreId]
    );
    return result;
  }
}

module.exports = Genre;
