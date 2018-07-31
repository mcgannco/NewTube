import {RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER} from '../actions/session_actions';
import {RECEIVE_SINGLE_USER, RECEIVE_NIGHT_MODE, RECEIVE_AUTOPLAY} from '../actions/user_actions';

const initialState = Object.freeze({
  id: null,
  night_mode: null,
  autoplay: null
})

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {id: action.currentUser.id, night_mode: action.currentUser.night_mode, autoplay: action.currentUser.autoplay};
    case RECEIVE_NIGHT_MODE:
      return Object.assign({}, state, {night_mode: action.user.night_mode});
    case RECEIVE_AUTOPLAY:
      return Object.assign({}, state, {autoplay: action.user.autoplay});
    case LOGOUT_CURRENT_USER:
      return initialState;
    default:
      return state;
  }
};

export default sessionReducer;
