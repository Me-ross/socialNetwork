const { Schema, model } = require('mongoose');
const formatDate = require('../utils/formatDate'); 
// import reaction that is being used in the array
const reactionSchema = require('./Reaction');

// schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => formatDate(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    // Array of nested documents created w/the reactionSchema
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  },
);

thoughtSchema
.virtual ('reactionCount')
.get(function (){
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;