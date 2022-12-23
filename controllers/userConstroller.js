const { User } = require('../models');

module.exports = {
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((newUser) => res.json(newUser))
      .catch((err) => res.status(500).json(err));
  },
  //Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
   // Get a single user
   getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((updatedUser) =>
        !updatedUser
          ? res.status(404).json({ message: 'No application with this id!' })
          : res.json(updatedUser)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
   // Delete a user and associated thoughts
   deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
    .then((deletedUser) => res.json(deletedUser))
    .catch((err) => res.status(500).json(err));
  },
  // Add a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: {friends: req.params.friendId} },
      { new: true }
    )
      .then((updatedUser) =>
      !updatedUser
        ? res.status(404).json({ message: 'No video with this id!' })
        : res.json(updatedUser)
    )
    .catch((err) => res.status(500).json(err));
  },
  // Delete a friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true },
    )
      .then((updatedUser) =>
      !updatedUser
        ? res.status(404).json({ message: 'No video with this id!' })
        : res.json(updatedUser)
    )
      .catch((err) => res.status(500).json(err));
  },
};



// deleteUser(req, res) {
//     User.findOneAndDelete({ _id: req.params.userId })
//       .then((user) =>
//         !user
//           ? res.status(404).json({ message: 'No user with that ID' })
//           : Thought.deleteMany
//           ({ _id: { $in: user.applications } })
//       )
//       .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
//       .catch((err) => res.status(500).json(err));
//   },