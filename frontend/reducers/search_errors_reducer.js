import { RECEIVE_SEARCH_ERRORS,RECEIVE_RESULT_SEARCH_TERM } from '../actions/search_actions';

const videoErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SEARCH_ERRORS:
      return action.errors || [];
    case RECEIVE_RESULT_SEARCH_TERM:
      return [];
    default:
      return state;
  }
};

export default videoErrorsReducer;
