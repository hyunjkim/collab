const SpotifyWebApi = require('spotify-web-api-node');
const router = require('express').Router();
let spotifyApi = new SpotifyWebApi({
        clientId : process.env.SPOTIFY_CLIENT_ID,
        clientSecret : process.env.SPOTIFY_SECRET,
        redirectUri : process.env.SPOTIFY_CALLBACK
      });

let refreshToken = () => {
    /**
    * clientId, clientSecret and refreshToken has been set
    * on the api object previous to this call.
    */
    spotifyApi.refreshAccessToken()
      .then(data => {
        console.log('The access token has been refreshed!');
        //Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
      })
      .catch(err => console.log('SPOTIFY_AUTH.JS - LINE 38 - Could not refresh access token', err));

  return spotifyApi;
}

module.exports = refreshToken;

module.exports ={
  spotifyApi,
  refreshToken
}

