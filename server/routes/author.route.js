var express = require("express");
const authorController = require("../controllers/author.controller.js");
var router = express.Router();

router.get("/author/create", authorController.authorCreateGet);

router.post("/author/create", authorController.authorCreatePost);

router.get("/author/:id/delete", authorController.authorDeleteGet);

router.post("/author/:id/delete", authorController.authorDeletePost);

router.get("/author/:id/update", authorController.authorUpdateGet);

router.post("/author/:id/update", authorController.authorUpdatePost);

router.get("/author/:id", authorController.queryByAuthorId);

router.get("/authors", authorController.queryAllAuthors);

module.exports = router;
