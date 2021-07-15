const {verifyToken} = require('../middlewares');
const {Router} = require('express');
const Todo = require('../db/models').Todo;

const router = new Router();

router.get('/', [verifyToken], async (req, res, next) => {
  try {
    // get all current user todo list
    // const category = req.params.categoryId;
    const size = req.query.size;
    const page = req.query.page;

    const limit = size ? +size : 10;
    const offset = page ? (page - 1) * limit : 0;

    const todoList = await Todo.findAndCountAll({
      limit,
      offset,
      where: {UserId: req.userId},
    });

    const {count: totalItems, rows: rows} = todoList;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    res.json({totalItems, rows, totalPages, currentPage});
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

router.put('/:id', [verifyToken], async (req, res, next) => {
  try {
    // update current todo by id
    // TODO validate
    const todoToUpdate = await Todo.findByPk(req.params.id);
    if (todoToUpdate === null) {
      res.status(404);
    } else {
      console.log(req.body.dueDate);
      await todoToUpdate.update({
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        completed: req.body.completed,
      });
      res.json(todoToUpdate);
    }
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
    const idToDelete = req.params.id;
    await Todo.destroy({
      where: {
        id: idToDelete,
      },
    });
    res.status(200).send('Todo has been successfully deleted');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
