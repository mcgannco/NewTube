import {RECEIVE_CURRENT_USER} from '../actions/session_actions';
import {RECEIVE_ALL_USERS,RECEIVE_SINGLE_USER, RECEIVE_SUB, REMOVE_SUB, RECEIVE_WATCH, REMOVE_WATCH} from '../actions/user_actions';
import merge from 'lodash/merge';
import _ from 'lodash';

const usersReducer = (state = {}, action) => {
  let newState = {};
  let subscriber;
  let subscribee;
  let video;
  let user;
  switch (action.type) {
    case RECEIVE_ALL_USERS:
      return(merge({}, state, action.users));
    case RECEIVE_SINGLE_USER:
      return Object.assign({}, state, {[action.user.id]: action.user});
    case RECEIVE_CURRENT_USER:
      return merge({}, state, {[action.currentUser.id]: action.currentUser});
    case RECEIVE_SUB:
      newState = _.merge({}, state);
      subscriber = newState[action.subscriberId];
      subscribee = newState[action.subscribeeId];
      subscriber.subscriberIds = subscriber.subscriberIds.concat(action.subscribeeId)
      subscribee.subscribeeIds = subscribee.subscribeeIds.concat(action.subscriberId)
      return newState;
    case REMOVE_SUB:
      newState = _.merge({}, state);
      subscriber = newState[action.subscriberId];
      subscribee = newState[action.subscribeeId];
      subscriber.subscriberIds = subscriber.subscriberIds.filter(element => element !== action.subscribeeId)
      subscribee.subscribeeIds = subscribee.subscribeeIds.filter(element => element !== action.subscriberId)
      return newState;
    case RECEIVE_WATCH:
      newState = _.merge({}, state);
      video = newState[action.videoId];
      user = newState[action.userId];
      user.watchLaterIds = user.watchLaterIds.concat(action.videoId)
      return newState;
    case REMOVE_WATCH:
      newState = _.merge({}, state);
      video = newState[action.videoId];
      user = newState[action.userId];
      user.watchLaterIds = user.watchLaterIds.filter(element => element !== action.videoId)
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
