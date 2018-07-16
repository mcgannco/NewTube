import * as APIUtil from '../util/comment_util';
export const RECEIVE_ALL_COMMENTS = 'RECEIVE_ALL_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_SUB_COMMENT = 'RECEIVE_SUB_COMMENT';

export const receiveAllComments = (comments) => (
  {
    type: RECEIVE_ALL_COMMENTS,
    comments
  }
);

export const receiveSingleComment = (comment) => (
  {
    type: RECEIVE_COMMENT,
    comment,
  }
);

export const receiveSingleSubComment = (comment) => (
  {
    type: RECEIVE_SUB_COMMENT,
    comment,
  }
);

export const requestAllComments = (id) => dispatch => {
  return(
    APIUtil.fetchComments(id).then(comments => dispatch(receiveAllComments(comments)),
  err => {
    dispatch(receiveErrors(err.responseJSON));
  }));
};

export const createComment = comment => dispatch => (
  APIUtil.createComment(comment).then(comment => (
    dispatch(receiveSingleComment(comment))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const createSubComment = comment => dispatch => (
  APIUtil.createComment(comment).then(comment => (
    dispatch(receiveSingleSubComment(comment))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const editComment = (videoId, commentId, data) => dispatch => {
  return(
    APIUtil.updateComment(videoId, commentId, data).then(comment => (
      dispatch(receiveSingleComment(comment))
    ), err => (
      dispatch(receiveErrors(err.responseJSON))
    )
  ))
};
