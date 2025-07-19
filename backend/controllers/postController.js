const mongoose = require("mongoose");
const Post = require("../models/post");

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const addPost = async (req, res) => {
  try {
    const { title } = req.body;
    const user = req.user;
    const post = await Post.create({ userId: user._id, title });

    res.status(201).json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such Post" });
    }

    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true, // get the updated doc back
      runValidators: true, // enforce schema rules on update
    });

    if (!post) {
      return res.status(404).json({ error: "No such post!" });
    }

    res.status(200).json("Post updated successfully!");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such Post" });
    }

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ error: "no such post!" });
    }

    res.status(200).json("Post deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllPost,
  addPost,
  updatePost,
  deletePost,
};
