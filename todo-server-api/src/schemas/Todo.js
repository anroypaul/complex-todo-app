const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  priority: {
    type: String,
    default: 'p1',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  comments: {
    type: [String],
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
});

module.exports = mongoose.model('Todo', TodoSchema);
