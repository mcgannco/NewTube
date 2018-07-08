import {
  VID_STATUS,RECEIVE_VIDEO
} from '../actions/video_actions';

const initialState = {
  vid: null,
  vidPlaying: true
};

const vidPlayingReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_VIDEO:
      return Object.assign({}, state, { vid: action.video });
    case VID_STATUS:
      return Object.assign({}, state, { vidPlaying: action.bool });
    default:
      return state;
  }
};

export default vidPlayingReducer;
