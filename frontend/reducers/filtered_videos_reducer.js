import {RECEIVE_TRENDING_VIDEOS} from '../actions/filtered_video_actions';
import {RECEIVE_HISTORY} from '../actions/video_actions';
import merge from 'lodash/merge';
import _ from 'lodash';

const filteredVideosReducer = (state = {trending: [], history: {ids: [], length: ""}}, action) => {
  let newState;
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TRENDING_VIDEOS:
    newState = _.merge([], state);
    newState["trending"] = action.videos.trending_video_ids
      return newState;
    case RECEIVE_HISTORY:
    newState = _.merge([], state);
    newState["history"]["ids"] = newState["history"]["ids"].concat(action.HistoryVideoIds)
    newState["history"]["length"] = action.numberOfHistoryVideos
      return newState;
    default:
      return state;
  }
};

export default filteredVideosReducer;
