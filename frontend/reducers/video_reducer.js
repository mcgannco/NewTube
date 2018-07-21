import { RECEIVE_ALL_VIDEOS, RECEIVE_VIDEO, DESTROY_VIDEO, RECEIVE_LIKE, REMOVE_LIKE } from '../actions/video_actions';
import { RECEIVE_SEARCH } from '../actions/search_actions';
import merge from 'lodash/merge';

const videoReducer =  (state = {}, action) => {
  Object.freeze(state);
  let nextState = {};
  switch(action.type) {
    case RECEIVE_ALL_VIDEOS:
      return(merge({}, state, action.videos));
    case RECEIVE_VIDEO:
      return Object.assign({}, state, {[action.video.id]: action.video});
    case RECEIVE_LIKE:
      return Object.assign({}, state, {[action.video.id]: action.video});
    case REMOVE_LIKE:
      return Object.assign({}, state, {[action.video.id]: action.video});
    case DESTROY_VIDEO:
      nextState = merge({}, state);
      delete nextState[action.video.id];
      return nextState;
    case RECEIVE_SEARCH:
      return merge({}, state, action.videos);
    default:
      return state;
  }
};

export default videoReducer;
