const Book = require("../models/book.model");
const BookInstance = require("../models/bookInstance.model");
const Author = require("../models/author.model");
const Genre = require("../models/genre.model");
const { asyncHandler } = require("../utils/asyncErrorHandler");
const { body, validationResult } = require("express-validator");
const validator = require("validator");

exports.queryAllBooks = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.queryAll();

  const response = res.json({
    title: "Book List",
    bookList: allBooks,
  });

  return response;
});

exports.queryBookInstancesByBookId = asyncHandler(async (req, res, next) => {
  const bookId = req.params.id;
  const [book, bookInstances] = await Promise.all([
    Book.queryByBookId(bookId),
    BookInstance.queryBooksByBookInstanceId(bookId),
  ]);

  const response = res.json({
    book: book,
    bookInstances: bookInstances,
  });

  return response;
});

// Handle book create on POST.
exports.bookCreatePost = [
  asyncHandler(async (req, res, next) => {
    const errors = [];

    const book = new Book({
      title: req.body.title.trim(),
      author: req.body.author.trim(),
      summary: req.body.summary.trim(),
      isbn: req.body.isbn.trim(),
      genre: req.body.genre.trim(),
    });

    if (!validator.isLength(book.title, { min: 1 })) {
      errors.push({ msg: "Book title must be specified." });
    }

    if (!validator.isLength(book.author, { min: 1 })) {
      errors.push({ msg: "Author must be specified." });
    }

    if (!validator.isLength(book.summary, { min: 1 })) {
      errors.push({ msg: "Book title must be specified." });
    }

    if (!validator.isLength(book.isbn, { min: 1 })) {
      errors.push({ msg: "Book ISBN must be specified." });
    }

    const [existingAuthor, existingGenre] = await Promise.all([
      Author.queryAuthorByName(book.author),
      Genre.queryGenreByName(book.genre),
    ]);

    if (!existingAuthor) {
      errors.push({ msg: "This author doesn't exist" });
    }

    if (!existingGenre) {
      errors.push({ msg: "This genre doesn't exist" });
    }

    if (errors.length > 0) {
      const badRequest = res.status(400).json({ errors: errors });
      return badRequest;
    }
    const data = await Book.create(book);
    const jsonResponse = res.json({
      newBook: data,
    });

    return jsonResponse;
  }),
];

exports.bookDeleteGet = asyncHandler(async (req, res, next) => {
  const bookId = req.params.id;

  const [book, bookInstancesByBookId] = await Promise.all([
    Book.queryByBookId(bookId),
    BookInstance.queryBooksByBookInstanceId(bookId),
  ]);

  if (book === null) res.redirect("/catalog/books");

  res.redirect(`/catalog/book/${book.id}/delete`, {
    book: book,
    bookInstances: bookInstancesByBookId,
  });
});

exports.bookDeletePost = asyncHandler(async (req, res, next) => {
  const bookId = req.params.id;

  const [book, bookInstancesByBookId] = await Promise.all([
    Book.queryByBookId(bookId),
    BookInstance.queryBooksByBookInstanceId(bookId),
  ]);

  if (bookInstancesByBookId.length > 0) {
    res.render("bookDelete", {
      title: "Delete Book",
      book: book,
      bookInstances: bookInstancesByBookId,
    });
    return;
  } else {
    await Book.deleteByBookId(bookId);
    res.redirect("/catalog/books");
  }
});

// Display book update form on GET.
exports.bookUpdateGet = asyncHandler(async (req, res, next) => {
  const bookId = req.params.id;
  const book = await Book.queryByBookId(bookId);
  const allAuthors = await Author.queryAllAuthors();
  const existingGenre = await Genre.queryAll();

  if (book === null) {
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }

  existingGenre.forEach((genre) => {
    if (book.genre.includes(genre.genreName)) genre.checked = "true";
  });

  res.render("bookForm", {
    title: "Update Book",
    authors: allAuthors,
    genres: existingGenre,
    book: book,
  });
});

// Handle book update on POST.
exports.bookUpdatePost = [
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const bookId = req.params.id;

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
      id: bookId,
    });

    if (errors.isEmpty()) {
      await Book.updateByBookId(book, bookId);
      const updatedBook = await Book.queryByBookId(bookId);
      res.redirect(`/catalog/book/${updatedBook.bookId}`);
    } else {
      const [allAuthors, existingGenre] = await Promise.all([
        Author.queryAuthorByName(book.author),
        Genre.queryGenreByName(book.genre),
      ]);

      existingGenre.forEach((genre) => {
        if (book.genre.includes(genre.genreName)) genre.checked = "true";
      });
      res.render("bookForm", {
        title: "Update Book",
        authors: allAuthors,
        genres: existingGenre,
        book: book,
        errors: errors.array(),
      });
    }
  }),
];
