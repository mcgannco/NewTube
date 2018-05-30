import merge from 'lodash/merge';
import { OPEN_SIDE_BAR, CLOSE_SIDE_BAR } from '../actions/side_bar_actions';

const sideBarReducer = (state = null, action) => {
  switch (action.type) {
    case OPEN_SIDE_BAR:
      return action.modal;
    case CLOSE_SIDE_BAR:
      return null;
    default:
    return state;
  }
};

export default sideBarReducer;
