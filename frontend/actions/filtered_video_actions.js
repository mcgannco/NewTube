import * as APIUtil from '../util/filtered_video_util';
export const RECEIVE_TRENDING_VIDEOS = 'RECEIVE_TRENDING_VIDEOS';

export const receiveAllTrendingVideos = (videos) => (
  {
    type: RECEIVE_TRENDING_VIDEOS,
    videos
  }
);

export const requestTrendingVideos = () => dispatch => {
  return(
    APIUtil.getTrendingVideos().then(videos => dispatch(receiveAllTrendingVideos(videos)),
  err => {
    dispatch(console.log(err.responseJSON));
  }));
};
