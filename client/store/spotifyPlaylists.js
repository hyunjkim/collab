import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER_PLAYLIST = 'GET_USER_PLAYLIST';
const GET_TRACKS = 'GET_TRACKS';
//==============================================================================
/**
 * INITIAL STATE
 */
const defaultTracks = {};
//==============================================================================
/**
 * ACTION CREATORS
 */
export const getUserPlaylist = userPlaylist => ({ type: GET_USER_PLAYLIST, userPlaylist });
export const getTracks = tracks => ({ type: GET_TRACKS, tracks });

//==============================================================================
/**
 * THUNK CREATORS
 */
 //==============================================================================
/**
*  GET USER PLAYLIST
*/
export const fetchUserPlaylist = (spotifyId) =>
  dispatch =>
    axios.get(`/spotify/${spotifyId}`)
      .then(userPlaylist => {
        console.log('STORE/SPOTIFYTRACKS - LINE33 - ', userPlaylist);
        dispatch(getUserPlaylist(userPlaylist.data));
        }
      )
      .catch(err => console.log(err));
/**
*  GET TRACKS FROM USER PLAYLIST
*/
// export const fetchPlaylistTracks = (trackId,spotifyName) =>
//   dispatch =>
//     axios.get(`/tracks/${trackId}/${spotifyName}`)
//       .then(tracks => {
//         console.log('SPOTIFYTRACKS - LINE48 - tracks', tracks);
//         dispatch(getTracks(tracks.data));
//         }
//       )
//       .catch(err => console.log(err));
//==============================================================================
/**
 * REDUCER
 */
export default function (state = defaultTracks, action) {

  switch (action.type) {
    case GET_USER_PLAYLIST:
      return action.userPlaylist;
    case GET_TRACKS:
      return action.tracks;
    default:
      return state;
  }
}
