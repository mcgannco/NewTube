export const fetchAllVideos = () => (
  $.ajax({
    method: 'GET',
    url: 'api/videos',
  })
);

export const fetchSingleVideo = (id) => (
  $.ajax({
    method: 'GET',
    url: `api/videos/${id}`,
  })
);

export const createVideo = (video) => (
  $.ajax({
    method: 'POST',
    url: '/api/videos',
    processData: false,
    contentType: false,
    dataType: 'json',
    data: video
  })
);

export const updateVideo = (videoId, data) => {
  return $.ajax({
    method: 'PATCH',
    url: `api/videos/${videoId}`,
    data,
    processData: false,
    contentType: false,
    dataType: 'json',
  });
};

export const deleteVideo = (id) => {
  return $.ajax({
      method: 'delete',
      url: `/api/videos/${id}`
  });
};

export const createLike = (videoId, like) => {
  return $.ajax({
      method: 'post',
      url: `/api/videos/${videoId}/likes`,
      data: { like }
  });
};

export const updateLike = (videoId, user_id, like) => {
  return $.ajax({
      method: 'patch',
      url: `/api/videos/${videoId}/likes/${user_id}`,
      data: { like }
  });
};

export const deleteLike = (id) => {
  return $.ajax({
      method: 'delete',
      url: `/api/likes/${id}`
  });
};

export const createView = (id) => {
  return $.ajax({
      method: 'patch',
      url: `/api/videos/${id}`,
      data: { addView: true}
  });
};
