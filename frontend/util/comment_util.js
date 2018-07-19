export const fetchComments = (id) => (
  $.ajax({
    method: 'GET',
    url: `api/videos/${id}/comments`,
  })
);

export const createComment = (comment) => {
  return(
    $.ajax({
      method: 'POST',
      url: `api/videos/${comment.video_id}/comments`,
      data: { comment}
    })
  )
};

export const updateComment = (videoId, commentId, data) => {
  return $.ajax({
    method: 'PATCH',
    url:  `/api/videos/${videoId}/comments/${commentId}`,
    data,
    processData: false,
    contentType: false,
    dataType: 'json',
  });
};

export const deleteComment = (videoId, commentId) => {
  return $.ajax({
      method: 'delete',
      url: `/api/videos/${videoId}/comments/${commentId}`
  });
};

export const createCommentLike = (videoId, commentId, like) => {
  return $.ajax({
      method: 'post',
      url: `/api/videos/${videoId}/comments/${commentId}/likes`,
      data: { like }
  });
};

export const updateCommentLike = (videoId, commentId, user_id, like) => {
  return $.ajax({
      method: 'patch',
      url: `/api/videos/${videoId}/comments/${commentId}/likes/${user_id}`,
      data: { like }
  });
};

export const deleteCommentLike = (id) => {
  return $.ajax({
      method: 'delete',
      url: `/api/likes/${id}`
  });
};
