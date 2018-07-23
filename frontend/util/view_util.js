export const recordView = (vidId) => {
  return $.ajax({
      method: 'post',
      url: `/api/views`,
      data: { view: {video_id: vidId}}
  });
};
