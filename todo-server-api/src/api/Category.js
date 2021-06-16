const Sequelize = require('sequelize');
const {verifyToken} = require('../middlewares');
const {Router} = require('express');
const Category = require('../db/models').Category;
const Todo = require('../db/models').Todo;

const router = new Router();

router.get('/current', [verifyToken], async (req, res, next) => {
  try {
    // get all current user todo list
    // const category = req.params.categoryId;
    const categoryList = await Category.findAll({
      where: {UserId: req.userId},
      attributes: {
        include: [
          [Sequelize.fn('COUNT', Sequelize.col('Todos.id')), 'todoCount'],
        ],
      },
      include: [
        {
          model: Todo,
          attributes: [],
        },
      ],
      group: ['Category.id'],
    });
    res.json(categoryList);
  } catch (error) {
    next(error);
  }
});

router.post('/', [verifyToken], async (req, res, next) => {
  try {
    // save todo in current category
    // TODO validate
    const {name} = req.body;
    const newCategory = await Category.create({
      name,
      UserId: req.userId,
    });
    const result = newCategory.toJSON();
    result.todoCount = 0;
    res.json(result);
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
    const categoryToUpdate = await Category.update(req.body.categoryId, {
      where: {id: req.body.categoryId},
    });
    res.json(categoryToUpdate);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.get('/:id/todos', [verifyToken], async (req, res, next) => {
  try {
    let todoList;
    if (!isNaN(parseInt(req.params.id))) {
      todoList = await Todo.findAll({
        where: {CategoryId: parseInt(req.params.id)},
      });
    } else {
      if (req.params.id === 'INBOX') {
        todoList = await Todo.findAll({
          where: {CategoryId: null},
        });
      }
      if (req.params.id === 'TODAY') {
        todoList = await Todo.findAll({
          //  where: {CategoryId: {$eq: null}},
        });
      }
      if (req.params.id === 'UPCOMING') {
        todoList = await Todo.findAll({
          //  where: {CategoryId: {$eq: null}},
        });
      }
    }
    res.json(todoList);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
