const { Schema, model, Types } = require('mongoose');
// user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },
    thoughts: {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
    friends: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// create model of User
const User = model('User', userSchema);

// virtual to count # of friends
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
})

// exporting User model
module.exports = User;
