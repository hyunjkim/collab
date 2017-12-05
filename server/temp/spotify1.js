const router = require('express').Router(),
      {User, SpotifyClient} = require('../db/models/associations'),
      PORT = 3000,
      SpotifyWebApi = require('spotify-web-api-node');
let {spotifyApi, refreshToken} = require('../spotify/spotifyMethods'),
      scopes = [
                'user-read-email',
                'user-read-private',
                'playlist-read-private',
                'playlist-read-collaborative',
                'playlist-modify-public',
                'playlist-modify-private'],
      state = 'spotify_auth_state',
      authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
const SpotifyStrategy = require('passport-spotify').Strategy
      passport = require('passport');

passport.use(new SpotifyStrategy({
    clientID: '16e9ba55e7e84c02897f32ddfad5eafd',
    clientSecret: '76b9924ddf8a4518921d7e35db4a2b68',
    callbackURL: 'http://localhost:3000/auth/spotify/callback',
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('LINE USERS INFO', profile)
    console.log('LINE USERS INFO', accessToken)
    console.log('LINE USERS INFO', refreshToken)
    User.findOrCreate({ spotifyId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

router.get('/',
  passport.authenticate(
    'spotify',
    {scope: scopes, showDialog: true}
  ),
  function(req, res){
    console.log('LINE 36', req.body)
   // The request will be redirected to spotify for authentication, so this
   // function will not be called.
});

router.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('LINE 40 - callback', req.body)
    // Successful authentication, redirect home.
    res.redirect('/login');
  });


module.exports = router;

// let spotifyApi = new SpotifyWebApi({
//         clientId :  "16e9ba55e7e84c02897f32ddfad5eafd",
//         clientSecret : "76b9924ddf8a4518921d7e35db4a2b68",
//         redirectUri : 'http://localhost:3000/auth/spotify/callback'
//       });
