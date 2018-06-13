export const fetchAllVideos = () => (
  $.ajax({
    method: 'GET',
    url: 'api/videos',
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
