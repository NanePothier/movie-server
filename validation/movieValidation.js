const { body } = require('express-validator');
const { readDataFromFile } = require('../util/data');

exports.movieValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(
      'Invalid title. Title needs to be between 1 and 30 characters long.'
    ),
  body('description')
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage(
      'Invalid description. Description must be between 10 and 200 characters long.'
    ),
  body('year')
    .trim()
    .isNumeric()
    .withMessage('Invalid year. The year should only consist of numbers.'),
  body('genre')
    .trim()
    .isAlpha()
    .withMessage('Invalid genre. Genre should only consist of letters.')
    .custom(async (value) => {
      const genreData = await readDataFromFile('mock-data/genres.json');
      let found = false;
      const val = value.toLowerCase();

      genreData.genres.forEach((obj) => {
        if (obj.name === val) {
          found = true;
        }
      });

      if (found === false) {
        throw new Error(
          'Invalid genre. Please enter an existing genre or create a new one first.'
        );
      }
    }),
  body('imageUrl').trim().isLength({ min: 5 }),
];
