import merge from 'lodash/merge';
import { REDIRECT_TO_UPLOAD, RESET_REDIRECT } from '../actions/redirect_actions';

const redirectReducer = (state = false, action) => {
  switch (action.type) {
    case REDIRECT_TO_UPLOAD:
      return true;
    case RESET_REDIRECT:
      return false;
    default:
    return state;
  }
};

export default redirectReducer;
