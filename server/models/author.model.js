const db = require("../config/db");

class Author {
  constructor(author) {
    this.authorId = author.authorId;
    this.name = author.name;
    this.dateOfBirth = author.dateOfBirth;
    this.dateOfDeath = author.dateOfDeath;
  }

  static async create(newAuthor) {
    const [result] = await db.query("INSERT INTO author SET ?", [newAuthor]);
    return { id: result.insertId, ...newAuthor };
  }

  static async queryAllAuthors() {
    const [rows] = await db.query(`
      SELECT *, DATE_FORMAT(dateOfBirth, '%b %e, %Y') AS formattedDateOfBirth, 
      DATE_FORMAT(dateOfDeath, '%b %e, %Y') AS formattedDateOfDeath 
      FROM author 
      ORDER BY name ASC
      `);
    return rows;
  }

  static async queryCount() {
    const [result] = await db.query(
      "SELECT COUNT(*) AS authorsCount FROM author"
    );
    const authorsCount = result[0].authorsCount;

    return authorsCount;
  }

  static async queryByAuthorId(authorId) {
    const [result] = await db.query(
      `SELECT a.*, 
      DATE_FORMAT(a.dateOfBirth, '%b %e, %Y') AS formattedDateOfBirth, 
      DATE_FORMAT(a.dateOfDeath, '%b %e, %Y') AS formattedDateOfDeath FROM author a WHERE authorId = ?`,
      [authorId]
    );
    return result[0];
  }

  static async queryByAuthorIdWithFormatForDateInputs(authorId) {
    const [result] = await db.query(
      `SELECT a.*, 
      DATE_FORMAT(a.dateOfBirth, '%Y-%m-%d') AS formattedDateOfBirth, 
      DATE_FORMAT(a.dateOfDeath, '%Y-%m-%d') AS formattedDateOfDeath FROM author a WHERE authorId = ?`,
      [authorId]
    );
    return result[0];
  }

  static async queryBooksByAuthorId(authorId) {
    const [result] = await db.query(
      `SELECT a.*, b.bookId as bookId, b.title AS bookTitle, b.summary AS bookSummary
      FROM author a 
      JOIN book b ON b.author = a.name
      WHERE authorId = ?`,
      [authorId]
    );
    return result;
  }

  static async queryByAuthorName(name) {
    const [result] = await db.query("SELECT * FROM author WHERE name = ?", [
      name,
    ]);
    return result[0];
  }

  static async queryAllAuthorsByAuthorName(name) {
    const [rows] = await db.query(`SELECT * FROM author WHERE name = ?`, [
      name,
    ]);
    return rows;
  }

  static async updateByAuthorId(author, authorId) {
    const [rows] = await db.query(
      "UPDATE author SET name = ?, dateOfBirth = ?, dateOfDeath = ? WHERE authorId = ?",
      [author.name, author.dateOfBirth, author.dateOfDeath, authorId]
    );
    return rows;
  }

  static async deleteByAuthorId(authorId) {
    const [result] = await db.query("DELETE FROM author WHERE authorId = ?", [
      authorId,
    ]);
    return result[0];
  }
}

module.exports = Author;
