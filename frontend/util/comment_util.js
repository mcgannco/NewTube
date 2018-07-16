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
