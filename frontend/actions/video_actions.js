import * as APIUtil from '../util/video_util';
export const RECEIVE_ALL_VIDEOS = 'RECEIVE_ALL_VIDEOS ';
export const RECEIVE_VIDEO = 'RECEIVE_VIDEO ';
export const RECEIVE_VIDEO_ERRORS = 'RECEIVE_VIDEO_ERRORS ';

export const receiveAllVideos = (videos) => (
  {
    type: RECEIVE_ALL_VIDEOS,
    videos
  }
);

export const receiveVideo = (video) => (
  {
    type: RECEIVE_VIDEO,
    video,
  }
);

export const receiveErrors = errors => {
  return({
    type: RECEIVE_VIDEO_ERRORS,
    errors
  });
};

export const requestAllVideos = () => dispatch => {
  return(
    APIUtil.fetchAllVideos().then(videos => dispatch(receiveAllVideos(videos)),
  err => {
    dispatch(receiveErrors(err.responseJSON));
  }));
};

export const createVideo = (video) => dispatch => {
  return(
    APIUtil.createVideo(video).then(video => dispatch(receiveVideo(video)),
  err => {
    dispatch(receiveErrors(err.responseJSON));
  }));
};
