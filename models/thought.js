const { Schema, model } = require("mongoose");
const reactionSchema = require('./reaction');

// thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },

    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// need to create a virtual to count # of reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// create model of Thought
const Thought = model("Thought", thoughtSchema);


// exporting Thought model
module.exports = Thought;
