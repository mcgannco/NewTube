import {
  CLEAR_SESSION_ERRORS,
  START_LOADING_USERNAME,
  RECEIVE_SESSION_ERRORS,
} from '../actions/session_actions';

const initialState = {
  usernameLoading: false,
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
    default:
      return state;
  }
};

export default loadingReducer;
