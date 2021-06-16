const {verifyToken} = require('../middlewares');
const {Router} = require('express');
const Todo = require('../db/models').Todo;

const router = new Router();

router.get('/', [verifyToken], async (req, res, next) => {
  try {
    // get all current user todo list
    // const category = req.params.categoryId;
    const todoList = await Todo.findAll({where: {UserId: req.userId}});
    res.json(todoList);
  } catch (error) {
    next(error);
  }
});

router.post('/', [verifyToken], async (req, res, next) => {
  try {
    // save todo in current category
    // TODO validate
    const {description, dueDate, CategoryId} = req.body;
    const newTodo = await Todo.create({
      description,
      dueDate,
      CategoryId,
      UserId: req.userId,
    });
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
    // update current todo by id
    // TODO validate
    const todoToUpdate = await Todo.update(req.body.todoId, {
      where: {id: req.body.todoId},
    });
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
    // delete current todo
    await Todo.destroy({
      where: {
        id: {$eq: req.params.id},
      },
    });
    res.status(200).send('Todo has been successfully deleted');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
