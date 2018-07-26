import {TOP_TAGS} from '../actions/video_actions';
import merge from 'lodash/merge';
import _ from 'lodash';

const tagsReducer = (state = [], action) => {
  switch (action.type) {
    case TOP_TAGS:
      return(merge({}, state, action.tags));
    default:
      return state;
  }
};

export default tagsReducer;
