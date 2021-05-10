const {verifyToken} = require('../middlewares');
const {Router} = require('express');

const User = require('../schemas/User');
const Todo = require('../schemas/Todo');

const router = new Router();

router.get('/', [verifyToken], async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.userId);
    res.json(currentUser.todos);
  } catch (error) {
    next(error);
  }
});

router.post('/', [verifyToken], async (req, res, next) => {
  try {
    const newTodo = new Todo(req.body);
    const currentUser = await User.findById(req.userId);
    currentUser.todos.push(newTodo);
    await currentUser.save();
    res.json(newTodo);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.put('/', [verifyToken], async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.userId);
    const todoToUpdate = currentUser.todos.id(req.body.todoId);
    todoToUpdate.set(req.body);
    await currentUser.save();
    res.json(todoToUpdate);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.delete('/:id', [verifyToken], async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.userId);
    currentUser.todos.id(req.params.id).remove();
    await currentUser.save();
    res.status(200).send('Todo has been successfully deleted');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
