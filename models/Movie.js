const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../util/database');
const { v4: generateId } = require('uuid');

class Movie extends Model {}

Movie.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    genre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    year: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    director: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pgAge: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize }
);

// class Movie {
//   constructor({ id, title, description, year, genre, imageUrl }) {
//     this.id = id || generateId();
//     this.title = title;
//     this.description = description;
//     this.year = year;
//     this.genre = genre;
//     this.imageUrl = imageUrl;
//     this.timestamp = new Date().toLocaleString();
//   }
// }

exports.Movie = Movie;
