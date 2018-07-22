import {  RECEIVE_RESULT_SEARCH } from '../actions/search_actions';
import {  DESTROY_VIDEO } from '../actions/video_actions';
import merge from 'lodash/merge';

export default (state = [], action) => {
  let newState;
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RESULT_SEARCH:
      return action.video_ids || [];
    case DESTROY_VIDEO:
      newState = _.merge([], state);
      let destroyed = newState.filter(element => element !== action.video.id)
      return destroyed;
    default:
      return state;
  }
};
