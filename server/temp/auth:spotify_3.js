const passport = require('passport'),
      router = require('express').Router(),
      SpotifyWebApi = require('spotify-web-api-node'),
      {User} = require('../db/models/associations'),
      PORT = 3000,
      spotifyConfig = {
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_SECRET,
        callbackURL: process.env.SPOTIFY_CALLBACK
      };

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_SECRET) {

  console.log('Spotify client ID / secret not found. Skipping Spotify OAuth.');

} else {

  let generateRandomString = function(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  };


  let scopes = [
                'user-read-email',
                'user-read-private',
                'playlist-read-private',
                'playlist-read-collaborative',
                'playlist-modify-public',
                'playlist-modify-private'],
      redirectUri = spotifyConfig.callbackURL,
      clientId = spotifyConfig.clientID,
      state = generateRandomString(16);

  // Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
  let spotifyApi = new SpotifyWebApi({
    redirectUri : redirectUri,
    clientId : clientId
  });

  // Create the authorization URL
  let authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

  router.get('/', (req,res,next) => {
    console.log(authorizeURL);
    res.redirect(authorizeURL);
  })

  router.get('/callback',
    passport.authenticate('spotify', { failureRedirect: '/login' }),
    (req, res, next) => {
      res.redirect('/');
    });
}

router.get('/me', (req, res) => {
  res.json(req.user)
})

module.exports = router;
