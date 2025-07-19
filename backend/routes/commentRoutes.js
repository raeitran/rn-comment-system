const express = require("express");
const router = express.Router();
const {
  getCommentsByPost,
  getReplies,
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

// route = /:postId/comments

router.get("/", getCommentsByPost);
router.post("/", addComment);
router.get("/replies/:parentId", getReplies);
router.patch("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
