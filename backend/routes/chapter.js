const express = require("express");
const router = express.Router({ mergeParams: true }); // inherit parent params
const {
  getAllChapter,
  getChapter,
  addChapter,
  updateChapter,
  deleteChapter,
} = require("../controllers/chapterController");

// api = /novel/:novelId/chapter

router.get("/", getAllChapter);

// Create a new chapter under a novel
router.post("/", addChapter);

router.get("/:chapterId", getChapter);

// Update a chapter by chapterId
router.patch("/:chapterId", updateChapter);

// Delete a chapter by chapterId
router.delete("/:chapterId", deleteChapter);

module.exports = router;
