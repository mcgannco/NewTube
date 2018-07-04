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
