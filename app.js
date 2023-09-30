const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/movies');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/movies', movieRoutes);

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || 'Something went wrong.';
  res.status(errorStatus).json({ message: errorMessage });
});

app.use('/', (req, res, next) => {
  res.status(404).send('<h1>Page not found.</h1>');
});

const server = http.createServer(app);
server.listen(8080);
