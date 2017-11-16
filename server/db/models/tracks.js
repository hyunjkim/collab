const db = require('../spotifydb');
const Sequelize = db.Sequelize;

const Tracks = db.define('tracks', {
  trackID : Sequelize.STRING(1e4),
  name: {
    type: Sequelize.STRING(1e4)
  },
  tracks:{
    type: Sequelize.STRING(1e4)
  },

});

module.exports = Tracks;
