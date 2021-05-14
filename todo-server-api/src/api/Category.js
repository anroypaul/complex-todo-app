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

module.exports = router;
