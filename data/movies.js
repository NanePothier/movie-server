const { NotFoundError } = require('../util/errors');
const { readDataFromFile, writeDataToFile } = require('../util/data');

async function getAll() {
  const movieData = await readDataFromFile('mock-data/movies.json');

  if (!movieData.movies) {
    throw new NotFoundError('Could not retrieve movie data.');
  }
  return movieData.movies;
}

async function createMovie(movie) {
  const existingData = await readDataFromFile('mock-data/movies.json');
  existingData.movies.push(movie);
  await writeDataToFile('mock-data/movies.json', existingData);
}

exports.getAll = getAll;
exports.createMovie = createMovie;
