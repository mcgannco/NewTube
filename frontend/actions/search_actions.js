import * as APIUtil from '../util/search_util';

export const RECEIVE_SEARCH = "RECEIVE_SEARCH";
export const RECEIVE_SEARCH_ERRORS = "RECEIVE_SEARCH_ERRORS";

export const receiveSearchErrors = errors => {
  return({
    type: RECEIVE_SEARCH_ERRORS,
    errors
  });
};

export const receiveSearch = payload => {
  return({
    type: RECEIVE_SEARCH,
    videos: payload.videos,
    users: payload.users,
    video_ids: payload.video_ids,
    user_ids: payload.search_user_ids
  });
}

export const fetchSearch = query => dispatch => {
  return APIUtil.fetchSearch(query)
    .then( payload => dispatch(receiveSearch(payload)))
    .fail( err => dispatch(receiveSearchErrors(err.responseJSON)));
}
