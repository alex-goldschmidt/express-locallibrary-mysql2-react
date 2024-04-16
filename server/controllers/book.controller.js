const Book = require("../models/book.model");
const BookInstance = require("../models/bookInstance.model");
const Author = require("../models/author.model");
const Genre = require("../models/genre.model");
const { asyncHandler } = require("../utils/asyncErrorHandler");
const { body, validationResult } = require("express-validator");

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

// Display book create form on GET.
exports.bookCreateGet = asyncHandler(async (req, res, next) => {
  const [allAuthors, allGenres] = await Promise.all([
    Author.queryAllAuthors(),
    Genre.queryAll(),
  ]);

  res.render("bookForm", {
    title: "Create Book",
    authors: allAuthors,
    genres: allGenres,
  });
});

// Handle book create on POST.
exports.bookCreatePost = [
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

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
    });

    if (errors.isEmpty()) {
      const newBook = await Book.create(book);
      res.redirect(`/catalog/book/${newBook.id}`);
    } else {
      const [allAuthors, allGenres] = await Promise.all([
        Author.queryAllAuthorsByAuthorName(book.author),
        Genre.queryAllByGenreName(book.genre),
      ]);

      allGenres.forEach((genre) => {
        if (book.genre.includes(genre.genreName)) genre.checked = "true";
      });
      res.render("bookForm", {
        title: "Create Book",
        authors: allAuthors,
        genres: allGenres,
        book: book,
        errors: errors.array(),
      });
    }
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
  const allGenres = await Genre.queryAll();

  if (book === null) {
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }

  allGenres.forEach((genre) => {
    if (book.genre.includes(genre.genreName)) genre.checked = "true";
  });

  res.render("bookForm", {
    title: "Update Book",
    authors: allAuthors,
    genres: allGenres,
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
      const [allAuthors, allGenres] = await Promise.all([
        Author.queryAllAuthorsByAuthorName(book.author),
        Genre.queryAllByGenreName(book.genre),
      ]);

      allGenres.forEach((genre) => {
        if (book.genre.includes(genre.genreName)) genre.checked = "true";
      });
      res.render("bookForm", {
        title: "Update Book",
        authors: allAuthors,
        genres: allGenres,
        book: book,
        errors: errors.array(),
      });
    }
  }),
];
