import {  SIDE_BAR_LINK, CLEAR_SIDE_BAR_LINK } from '../actions/side_bar_actions';
import merge from 'lodash/merge';

export default (state = ["", true], action) => {
  let newState;
  Object.freeze(state);
  switch(action.type) {
    case SIDE_BAR_LINK:
      return [action.link, !state[1]];
    case CLEAR_SIDE_BAR_LINK:
      return ["", !state[1]];
    default:
      return state;
  }
};
