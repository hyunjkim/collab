import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router';
import {Route, Switch} from 'react-router-dom';
import history from './history';
import {Navbar, Login, UserHome} from './components/exporter';
import {me} from './store/spotifyUser';

/**
 * COMPONENT
 */
class Routes extends Component {

  componentDidMount() {
    this.props.authorizeSpotifyUser();
  }
  render() {
    const {isLoggedIn} = this.props;

    return (
      <Router history={history}>
        <Navbar>
            <Switch>
              {/* Routes placed here are available to all visitors */}
              <Route exact path="/login" component={Login} />
                {
                isLoggedIn&&
                <Switch>
                  <Route exact path="/" component={UserHome}/>
                </Switch>
                }
              {/* Displays our Login component as a default */}
              <Route component={Login} />
            </Switch>
        </Navbar>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.spotifyUser.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    authorizeSpotifyUser() {
      dispatch(me())
    }
  }
}

export default connect(mapState,mapDispatch)(Routes)



