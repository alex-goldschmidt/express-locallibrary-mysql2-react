const Author = require("../models/author.model");
const { asyncHandler } = require("../utils/asyncErrorHandler");
const { body, validationResult } = require("express-validator");

exports.queryAllAuthors = asyncHandler(async (req, res, next) => {
  const authorsList = await Author.queryAllAuthors();

  const response = res.json({
    title: "List of Authors",
    authorsList: authorsList,
  });

  return response;
});

exports.queryByAuthorId = asyncHandler(async (req, res, next) => {
  const authorId = req.params.id;
  const [author, authorBooks] = await Promise.all([
    Author.queryByAuthorId(authorId),
    Author.queryBooksByAuthorId(authorId),
  ]);

  if (author === null) {
    const err = new Error("Author not found");
    err.status = 404;
    return next(err);
  }

  const response = res.json({
    author: author,
    authorBooks: authorBooks,
  });

  return response;
});

exports.authorCreateGet = asyncHandler(async (req, res, next) => {
  res.render("authorForm", { title: "Create Author" });
});

exports.authorCreatePost = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified."),
  body("dateOfBirth", "Invalid date of birth")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("dateOfDeath", "Invalid date of death")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const author = new Author({
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      dateOfDeath: req.body.dateOfDeath ? req.body.dateOfDeath : null,
    });

    if (!errors.isEmpty()) {
      const badRequest = res.status(400).json({ errors: errors.array() });
      return badRequest;
    }

    const authorExists = await Author.queryByAuthorName({
      name: req.body.name,
    });

    if (authorExists) {
      return;
    }

    const data = await Author.create(author);
    const jsonResponse = res.json({
      newAuthor: data,
    });

    return jsonResponse;
  }),
];

exports.authorDeleteGet = asyncHandler(async (req, res, next) => {
  const authorId = req.params.id;

  const [author, allBooksByAuthor] = await Promise.all([
    Author.queryByAuthorId(authorId),
    Author.queryBooksByAuthorId(authorId),
  ]);

  if (author === null) {
    res.redirect("/catalog/authors");
  }

  const response = res.json({
    author: author,
    authorBooks: allBooksByAuthor,
  });

  res.redirect(`/catalog/author/${author.id}/delete`);
  return response;
});

exports.authorDeletePost = asyncHandler(async (req, res, next) => {
  const authorId = req.params.id;

  const [author, allBooksByAuthor] = await Promise.all([
    Author.queryByAuthorId(authorId),
    Author.queryBooksByAuthorId(authorId),
  ]);

  if (!author || allBooksByAuthor.length > 0) {
    return;
  }

  const data = await Author.deleteByAuthorId(authorId);

  const jsonResponse = res.json({
    deletedAuthor: data,
  });

  return jsonResponse;
});

exports.authorUpdateGet = asyncHandler(async (req, res, next) => {
  const authorId = req.params.id;
  const author = await Author.queryByAuthorIdWithFormatForDateInputs(authorId);

  if (author === null) {
    const err = new Error("Author not found");
    err.status = 404;
    return next(err);
  }

  res.redirect(`/catalog/author/${author.id}/update`);
});

exports.authorUpdatePost = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified."),
  body("dateOfBirth", "Invalid date of birth")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("dateOfDeath", "Invalid date of death")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const authorId = req.params.id;

    let author = new Author({
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      dateOfDeath: req.body.dateOfDeath ? req.body.dateOfDeath : null,
      id: authorId,
    });

    if (!errors.isEmpty()) {
      res.render("authorForm", {
        title: "Update Author",
        author: author,
        errors: errors.array(),
      });
      return;
    }
    await Author.updateByAuthorId(author, authorId);
    author = await Author.queryByAuthorId(authorId);

    const jsonResponse = res.json({
      updatedAuthor: author,
    });

    return jsonResponse;
  }),
];
