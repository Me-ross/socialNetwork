const { Thought, User } = require('../models');

module.exports = {
// create a Thought and add it to it's associated user
createThought(req, res) {
  Thought.create(req.body)
  .then((newThought) =>
    !newThought
      ? res.status(404).json({ message: 'No thought created!' })
      : User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: newThought._id } },
        {new: true}
      )
  )
  .then ((updatedUser) =>
    !updatedUser
      ? res.status(404).json({
        message: 'Thought Created but no User found',
      })
    : res.json(updatedUser)
  ) 
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
},
 //Get all Thoughts
 getThoughts(req, res) {
    Thought.find()
      //minus (-) removes the version from the list of returned values   
      .select('-__v')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
   // Get a single thought
   getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      //minus (-)removes the version from the list of returned values   
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
    // Delete a thought and remove it from it's associated User
   deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((deletedThought) => 
      User.findOneAndUpdate(
        { username: deletedThought.username },
        { $pull: { thoughts: deletedThought._id } }, 
      )
    )
    .then ((updatedUser) =>
    !updatedUser
      ? res.status(404).json({
        message: 'Thought deleted but no User found',
      })
    : res.json(updatedUser)
  ) 
    .catch((err) => res.status(500).json(err));
  },
  // Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      {new: true},
    )
      .then((updatedThought) =>
        !updatedThought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(updatedThought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
// Add a Reaction
  addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true}
    )
      .then((reaction) =>
        !reaction
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
    // Remove reaction from a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((updatedThought) =>
        !updatedThought
          ? res.status(404).json({ message: 'No thought found with that ID :(' })
          : res.json(updatedThought)
      )
      .catch((err) => res.status(500).json(err));
  },

};