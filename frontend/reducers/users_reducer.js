import {RECEIVE_CURRENT_USER} from '../actions/session_actions';
import {RECEIVE_ALL_USERS} from '../actions/user_actions';
import merge from 'lodash/merge';

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ALL_USERS:
      return(merge({}, state, action.users));
    case RECEIVE_CURRENT_USER:
      return merge({}, state, {[action.currentUser.id]: action.currentUser});
    default:
      return state;
  }
};

export default usersReducer;
