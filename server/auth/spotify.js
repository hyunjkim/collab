const router = require('express').Router(),
      {User} = require('../db/models/associations'),
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

// if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_SECRET) {
//   console.log('Spotify client ID / secret not found. Skipping Spotify OAuth.');
// } else {
//   router.get('/', (req,res,next) => {
//     console.log('** AUTHORIZED URL **',authorizeURL);
//     res.redirect(authorizeURL);
//   })
// }

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_SECRET) {
  console.log('Spotify client ID / secret not found. Skipping Spotify OAuth.');
} 

router.get('/', (req,res,next) => {
  console.log('** AUTHORIZED URL **',authorizeURL);
  res.redirect(authorizeURL);
})

/**
* Retrieve an access token and a refresh token
*/
router.get('/callback', (req,res,next) => {
        const {code} = req.query;
        process.env.SPOTIFY_CODE = code;
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
                  .catch(err => console.log('LINE48 - SPOTIFY.JS - Something went wrong!', err));
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
                        .catch(err => console.log('AUTH/SPOTIFY ERROR - ',err));
                    res.json(data.body);
                  })
                  .catch(err => console.log('SPOTIFY.JS - LINE 87 - Something went wrong!', err));
      })

module.exports = router;
