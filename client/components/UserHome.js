import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Tracks from './Tracks';
import {fetchUserPlaylist} from '../store/spotifyPlaylists';

export class UserHome extends Component {

	constructor(props){
		super(props);
	}

 componentDidMount(){
	const {id} = this.props.user;
	this.props.getPlaylist(id);
 }

 render(){
	const {playlists, user} = this.props;
	 return (
		 <div className="container-fluid">
			<div className="row">
				<nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
					<h3>MY PLAYLIST</h3>
					{
	          playlists.items&&playlists.items.map(playlist => {
	            return (
	                    <div key={playlist.id}>
	                    	<Link to={playlist.external_urls.spotify}>{playlist.name}</Link>
	                    </div>
	                    )
	          })
        	}
				</nav>
			</div>
		</div>
	 )
 }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		user: state.spotifyUser,
		playlists: state.spotifyPlaylists,
	}
}

const mapToProps = (dispatch) => {
  return {
    getPlaylist:(trackId, spotifyName)=>{
      dispatch(fetchUserPlaylist(trackId, spotifyName))
    }
  }
}

export default connect(mapState,mapToProps)(UserHome);
