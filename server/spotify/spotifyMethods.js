const SpotifyWebApi = require('spotify-web-api-node');
const router = require('express').Router();
let spotifyApi = new SpotifyWebApi({
        clientId :  "16e9ba55e7e84c02897f32ddfad5eafd",
        clientSecret : "76b9924ddf8a4518921d7e35db4a2b68",
        redirectUri : 'http://localhost:3000/auth/spotify/callback'
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
      .catch(err => console.log('SPOTIFY_METHOD.JS - LINE 20 - Could not refresh access token', err));

  return spotifyApi;
}

module.exports = refreshToken;

module.exports ={
  spotifyApi,
  refreshToken
}

