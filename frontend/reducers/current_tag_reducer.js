import {RECEIVE_TAG} from '../actions/video_actions';
import merge from 'lodash/merge';
import _ from 'lodash';

const currentTagReducer = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_TAG:
      return action.currentTag
    default:
      return state;
  }
};

export default currentTagReducer;
