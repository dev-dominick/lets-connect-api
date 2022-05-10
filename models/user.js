const { Schema, model } = require('mongoose');
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
    // thoughts: [{
    //   type: Schema.Types.ObjectId,
    //   ref: "Thought",
  
    // }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// virtual to count # of friends
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// create model of User
const User = model('User', userSchema);



// exporting User model
module.exports = User;
