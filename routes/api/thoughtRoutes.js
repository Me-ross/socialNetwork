const router = require('express').Router();

const {
    getThoughts,
    createThought,
    deleteThought,
    getSingleThought,
    updateThought,
    addReaction,
    removeReaction,
  } = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
.get(getThoughts)
.post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
.get(getSingleThought)
.delete(deleteThought)
.put(updateThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionsId
router.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);

module.exports = router;