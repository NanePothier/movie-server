const { validationResult } = require('express-validator');

const { Movie } = require('../models/Movie');
const { NotFoundError } = require('../util/errors');

exports.getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.findAll();
    res.json({ movies });
  } catch (e) {
    console.log('Error in getAllMovies');
    res.status(500).send('Server Error: Could not retrieve movies.');
  }
};

exports.getMoviesByGenre = async (req, res, next) => {
  try {
    const genre = req.params.genre;
    const requestedGenre = genre.charAt(0).toUpperCase() + genre.substring(1);

    const movies = await Movie.findAll({
      where: {
        genre: requestedGenre,
      },
    });

    res.json({
      movies,
      genre: requestedGenre,
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
      const genre = req.body.genre;
      const year = req.body.year;
      const description = req.body.description;
      const director = req.body.director;
      const pgAge = req.body.pgAge;
      const imageUrl = req.body.imageUrl;

      const result = await Movie.create({
        title,
        genre,
        year,
        description,
        director,
        pgAge,
        imageUrl,
      });

      res.json({
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

    const movie = await Movie.findOne({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      throw new NotFoundError('Movie with specified id does not exist.');
    }

    res.json({
      movie,
    });
  } catch (error) {
    next(error);
  }
};

exports.editMovie = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({
        errors: errors.array(),
      });
    } else {
      const movieId = req.params.movieId;

      const title = req.body.title;
      const genre = req.body.genre;
      const year = req.body.year;
      const description = req.body.description;
      const director = req.body.director;
      const pgAge = req.body.pgAge;
      const imageUrl = req.body.imageUrl;

      const movie = await Movie.findOne({
        where: {
          id: movieId,
        },
      });

      if (!movie) {
        throw new NotFoundError(
          'Movie with specified id does not exist. Could not edit movie.'
        );
      }

      movie.title = title;
      movie.genre = genre;
      movie.year = year;
      movie.description = description;
      movie.director = director;
      movie.pgAge = pgAge;
      movie.imageUrl = imageUrl;

      movie.save();

      res.json({
        message: 'Movie update was successful.',
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const movieId = req.params.movieId;

    const numRowsDeleted = Movie.destroy({
      where: {
        id: movieId,
      },
    });

    if (!numRowsDeleted) {
      throw new NotFoundError(
        'Movie with specified id does not exist. Deletion was unsuccessful.'
      );
    }

    res.json({
      message: 'Deletion was successful.',
    });
  } catch (error) {
    next(error);
  }
};
