import { RECEIVE_SEARCH_TERM } from '../actions/search_actions';

export default (state = "", action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SEARCH_TERM:
      return action.query;
    default:
      return state;
  }
};
