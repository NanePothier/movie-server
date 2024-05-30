const http = require('http');
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

const { sequelize } = require('./util/database');
const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');
const Movie = require('./models/Movie');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(
  session({
    secret: 'should be a long string',
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/user', userRoutes);

app.use('/movies', movieRoutes);

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || 'Something went wrong.';
  res.status(errorStatus).json({ message: errorMessage });
});

app.use('/', (req, res, next) => {
  res.status(404).send('<h1>Page not found.</h1>');
});

sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(8080, () => {
      console.log('Listening on port 8080');
    });
  })
  .catch((error) => {
    console.log(error);
  });

// const server = http.createServer(app);
// server.listen(8080);
