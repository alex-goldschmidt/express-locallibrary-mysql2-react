var express = require("express");
const genreController = require("../controllers/genre.controller.js");
var router = express.Router();

router.get("/genre/create", genreController.genreCreateGet);

router.post("/genre/create", genreController.genreCreatePost);

router.get("/genre/:id/delete", genreController.genreDeleteGet);

router.post("/genre/:id/delete", genreController.genreDeletePost);

router.get("/genre/:id/update", genreController.genreUpdateGet);

router.post("/genre/:id/update", genreController.genreUpdatePost);

router.get("/genre/:id", genreController.queryBooksByGenreId);

router.get("/genres", genreController.queryAllGenres);

module.exports = router;
