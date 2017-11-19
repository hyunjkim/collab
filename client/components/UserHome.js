import React, {Component} from 'react';
import {connect} from 'react-redux';
import Tracks from './Tracks';
import {fetchPlaylistTracks, fetchUserPlaylist} from '../store/spotifyTracks';

export class UserHome extends Component {

  constructor(props){
    super(props);
  }


 componentDidMount(){
  const {id} = this.props.user;
  // const {items} = this.props.tracks;

  console.log('LINE11 - PROPS - USER: ', this.props.user);
  // console.log('LINE12 - PROPS - TRACKS: ', items);

  this.props.getUserPlaylist(id);
  // if(items) {
  //   const {owner, id} = items;
  // this.props.getPlaylist(id, owner.id);
  // }
 }

 render(){
  const items = this.props.tracks;
  const user = this.props.user;

   return (
     <div className="container-fluid">
      <div className="row">
        <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
          <h4>MY PLAYLIST</h4>
          <ul className="nav nav-pills flex-column">
            {
              user?
              user&&user.length&&user.map(song => {
                return (
                        <li className="nav-item" key={song.id} >
                          <a className="nav-link active"
                              href='/:songId'>{song.name}
                          </a>
                        </li>
                        )
                })
              :
              <li className="nav-item">
                <a className="nav-link"
                    href='/:songId'>{song.name}
                </a>
              </li>
            }
          </ul>
        </nav>
        <Tracks/>
      </div>
    </div>
   )
 }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log('LINE 114 - USERHOME - STATE -',state);
  return {
    user: state.spotifyUser,
    // tracks: state.spotifyTracks,
  }
}

const mapToProps = (dispatch) => {
  return {
    getUserPlaylist:(spotifyId) => {
      dispatch(fetchUserPlaylist(spotifyId));
    },
    // getPlaylist:(trackId, spotifyName)=>{
    //   dispatch(fetchPlaylistTracks(trackId, spotifyName))
    // }
  }
}

export default connect(mapState,mapToProps)(UserHome);





