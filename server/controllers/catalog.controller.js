const Book = require("../models/book.model");
const BookInstance = require("../models/bookInstance.model");
const Author = require("../models/author.model");
const Genre = require("../models/genre.model");
const { asyncHandler } = require("../utils/asyncErrorHandler");

exports.index = asyncHandler(async (req, res, next) => {
  const [
    bookCount,
    bookInstancesCount,
    bookInstancesAvailableCount,
    authorsCount,
    genresCount,
  ] = await Promise.all([
    Book.queryCount(),
    BookInstance.queryCount(),
    BookInstance.queryAvailableCount(),
    Author.queryCount(),
    Genre.queryCount(),
  ]);

  res.json({
    bookCount: bookCount,
    bookInstancesCount: bookInstancesCount,
    bookInstancesAvailableCount: bookInstancesAvailableCount,
    authorCount: authorsCount,
    genreCount: genresCount,
  });
});
