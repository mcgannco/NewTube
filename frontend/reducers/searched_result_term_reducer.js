import { RECEIVE_RESULT_SEARCH_TERM, CLEAR_SEARCH_TERM } from '../actions/search_actions';

export default (state = "", action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RESULT_SEARCH_TERM:
      return action.query;
    case CLEAR_SEARCH_TERM:
      return ""
    default:
      return state;
  }
};
