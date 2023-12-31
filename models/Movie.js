const { v4: generateId } = require('uuid');

class Movie {
  constructor({ id, title, description, year, genre, imageUrl }) {
    this.id = id || generateId();
    this.title = title;
    this.description = description;
    this.year = year;
    this.genre = genre;
    this.imageUrl = imageUrl;
    this.timestamp = new Date().toLocaleString();
  }
}

exports.Movie = Movie;
