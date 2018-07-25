import {
  CLEAR_SESSION_ERRORS,
  START_LOADING_USERNAME,
  RECEIVE_SESSION_ERRORS,
} from '../actions/session_actions';

import {
  RECEIVE_SINGLE_USER,
  START_LOADING_USER_PIC
} from '../actions/user_actions'

import {
  RECEIVE_HISTORY,
  RECEIVE_VIDEO_ERRORS,
  SUB_LOADER,
  CLEAR_SUB_LOADER
} from '../actions/video_actions'

const initialState = {
  usernameLoading: false,
  pictureLoading: false,
  subVideos: false
};

const loadingReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case CLEAR_SESSION_ERRORS:
      return Object.assign({}, state, { usernameLoading: false });
    case RECEIVE_SESSION_ERRORS:
      return Object.assign({}, state, { usernameLoading: false });
    case START_LOADING_USERNAME:
      return Object.assign({}, state, { usernameLoading: true });
    case RECEIVE_SINGLE_USER:
      return Object.assign({}, state, { pictureLoading: false });
    case START_LOADING_USER_PIC:
      return Object.assign({}, state, { pictureLoading: true });
    case RECEIVE_HISTORY:
      return Object.assign({}, state, { subVideos: false });
    case RECEIVE_VIDEO_ERRORS:
      return Object.assign({}, state, { subVideos: false });
    case SUB_LOADER:
      return Object.assign({}, state, { subVideos: true });
    case CLEAR_SUB_LOADER:
      return Object.assign({}, state, { subVideos: false });

    default:
      return state;
  }
};

export default loadingReducer;
