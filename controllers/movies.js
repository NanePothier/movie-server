const { validationResult } = require('express-validator');

const movies = require('../data/movies');
const { Movie } = require('../models/Movie');

exports.getAllMovies = async (req, res, next) => {
  try {
    const movieData = await movies.getAll();
    res.json({ movies: movieData });
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
