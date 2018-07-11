import {RECEIVE_CURRENT_USER, RECEIVE_SESSION_ERRORS, CLEAR_SESSION_ERRORS} from '../actions/session_actions';
import {RECEIVE_USER_ERRORS, CLEAR_USER_ERRORS} from '../actions/user_actions';
import { merge } from 'lodash/merge';

const sessionErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return [];
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case CLEAR_SESSION_ERRORS:
      return [];
    case RECEIVE_USER_ERRORS:
      return action.errors;
    case CLEAR_USER_ERRORS:
      return [];
    default:
      return state;
  }
};

export default sessionErrorsReducer;
