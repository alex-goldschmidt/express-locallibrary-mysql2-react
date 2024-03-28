const db = require("../config/db");

class Book {
  constructor(book) {
    this.bookId = book.bookId;
    this.title = book.title;
    this.author = book.author;
    this.summary = book.summary;
    this.isbn = book.isbn;
    this.genre = book.genre;
  }

  static async create(newBook) {
    const [result] = await db.query("INSERT INTO book SET ?", [newBook]);
    return { id: result.insertId, ...newBook };
  }

  static async queryAll() {
    const [rows] = await db.query("SELECT * FROM book");
    return rows;
  }

  static async queryCount() {
    const [count] = await db.query("SELECT COUNT(*) as booksCount FROM book");
    let booksCount = count[0].booksCount;
    return booksCount;
  }

  static async queryByBookId(bookId) {
    const [result] = await db.query(
      `SELECT b.*, g.genreId AS genreId FROM book b
       LEFT JOIN genre g ON g.genreName = b.genre
       WHERE bookId = ?`,
      [bookId]
    );
    return result[0];
  }

  static async queryAllByGenre(genreName) {
    const [result] = await db.query("SELECT * FROM book WHERE genre = ?", [
      genreName,
    ]);
    return result;
  }

  static async updateByBookId(book, bookId) {
    const [rows] = await db.query(
      "UPDATE book SET title = ?, author = ?, summary = ?, isbn = ?, genre = ? WHERE bookId = ?",
      [book.title, book.author, book.summary, book.isbn, book.genre, bookId]
    );
    return rows;
  }

  static async deleteByBookId(bookId) {
    const [result] = await db.query("DELETE FROM book WHERE bookId = ?", [
      bookId,
    ]);
    return result[0];
  }
}

module.exports = Book;
