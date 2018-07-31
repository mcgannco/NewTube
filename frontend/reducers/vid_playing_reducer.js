import {
  VID_STATUS,RECEIVE_VIDEO, RECEIVE_ALL_VIDEOS
} from '../actions/video_actions';
import values from 'lodash/values';

const initialState = {
  vid: null,
  vidPlaying: true,
  videoQueue: []
};

const vidPlayingReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_VIDEO:
      return Object.assign({}, state, { vid: action.video });
    case VID_STATUS:
      return Object.assign({}, state, { vidPlaying: action.bool });
    case RECEIVE_ALL_VIDEOS:
      return Object.assign({}, state, { videoQueue: values(action.videos).map(vid => vid.id) });
    default:
      return state;
  }
};

export default vidPlayingReducer;
