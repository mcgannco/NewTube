import {RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER} from '../actions/session_actions';

const initialState = Object.freeze({
  id: null
})

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {id: action.currentUser.id};
    case LOGOUT_CURRENT_USER:
      return initialState;
    default:
      return state;
  }
};

export default sessionReducer;
