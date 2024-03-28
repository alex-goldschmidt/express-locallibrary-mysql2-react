var express = require("express");
const bookInstanceController = require("../controllers/bookInstance.controller.js");
var router = express.Router();

router.get(
  "/bookInstance/create",
  bookInstanceController.bookInstanceCreateGet
);

router.post(
  "/bookInstance/create",
  bookInstanceController.bookInstanceCreatePost
);

router.get(
  "/bookInstance/:id/delete",
  bookInstanceController.bookInstanceDeleteGet
);

router.post(
  "/bookInstance/:id/delete",
  bookInstanceController.bookInstanceDeletePost
);

router.get(
  "/bookInstance/:id/update",
  bookInstanceController.bookInstanceUpdateGet
);

router.post(
  "/bookInstance/:id/update",
  bookInstanceController.bookInstanceUpdatePost
);

router.get("/bookInstance/:id", bookInstanceController.queryByBookInstanceId);

router.get("/bookInstances", bookInstanceController.queryAllBookInstances);

module.exports = router;
