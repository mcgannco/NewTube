import {RECEIVE_TRENDING_VIDEOS} from '../actions/filtered_video_actions';
import merge from 'lodash/merge';
import _ from 'lodash';

const filteredVideosReducer = (state = {trending: []}, action) => {
  let newState;
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TRENDING_VIDEOS:
    newState = _.merge([], state);
    newState["trending"] = action.videos.trending_video_ids
      return newState;
    default:
      return state;
  }
};

export default filteredVideosReducer;
