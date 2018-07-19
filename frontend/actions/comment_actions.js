import * as APIUtil from '../util/comment_util';
export const RECEIVE_ALL_COMMENTS = 'RECEIVE_ALL_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_SUB_COMMENT = 'RECEIVE_SUB_COMMENT';
export const DESTROY_COMMENT = 'DESTROY_COMMENT';

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

export const receiveDestroyedComment = comment => ({
  type: DESTROY_COMMENT,
  comment
});

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

export const deleteComment = (videoId, commentId) => dispatch => {
  return APIUtil.deleteComment(videoId, commentId).then(comment => dispatch(receiveDestroyedComment(comment)));
};

export const createCommentLike = (videoId, commentId, like) => dispatch => {
  return APIUtil.createCommentLike(videoId, commentId, like).then(comment => dispatch(receiveSingleComment(comment)));
};

export const updateCommentLike = (videoId, commentId, user_id, like) => dispatch => {
  return APIUtil.updateCommentLike(videoId, commentId, user_id, like).then(comment => dispatch(receiveSingleComment(comment)));
};

export const deleteCommentLike = (id) => dispatch => {
  return APIUtil.deleteCommentLike(id).then(comment => dispatch(receiveSingleComment(comment)));
};
