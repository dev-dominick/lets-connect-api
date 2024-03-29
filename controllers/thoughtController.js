const { Thought, User } = require("../models");

module.exports = {

  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((Thoughts) => res.json(Thoughts))
      .catch((err) => res.status(500).json(err));
  },


  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.ThoughtId })
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: "No Thought with that ID" })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((Thought) => {
        console.log(Thought);
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: Thought } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
            message: "Thought created, but found no user with that ID",
          })
          : res.json("Created the Thought")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  
  // update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.ThoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: "No Thought with this id!" })
          : res.json(Thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // delete thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.ThoughtId })
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: "No Thought with this id!" })
          : User.findOneAndUpdate(
            { Thoughts: req.params.ThoughtId },
            { $pull: { Thoughts: req.params.ThoughtId } },
            { new: true }
          )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
            message: "Thought created but no user with this id!",
          })
          : res.json({ message: "Thought successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.ThoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: "No reaction with this id!" })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.ThoughtId },
      { $pull: { reactions: { reactionsId: req.params.reactionsId } } },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: "No reaction with this id!" })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
