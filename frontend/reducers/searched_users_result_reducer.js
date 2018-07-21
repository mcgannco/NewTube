import {  RECEIVE_RESULT_SEARCH } from '../actions/search_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RESULT_SEARCH:
      return action.user_ids || [];
    default:
      return state;
  }
};
