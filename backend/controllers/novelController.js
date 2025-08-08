const mongoose = require("mongoose");
const Novel = require("../models/novel");

const getAllnovel = async (req, res) => {
  try {
    const novels = await Novel.aggregate([
      {
        $lookup: {
          from: "chapters",
          let: { novelId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$novelId", "$$novelId"] } } },
            { $sort: { order: -1 } }, // optional: sort chapters by order
            { $limit: 2 }, // LIMIT to 2 chapters
          ],
          as: "chapters",
        },
      },
      { $sort: { createdAt: -1 } }, // sort novels
    ]);

    res.status(200).json(novels);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const getOneNovel = async (req, res) => {
  try {
    const { id: novelId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(novelId)) {
      return res.status(400).json({ error: "Invalid novel ID" });
    }

    const novel = await Novel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(novelId) } },
      {
        $lookup: {
          from: "chapters",
          let: { id: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$novelId", "$$id"] } } },
            { $sort: { order: -1 } },
          ],
          as: "chapters",
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { id: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$novelId", "$$id"] } } },
            {
              $lookup: {
                from: "chapters",
                localField: "chapterId",
                foreignField: "_id",
                as: "chapter",
              },
            },
            {
              $addFields: {
                chapterOrder: { $arrayElemAt: ["$chapter.order", 0] },
              },
            },
            {
              $project: {
                chapter: 0,
              },
            },
            { $sort: { createdAt: 1 } },
          ],
          as: "comments",
        },
      },
    ]);

    if (!novel.length) {
      return res.status(404).json({ error: "Novel not found" });
    }

    res.status(200).json(novel[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const addnovel = async (req, res) => {
  try {
    const { title, description, coverImage, author } = req.body;
    const novel = await Novel.create({
      title,
      description,
      coverImage,
      author,
    });

    res.status(201).json(novel);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const updatenovel = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such novel" });
    }

    const novel = await Novel.findByIdAndUpdate(id, req.body, {
      new: true, // get the updated doc back
      runValidators: true, // enforce schema rules on update
    });

    if (!novel) {
      return res.status(404).json({ error: "No such novel!" });
    }

    res.status(200).json("novel updated successfully!");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const deletenovel = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such novel" });
    }

    const novel = await Novel.findByIdAndDelete(id);

    if (!novel) {
      return res.status(404).json({ error: "no such novel!" });
    }

    res.status(200).json("novel deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllnovel,
  getOneNovel,
  addnovel,
  updatenovel,
  deletenovel,
};
