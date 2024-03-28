var express = require("express");
var router = express.Router();

var bookRoute = require("./book.route.js");
var authorRoute = require("./author.route.js");
var bookInstanceRoute = require("./bookInstance.route.js");
var genreRoute = require("./genre.route.js");

var catalogController = require("../controllers/catalog.controller.js");

router.get("/", catalogController.index);

router.use("/", bookRoute);
router.use("/", authorRoute);
router.use("/", bookInstanceRoute);
router.use("/", genreRoute);

module.exports = router;
