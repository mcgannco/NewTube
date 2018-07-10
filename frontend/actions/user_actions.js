import * as APIUtil from '../util/user_util';
export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';
export const RECEIVE_SINGLE_USER = 'RECEIVE_SINGLE_USER';
export const START_LOADING_USER_PIC = 'START_LOADING_USER_PIC';
export const RECEIVE_SUB = "RECEIVE_SUB";
export const REMOVE_SUB = "REMOVE_SUB";

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
    APIUtil.updateUser(id, data).then(user => dispatch(receiveSingleUser(user))));
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
