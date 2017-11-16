const db = require('./server/db/spotifydb');
const {Tracks,User} = require('./server/db/models/associations');


async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const track = await Promise.all([
    Tracks.bulkCreate([
      {
        "trackID": "0rlFz2QQli3wPYTl6wC4Nu",
        "name": "Korean"    ,
        "tracks": "https://api.spotify.com/v1/users/1276719789/playlists/0rlFz2QQli3wPYTl6wC4Nu/tracks"
      },
      {
        "trackID": "1rNi31k5OOl2H52Ej33YrX",
        "name": "Acoustic",
        "tracks":"https://api.spotify.com/v1/users/1276719789/playlists/1rNi31k5OOl2H52Ej33YrX/tracks",
      },
      {
       "trackID": "20btwCtWCJA9TkKSsHOU2q",
        "name": "Total Eclipse of the Heart",
        "tracks": "https://api.spotify.com/v1/users/1276719789/playlists/20btwCtWCJA9TkKSsHOU2q/tracks",

      },
      {
        "trackID": "5hZmrdEYgQMxbZzrwQZouL",
        "name": "Hip Hop",
        "tracks": "https://api.spotify.com/v1/users/1276719789/playlists/5hZmrdEYgQMxbZzrwQZouL/tracks",

      },
      {
        "trackID": "37i9dQZF1DXcDnIr0iKAG8",
        "name": "Rock Save The Queen",
        "tracks": "https://api.spotify.com/v1/users/spotify/playlists/37i9dQZF1DXcDnIr0iKAG8/tracks",
      }
      ]),
     User.bulkCreate([{
          "name": "Kim Hyun",
          "spotifyId": "1276719789",
          "email" : "nhjkim11@gmail.com"
        }])
   ]);
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')



