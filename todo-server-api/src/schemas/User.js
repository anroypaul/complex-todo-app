const mongoose = require('mongoose');
const Todo = require('./Todo');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {type: String, required: true},
  todos: [Todo.schema],
  // categories: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Category",
  //   },
  // ],
});

module.exports = mongoose.model('User', UserSchema);
