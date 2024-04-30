const Genre = require("../models/genre.model.js");
const { asyncHandler } = require("../utils/asyncErrorHandler");
const { body, validationResult } = require("express-validator");
const validator = require("validator");

// Display list of all Genre.
exports.queryAllGenres = asyncHandler(async (req, res, next) => {
  const genresList = await Genre.queryAll();

  const response = res.json({
    genresList: genresList,
  });

  return response;
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

  const response = res.json({
    genre: genre,
    booksInGenre: booksInGenre,
  });

  return response;
});

exports.genreCreatePost = [
  asyncHandler(async (req, res, next) => {
    const genre = new Genre({ genreName: req.body.genreName.trim() });

    const errors = [];

    if (!validator.isLength(genre.genreName, { min: 3 })) {
      errors.push({ msg: "Genre Name must be specified." });
    }

    if (errors.length > 0) {
      const badRequest = res.status(400).json({ errors: errors });
      return badRequest;
    }

    const existingGenre = await Genre.queryByGenreName(genre.genreName);

    if (existingGenre) {
      const existingGenreResponse = res.json({
        existingGenre: existingGenre,
      });
      return existingGenreResponse;
    }

    const newGenre = await Genre.create(genre);
    const genreCreatedResponse = res.json({
      newGenre: newGenre,
    });

    return genreCreatedResponse;
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
