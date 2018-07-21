import * as APIUtil from '../util/search_util';

export const RECEIVE_SEARCH = "RECEIVE_SEARCH";
export const RECEIVE_SEARCH_ERRORS = "RECEIVE_SEARCH_ERRORS";
export const RECEIVE_SEARCH_TERM = "RECEIVE_SEARCH_TERM";
export const RECEIVE_RESULT_SEARCH = "RECEIVE_RESULT_SEARCH";

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
    user_ids: payload.user_ids
  });
}

export const receiveResultSearch = payload => {
  return({
    type: RECEIVE_RESULT_SEARCH,
    videos: payload.videos,
    users: payload.users,
    video_ids: payload.video_ids,
    user_ids: payload.user_ids
  });
}

export const recieveSearchTerm = (query) => {
  return({
    type: RECEIVE_SEARCH_TERM,
    query
  })
}

export const fetchSearch = query => dispatch => {
  dispatch(recieveSearchTerm(query))
  return APIUtil.fetchSearch(query)
    .then( payload => dispatch(receiveSearch(payload)))
    .fail( err => dispatch(receiveSearchErrors(err.responseJSON)));
}

export const fetchResultSearch = query => dispatch => {
  dispatch(recieveSearchTerm(query))
  return APIUtil.fetchSearch(query)
    .then( payload => dispatch(receiveResultSearch(payload)))
    .fail( err => dispatch(receiveSearchErrors(err.responseJSON)));
}
