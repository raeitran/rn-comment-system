const router = require("express").Router();
const {
  getAllnovel,
  getOneNovel,
  addnovel,
  updatenovel,
  deletenovel,
} = require("../controllers/novelController");

// api = /novel

router.get("/", getAllnovel);

router.post("/", addnovel);

router.get("/:id", getOneNovel);

router.patch("/:id", updatenovel);

router.delete("/:id", deletenovel);

module.exports = router;
