import {RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER} from '../actions/session_actions';
import {RECEIVE_SINGLE_USER} from '../actions/user_actions';

const initialState = Object.freeze({
  id: null,
  night_mode: null
})

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {id: action.currentUser.id, night_mode: action.currentUser.night_mode};
    case RECEIVE_SINGLE_USER:
      return Object.assign({}, state, {night_mode: action.user.night_mode});
    case LOGOUT_CURRENT_USER:
      return initialState;
    default:
      return state;
  }
};

export default sessionReducer;
