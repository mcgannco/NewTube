import * as APIUtil from '../util/comment_util';
export const RECEIVE_ALL_COMMENTS = 'RECEIVE_ALL_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';

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