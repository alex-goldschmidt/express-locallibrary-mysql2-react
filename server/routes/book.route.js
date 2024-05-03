var express = require("express");
const bookController = require("../controllers/book.controller.js");
var router = express.Router();

router.post("/book/create", bookController.bookCreatePost);

router.get("/book/:id/delete", bookController.bookDeleteGet);

router.post("/book/:id/delete", bookController.bookDeletePost);

router.get("/book/:id/update", bookController.bookUpdateGet);

router.post("/book/:id/update", bookController.bookUpdatePost);

router.get("/book/:id", bookController.queryBookInstancesByBookId);

router.get("/books", bookController.queryAllBooks);

module.exports = router;
