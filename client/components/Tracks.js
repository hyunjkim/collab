import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPlaylistTracks} from '../store/spotifyTracks';


export class Tracks extends Component {

  componentDidMount(){
    const {items} = this.props.tracks;

    console.log('LINE9 - PROPS: ', this.props);
    console.log('LINE10 - PROPS - TRACKS: ', items);

    if(items) {
      const {owner, id} = items;
    this.props.getPlaylist(id, owner.id);
    }
  }

  handleChange(event){
    const text = event.target.value;
    this.setState({findTrack: text});
  }
  render(){
    const items = this.props.tracks.items;

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
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead scope="row">
                    <tr>
                      <th>#</th>
                      <th>Song</th>
                      <th>Image</th>
                      <th>Listen on Spotify</th>
                    </tr>
                  </thead>
                  {
                    items?
                    items.length&&items.map(song => {
                      return (
                               <tbody key={song.id} >
                                <tr scope="row">
                                  <td>{song.id}</td>
                                  <td>{song.name}</td>
                                 {
                                  song.images[0]?
                                   <img
                                    src={song.images[0].url}
                                    height="250"
                                    width="250"/>
                                    :
                                    <td>no image</td>
                                 } <a href={song.external_urls.spotify}>
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
              </div>
          </main>
          )
    }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log('LINE 71 - TRACKS - STATE -',state);
  return {
    tracks: state.spotifyTracks,
  }
}

const mapToProps = (dispatch) => {
  return {
    getPlaylist:(trackId, spotifyName)=>{
      dispatch(fetchPlaylistTracks(trackId, spotifyName))
    }
  }
}

export default connect(mapState,mapToProps)(Tracks);



