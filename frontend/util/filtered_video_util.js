export const getTrendingVideos = () => {
  return $.ajax({
      method: 'get',
      url: `/api/filtered_videos`,
  });
};
