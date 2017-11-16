import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import spotifyUser from './spotifyUser';
import spotifyTracks from './spotifyTracks';

const reducer = combineReducers({
  spotifyUser,
  spotifyTracks
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware);

export default store;
export * from './spotifyUser';
export * from './spotifyTracks';
