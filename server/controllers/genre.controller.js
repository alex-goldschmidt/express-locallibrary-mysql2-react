const Genre = require("../models/genre.model.js");
const { asyncHandler } = require("../utils/asyncErrorHandler");
const { body, validationResult } = require("express-validator");

// Display list of all Genre.
exports.queryAllGenres = asyncHandler(async (req, res, next) => {
  const genresList = await Genre.queryAll();
  res.render("genresList", {
    title: "List of Genres",
    genresList: genresList,
  });
});

// Display books for a specific Genre ID.
exports.queryBooksByGenreId = asyncHandler(async (req, res, next) => {
  const genreId = req.params.id;
  const genre = await Genre.queryByGenreId(genreId);
  const booksInGenre = await Genre.queryBooksByGenreId(genreId);

  if (genre === null) {
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }
  return res.render("genreDetail", {
    title: genre.genreName,
    genre: genre,
    booksInGenre: booksInGenre,
  });
});

// Display genre create form on GET.
exports.genreCreateGet = asyncHandler(async (req, res, next) => {
  res.render("genreForm", { title: "Create Genre" });
});

exports.genreCreatePost = [
  body("genreName", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const genre = new Genre({ genreName: req.body.genreName });

    if (errors.isEmpty()) {
      const genreExists = await Genre.queryByGenreName({
        genreName: req.body.genreName,
      });
      if (genreExists) {
        res.redirect(`/catalog/genre/${genreExists.genreId}`);
      } else {
        const data = await Genre.create(genre);
        res.redirect(`/catalog/genre/${data.genreId}`);
      }
    } else {
      res.render("genreForm", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    }
  }),
];

// Display genre delete form on GET.
exports.genreDeleteGet = asyncHandler(async (req, res, next) => {
  const genreId = req.params.id;

  const [genre, genreBooks] = await Promise.all([
    Genre.queryByGenreId(genreId),
    Genre.queryBooksByGenreId(genreId),
  ]);

  if (genre === null) {
    res.redirect("/catalog/genres");
  }

  res.render("genreDelete", {
    genre: genre,
    genreBooks: genreBooks,
  });
});

exports.genreDeletePost = asyncHandler(async (req, res, next) => {
  const genreId = req.params.id;

  const [genre, genreBooks] = await Promise.all([
    Genre.queryByGenreId(genreId),
    Genre.queryBooksByGenreId(genreId),
  ]);

  if (genreBooks.length > 0) {
    res.render("genreDelete", {
      title: "Delete Genre",
      genre: genre,
      genreBooks: genreBooks,
    });
    return;
  } else {
    await Genre.deleteByGenreId(genreId);
    res.redirect("/catalog/genres");
  }
});

// Display genre update form on GET.
exports.genreUpdateGet = asyncHandler(async (req, res, next) => {
  const genreId = req.params.id;
  const genre = await Genre.queryByGenreId(genreId);

  if (genre === null) {
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }

  res.render("genreForm", {
    title: "Update Genre",
    genre: genre,
  });
});

exports.genreUpdatePost = [
  body("genreName", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const genreId = req.params.id;
    const genre = new Genre({ genreName: req.body.genreName });

    if (errors.isEmpty()) {
      await Genre.updateByGenreId(genre, genreId);
      const updatedGenre = await Genre.queryByGenreId(genreId);
      res.redirect(`/catalog/genre/${updatedGenre.genreId}`);
    } else {
      res.render("genreForm", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    }
  }),
];
