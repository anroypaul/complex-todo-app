const jwt = require('jsonwebtoken');
const config = require('./config/auth.js');
const User = require('./schemas/User');
const {Sequelize} = require('sequelize');

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
};

const checkDuplicateUsername = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username,
  }).exec((error, user) => {
    if (error) {
      next(error);
      return; // TODO
    }

    if (user) {
      res.status(400).send({message: 'Failed! Username is already in use!'});
      return; // TODO
    }
  });
};

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  const refreshToken = req.headers['x-refresh-token'];

  if (!token || !refreshToken) {
    return res.status(403).send({message: 'No token provided!'});
  }

  jwt.verify(token, config.auth_secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({message: 'Unauthorized!'});
    }
    req.userId = decoded.id;
    next();
  });
};

const databaseConnection = () => {
  const credentials = {
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbName: process.env.DB_NAME,
  };

  const sequelize = new Sequelize(
    `postgres://${credentials.dbUser}:${credentials.dbPass}@${credentials.dbHost}:${credentials.dbPort}/${credentials.dbName}`,
  );

  const connection = async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };

  connection();
};

module.exports = {
  notFound,
  errorHandler,
  checkDuplicateUsername,
  verifyToken,
  databaseConnection,
};
