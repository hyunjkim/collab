const router = require('express').Router(),
      {User} = require('../db/models/associations'),
      PORT = 3000,
      SpotifyWebApi = require('spotify-web-api-node'),
      scopes = [
                'user-read-email',
                'user-read-private',
                'playlist-read-private',
                'playlist-read-collaborative',
                'playlist-modify-public',
                'playlist-modify-private'];
let {spotifyApi, refreshToken} = require('../spotify/spotifyMethods');
let generateRandomString = (length) => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
    return text;
};

/*
  When the client hits our /login endpoint, we need to direct them to Spotify’s authorization URL. We achieve this via:
*/
router.get('/', (req,res,next) => {
  const state = generateRandomString(16),
        authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  console.log('** AUTHORIZED URL **',authorizeURL);
  res.redirect(authorizeURL);
})

/**
* Retrieve an access token and a refresh token
*/
router.get('/callback', (req,res,next) => {
        const {code} = req.query;
        spotifyApi.authorizationCodeGrant(code)
                  .then(data => {
                    console.log('The token expires in ' + data.body['expires_in']);
                    console.log('The access token is ' + data.body['access_token']);
                    console.log('The refresh token is ' + data.body['refresh_token']);
                    /**
                    * Set the access token on the API object to use it in later calls
                    */
                    spotifyApi.setAccessToken(data.body['access_token']);
                    spotifyApi.setRefreshToken(data.body['refresh_token']);
                    res.redirect('/');
                  })
                  .catch(err => console.log('SPOTIFY.JS - LINE42 -  Something went wrong! :', err));
      })

router.get('/me', (req, res, next) => {
        spotifyApi = refreshToken();
        spotifyApi.getMe()
                  .then(data => {
                    console.log('\n\nSome information about the authenticated user', data.body,'\n\n');

                    const {id, display_name, email} = data.body;

                    User.findOrCreate({
                          where: {
                            spotifyId: id
                          },
                          defaults: {
                            name: display_name,
                            email: email
                            }
                        })
                        .spread((user, err) => {
                          console.log(user.get({plain: true}))
                        })
                        .catch(err => console.log('AUTH/SPOTIFY - LINE 65 - ERROR - ',err));
                    res.json(data.body);
                  })
                  .catch(err => console.log('SPOTIFY.JS - LINE 68 - Something went wrong! :', err));
      })

module.exports = router;
