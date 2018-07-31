import * as APIUtil from '../util/user_util';
export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';
export const RECEIVE_SINGLE_USER = 'RECEIVE_SINGLE_USER';
export const START_LOADING_USER_PIC = 'START_LOADING_USER_PIC';
export const RECEIVE_SUB = "RECEIVE_SUB";
export const REMOVE_SUB = "REMOVE_SUB";
export const RECEIVE_WATCH = "RECEIVE_WATCH";
export const REMOVE_WATCH = "REMOVE_WATCH";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
export const CLEAR_USER_ERRORS = "CLEAR_USER_ERRORS";
export const UPDATE_CURRENT_USER_WATCH_HISTORY = "UPDATE_CURRENT_USER_WATCH_HISTORY";
export const RECEIVE_NIGHT_MODE = "RECEIVE_NIGHT_MODE";
export const RECEIVE_AUTOPLAY = "RECEIVE_AUTOPLAY";

export const receiveAllUsers = (users) => (
  {
    type: RECEIVE_ALL_USERS,
    users
  }
);

export const receiveSingleUser = (user) => (
  {
    type: RECEIVE_SINGLE_USER,
    user
  }
);

export const receiveNightMode = (user) => (
  {
    type: RECEIVE_NIGHT_MODE,
    user
  }
);

export const receiveAutoplay = (user) => (
  {
    type: RECEIVE_AUTOPLAY,
    user
  }
);

export const startLoadingUserPicture = () => ({
  type: START_LOADING_USER_PIC
});

export const receiveSub = (payload) => ({
  type: RECEIVE_SUB,
  subscriberId: payload.subscriberId,
  subscribeeId: payload.subscribeeId
});

export const removeSub = (payload) => ({
  type: REMOVE_SUB,
  subscriberId: payload.subscriberId,
  subscribeeId: payload.subscribeeId
});

export const removeWatch = (payload) => ({
  type: REMOVE_WATCH,
  videoId: payload.videoId,
  userId: payload.userId
});

export const receiveWatch = (payload) => ({
  type: RECEIVE_WATCH,
  videoId: payload.videoId,
  userId: payload.userId
});

export const receiveUserErrors = (errors) => (
  {
    type: RECEIVE_USER_ERRORS,
    errors
  }
);

export const clearUserErrors = () => (
  {
    type: CLEAR_USER_ERRORS,
  }
);

export const updateHistory = (userId, vidId) => (
  {
    type: UPDATE_CURRENT_USER_WATCH_HISTORY,
    userId,
    vidId
  }
);

export const requestAllUsers = () => dispatch => {
  return(
    APIUtil.fetchAllUsers().then(users => dispatch(receiveAllUsers(users))));
};

export const requestSingleUser = (id) => dispatch => {
  return(
    APIUtil.fetchSingleUser(id).then(user => dispatch(receiveSingleUser(user))));
};

export const editUser = (id, data) => dispatch => {
  dispatch(startLoadingUserPicture());
  return(
    APIUtil.updateUser(id, data).then(user => (
      dispatch(receiveSingleUser(user))
    ), err => (
      dispatch(receiveUserErrors(err.responseJSON))
    )
  ))
};

export const createSub = (subscribeeId) => (dispatch) => {
  return APIUtil.createSub(subscribeeId).then(payload => {
    dispatch(receiveSub(payload));
    return payload;
  }, errors => {
    console.log(errors.responseJSON);
    return errors;
  });
};

export const deleteSub = (subscribeeId) => (dispatch) => {
  return APIUtil.deleteSub(subscribeeId).then(payload => {
    dispatch(removeSub(payload));
    return payload;
  }, errors => {
    console.log(errors.responseJSON);
    return errors;
  });
};

export const createWatch = videoId => dispatch => (
  APIUtil.createWatch(videoId).then(payload => (
    dispatch(receiveWatch(payload))
  ), err => (
    console.log(err.responseJSON)
   )
 )
);

export const deleteWatch = (videoId) => dispatch => {
  return APIUtil.deleteWatch(videoId).then(payload => dispatch(removeWatch(payload)));
};

export const requestSubscriptions = () => dispatch => {
  return(
    APIUtil.fetchSubscriptions().then(users => (
      dispatch(receiveAllUsers(users))
    ), err => (
      dispatch(receiveUserErrors(err.responseJSON))
    )
  ))
};

export const toggleNightMode = (id, data) => dispatch => {
  return(
    APIUtil.updateUser(id, data).then(user => (
      dispatch(receiveNightMode(user))
    ), err => (
      dispatch(receiveUserErrors(err.responseJSON))
    )
  ))
};

export const toggleAutoPlay = (id, data) => dispatch => {
  return(
    APIUtil.updateUser(id, data).then(user => (
      dispatch(receiveAutoplay(user))
    ), err => (
      dispatch(receiveUserErrors(err.responseJSON))
    )
  ))
};
