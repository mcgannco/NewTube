import { RECEIVE_ALL_VIDEOS } from '../actions/video_actions';
import merge from 'lodash/merge';

const videoReducer =  (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ALL_VIDEOS:
      return(merge({}, state, action.videos));
    default:
      return state;
  }
};

export default videoReducer;
