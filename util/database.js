const Sequelize = require('sequelize');

const sequelize = new Sequelize('movie_database', 'postgres', 'password123', {
  host: 'movie_server_db',
  dialect: 'postgres',
  port: '5432',
});

module.exports = { sequelize };
