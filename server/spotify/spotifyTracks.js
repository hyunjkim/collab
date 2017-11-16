const router = require('express').Router(),
      {User,Tracks} = require('../db/models/associations');
let {spotifyApi, refreshToken} = require('./spotifyMethods');

/**
* GET TRACKS FROM SPOTIFY
*/
router.get('/:trackId/:spotifyName', (req, res, next) => {
  const spotifyName = req.params.spotifyName;
  const trackID = req.params.trackId;

  spotifyApi = refreshToken();
  spotifyApi.getPlaylistTracks(spotifyName, trackID, { 'offset' : 1, 'fields' : 'items' })
    .then(tracks => {
      console.log('The playlist contains these tracks', tracks.body);
    })
    .catch(err=>console.log("LINE 29-SPOTIFYTRACKS ERROR MESSAGE :", err));
});

module.exports = router


// api.getPlaylistTracks('thelinmichael', '3ktAYNcRHpazJ9qecm3ptn', { 'offset' : 1, 'limit' : 5, 'fields' : 'items' })
//   .then(function(data) {
//     console.log('The playlist contains these tracks', data.body);
//   }, function(err) {
//     console.log('Something went wrong!', err);
//   });
