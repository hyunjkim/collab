/**
*Module Dependencies
*/
const path = require('path'),
      express = require('express'),
      session = require('express-session'),
      passport = require('passport'),
      morgan = require('morgan'),
      compression = require('compression'),
      bodyParser = require('body-parser'),
      User = require('./server/db/models/user'),
      db = require('./server/db/registerModels'),
      PORT = 3000;
let cookieParser = require('cookie-parser');

//==============================================================================
/**
* Create App instance
*/
const app = express();
if (process.env.NODE_ENV !== 'production') require('./secret')
//==============================================================================
/**
* passport registration
*/
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  User.findById(id)
    .then(user => done(null, user))
    .catch(done));
//==============================================================================
/**
* Middleware
*/
app.use(cookieParser());
app.use(morgan('dev'));
app.set('view cache', true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(compression())
app.options("/*",(req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Content-Length, Authorization, Accept");
  // next();
});
//==============================================================================
/**
* session middleware with passport
*/
app.use(session({
  secret: process.env.SESSION_SECRET || 'HELLO KITTY',
  resave: false,
  saveUninitialized: false,
  cookie: {
    isAdmin: false
  }
}))
app.use(passport.initialize());
app.use(passport.session());
//==============================================================================
/**
*Routes auth and api routes
*/
app.use('/auth/spotify', require('./server/auth/spotify'));
app.use('/spotify', require('./server/spotify/spotifyUser'));
app.use('/tracks', require('./server/spotify/spotifyTracks'));
// app.use('/spotify/https://api.spotify.com/', require('./server/spotify/'));
//==============================================================================
/**
*static file-serving middleware
*/
app.use(express.static(__dirname + '/public'))
app.use(express.static(path.join(__dirname + '/public')))
app.use(express.static(path.join(__dirname, '..', '/public')))

//==============================================================================
/**
*sends index.html
*/
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});
//==============================================================================
/**
*Custom Error handler
*/
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
});
//==============================================================================

app.listen(PORT,() => {
  console.log("SYNC DATABASE");
  db.sync();
});

module.exports = {
  app,
  passport
};
