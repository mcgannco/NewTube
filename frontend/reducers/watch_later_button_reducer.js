import { WATCH_LATER_BTTN } from '../actions/video_actions';
import merge from 'lodash/merge';

const watchLaterReducer =  (state = null, action) => {
  Object.freeze(state);
  switch(action.type) {
    case WATCH_LATER_BTTN:
      return(action.status);
    default:
      return state;
  }
};

export default watchLaterReducer;
