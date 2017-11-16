const crypto = require('crypto');
const Sequelize = require('sequelize');
const db =  require('../spotifydb');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING
  },
  spotifyId: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
})

module.exports = User;
