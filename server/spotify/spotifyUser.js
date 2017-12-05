const router = require('express').Router(),
      {User} = require('../db/models/associations');
let {spotifyApi, refreshToken} = require('./spotifyMethods');
/**
* GET USER PLAYLIST FROM SPOTIFY DATABASE
*/
router.get('/:spotifyId', (req, res, next) => {
  const spotifyId = Number(req.params.spotifyId);

  spotifyApi = refreshToken();
  spotifyApi.getUserPlaylists(spotifyId)
    .then(playlist => {
        console.log('LINE 13-spotifyUSER.JS - ', playlist)
        res.json(playlist.body)
    })
    .catch(err=>console.log('Something went wrong!',err));

});

module.exports = router;

