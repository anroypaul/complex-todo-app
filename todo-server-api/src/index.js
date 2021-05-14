const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// const mongoose = require("mongoose");

const middlewares = require('./middlewares');
const authApi = require('./api/Auth');
const todosApi = require('./api/Todo');
const categoriesApi = require('./api/Category');

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

// test route
app.get('/', (req, res) => {
  res.json({message: 'Hello World!'});
});

app.use('/api/auth', authApi);
app.use('/api/todos', todosApi);
app.use('/api/categories', categoriesApi);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// app start
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
  // console.log("available routes:");
  // console.log(app._router.stack);
});
