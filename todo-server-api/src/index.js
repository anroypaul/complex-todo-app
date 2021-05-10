const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {Sequelize} = require('sequelize');

// const mongoose = require("mongoose");

const middlewares = require('./middlewares');
const authApi = require('./api/Auth');
const todosApi = require('./api/Todo');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
);
app.use(express.json());
app.use(morgan('common'));

// database connection
// mongo
// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// });
// const connection = mongoose.connection;

// connection.once("open", () => {
//   console.log("MongoDB database connection established successfully");
// });

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

// test route
app.get('/', (req, res) => {
  res.json({message: 'Hello World!'});
});

app.use('/api/auth', authApi);
app.use('/api/todos', todosApi);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// app start
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
  // console.log("available routes:");
  // console.log(app._router.stack);
});
