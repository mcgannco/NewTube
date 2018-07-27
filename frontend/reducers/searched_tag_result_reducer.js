import {  RECEIVE_RESULT_SEARCH } from '../actions/search_actions';
import merge from 'lodash/merge';

export default (state = [], action) => {
  let newState;
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RESULT_SEARCH:
      return action.tags || [];
    default:
      return state;
  }
};
