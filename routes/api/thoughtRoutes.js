const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router.route("/:thoughtId").get(getSingleThought).delete(deleteThought).put(updateThought);

// router.route("/:thoughtId/reactions").post(addFriend).delete(deleteFriend);

module.exports = router;