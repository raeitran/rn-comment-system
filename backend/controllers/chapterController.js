const mongoose = require("mongoose");
const Chapter = require("../models/chapter");

const getAllChapter = async (req, res) => {
  try {
    const comments = await Chapter.find({}).sort({
      createdAt: -1,
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const getChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(chapterId)) {
      return res.status(400).json({ error: "Invalid chapter ID" });
    }

    const chapter = await Chapter.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(chapterId) } },
      {
        $lookup: {
          from: "comments",
          let: { chapterId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$chapterId", "$$chapterId"] },
              },
            },
            { $sort: { createdAt: -1 } },
          ],
          as: "comments",
        },
      },
    ]);

    if (!chapter.length) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    res.status(200).json(chapter[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const addChapter = async (req, res) => {
  try {
    const { novelId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(novelId)) {
      return res.status(404).json({ error: `No such novel: ${novelId}` });
    }
    const { title, content, order } = req.body;
    const chapter = await Chapter.create({
      novelId: novelId,
      title,
      content,
      order,
    });

    res.status(201).json(chapter);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const updateChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such chapter" });
    }

    const chapter = await Chapter.findByIdAndUpdate(chapterId, req.body, {
      new: true, // get the updated doc back
      runValidators: true, // enforce schema rules on update
    });

    if (!chapter) {
      return res.status(404).json({ error: "No such chapter!" });
    }

    res.status(200).json("chapter updated successfully!");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(chapterId)) {
      return res.status(404).json({ error: "No such chapter" });
    }

    const chapter = await Chapter.findByIdAndDelete(chapterId);

    if (!chapter) {
      return res.status(404).json({ error: "no such chapter!" });
    }

    res.status(200).json("chapter deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllChapter,
  getChapter,
  addChapter,
  updateChapter,
  deleteChapter,
};
