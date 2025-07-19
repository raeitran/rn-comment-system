const mongoose = require("mongoose");
const Comment = require("../models/comments");

const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(404).json({ error: "No such comment" });
    }

    const comments = await Comment.find({ postId, parentId: null }).sort({
      createdAt: -1,
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const getReplies = async (req, res) => {
  try {
    const { parentId } = req.params;
    const replies = await Comment.find({ parentId }).sort({ createdAt: -1 });
    res.status(200).json(replies);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const addComment = async (req, res) => {
  try {
    const { content, parentId = null } = req.body;
    const { postId } = req.params;
    const user = req.user;

    const comment = await Comment.create({
      postId,
      userId: user._id,
      content,
      parentId,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such comment" });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { content },
      {
        new: true, // get the updated doc back
        runValidators: true, // enforce schema rules on update
      }
    );

    if (!updatedComment) {
      return res.status(404).json({ error: "No such comment!" });
    }

    res.status(200).json("Comment updated successfully!");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such comment" });
    }

    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({ error: "No such comment!" });
    }

    res.status(200).json("Comment deleted successfully!");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getCommentsByPost,
  getReplies,
  addComment,
  updateComment,
  deleteComment,
};
