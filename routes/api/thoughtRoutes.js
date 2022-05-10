const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router.route("/:ThoughtId").get(getSingleThought).delete(deleteThought).put(updateThought);

router.route("/:ThoughtId/reactions").post(addReaction)
router.route("/:ThoughtId/reactions/:reactionsId").delete(deleteReaction);

module.exports = router;