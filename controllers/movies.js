const { validationResult } = require('express-validator');

const movies = require('../data/movies');
const { Movie } = require('../models/Movie');
const { NotFoundError } = require('../util/errors');
const { writeDataToFile } = require('../util/data');

exports.getAllMovies = async (req, res, next) => {
  try {
    const movieData = await movies.getAll();
    res.json({ movies: movieData });
  } catch (error) {
    next(error);
  }
};

exports.getMoviesByGenre = async (req, res, next) => {
  try {
    const genre = req.params.genre;

    const movieData = await movies.getAll();
    const filteredMovies = movieData.filter(
      (movie) => movie.genre.toLowerCase() === genre
    );

    res.json({
      movies: filteredMovies,
    });
  } catch (error) {
    next(error);
  }
};

exports.createMovie = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({
        errors: errors.array(),
      });
    } else {
      const title = req.body.title;
      const description = req.body.description;
      const year = req.body.year;
      const genre = req.body.genre;
      const imageUrl = req.body.imageUrl;

      await movies.createMovie(
        new Movie(title, description, year, genre, imageUrl)
      );

      res.status(201).json({
        message: 'Created movie successfully.',
        title: title,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getMovie = async (req, res, next) => {
  try {
    const movieId = req.params.movieId;

    const movieData = await movies.getAll();
    const movie = movieData.find((item) => item.id === movieId);

    if (!movie) {
      throw new NotFoundError('Movie with specified id does not exist.');
    }

    res.json({
      movie: movie,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const movieId = req.params.movieId;

    const movieData = await movies.getAll();
    const filteredMovies = movieData.filter((movie) => movie.id !== movieId);

    if (movieData.length === filteredMovies.length) {
      throw new NotFoundError(
        'Movie with specified id does not exist. Deletion was unsuccessful.'
      );
    }

    await writeDataToFile('mock-data/movies.json', { movies: filteredMovies });

    res.json({
      message: 'Deletion was successful.',
    });
  } catch (error) {
    next(error);
  }
};
