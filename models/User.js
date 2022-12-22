const { Schema, model } = require('mongoose');

// schema to create User model
const userSchema = new Schema (
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/]
    },
    // array of _id referencing the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    // array of _id self-referencing the User model
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
 // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// virtual that retrieves the length of the user's friends array field on query
userSchema
.virtual('friendCount')
.get(function () {
  return this.friends.length;
});

// initializing our User model
const User = model('user', userSchema);

module.exports = User;