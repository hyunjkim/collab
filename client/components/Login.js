import React ,{Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {auth} from '../store/spotifyUser';

export default class Login extends Component{
  render(){
    return(
      <h1>
        <a href="/auth/spotify"> Login Spotify User </a>
      </h1>
    )
  }
}
