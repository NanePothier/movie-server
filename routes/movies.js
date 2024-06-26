const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
const { movieValidation } = require('../validation/movieValidation');

router.get('/', moviesController.getAllMovies);

router.get('/genre/:genre', moviesController.getMoviesByGenre);

router.post('/movie', movieValidation, moviesController.createMovie);

router.get('/movie/:movieId', moviesController.getMovie);

router.put('/movie/:movieId', movieValidation, moviesController.editMovie);

router.delete('/movie/:movieId', moviesController.deleteMovie);

module.exports = router;
