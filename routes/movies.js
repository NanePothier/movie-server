const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
const { movieValidation } = require('../validation/movieValidation');

router.get('/', moviesController.getAllMovies);

router.post('/movie', movieValidation, moviesController.createMovie);

router.get('/movie/:movieId', moviesController.getMovie);

module.exports = router;
