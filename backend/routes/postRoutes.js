const router = require("express").Router();
const {
  getAllPost,
  addPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

// route = /post

router.get("/", getAllPost);

router.post("/", addPost);

router.patch("/:id", updatePost);

router.delete("/:id", deletePost);

module.exports = router;
