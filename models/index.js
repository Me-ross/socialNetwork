const User = require('./User');
const Thought = require('./Thought');
// we do not need to require Reaction because it is schema only and is not being initialized in it's model file and will not be exported.

module.exports = { User, Thought };
 