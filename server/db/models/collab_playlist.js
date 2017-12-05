const Sequelize = require('sequelize');
const db = require('../spotifydb');

const CollabPlaylist = db.define('collabplaylist', {
  playlistId: {
    type: Sequelize.INTEGER
  }
});

module.exports = CollabPlaylist;
