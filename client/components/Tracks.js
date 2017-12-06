import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPlaylistplaylists} from '../store/spotifyPlaylists';


export class playlists extends Component {

  componentDidMount(){
    const {items} = this.props.playlists;

    console.log('LINE11 - PROPS: ', this.props);
    console.log('LINE12 - PROPS - ITEMS: ', items);
  }

  handleChange(event){
    const text = event.target.value;
    this.setState({findTrack: text});
  }
  render(){
    const items = this.props.playlists.items;

    return (
          <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
                    Playlist
              <form className="form-inline mt-2 mt-md-0">
                <input
                className="form-control mr-sm-2"
                type="text"
                onChange={(e) => this.setState({name: e.target.value })}
                placeholder="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
              {/*<div className="table-responsive">
                <table className="table table-striped">
                  <thead scope="row">
                    <tr>
                      <th>#</th>
                      <th>playlist</th>
                      <th>Image</th>
                      <th>Listen on Spotify</th>
                    </tr>
                  </thead>
                  {
                    items?
                    items.length&&items.map(playlist => {
                      return (
                               <tbody key={playlist.id} >
                                <tr scope="row">
                                  <td>{playlist.id}</td>
                                  <td>{playlist.name}</td>
                                 {
                                  playlist.images[0]?
                                   <img
                                    src={playlist.images[0].url}
                                    height="250"
                                    width="250"/>
                                    :
                                    <td>no image</td>
                                 } <a href={playlist.external_urls.spotify}>
                                    listen on spotify
                                  </a>
                                </tr>
                              </tbody>
                              )})
                      :
                      <tbody>
                        <tr scope="row">
                          <td>loading....</td>
                        </tr>
                      </tbody>
                  }
                </table>
              </div>*/}
          </main>
          )
    }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log('LINE 83 - TRACKS.JS - STATE -',state);
  return {
    playlists: state.spotifyplaylists,
  }
}

const mapToProps = (dispatch) => {
  return {
    getPlaylist:(trackId, spotifyName)=>{
      dispatch(fetchPlaylistplaylists(trackId, spotifyName))
    }
  }
}

export default connect(mapState,mapToProps)(playlists);



