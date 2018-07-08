import * as APIUtil from '../util/video_util';
export const RECEIVE_ALL_VIDEOS = 'RECEIVE_ALL_VIDEOS ';
export const RECEIVE_VIDEO = 'RECEIVE_VIDEO ';
export const RECEIVE_VIDEO_ERRORS = 'RECEIVE_VIDEO_ERRORS ';
export const VID_STATUS = 'VID_STATUS';

export const receiveAllVideos = (videos) => (
  {
    type: RECEIVE_ALL_VIDEOS,
    videos
  }
);

export const receiveSingleVideo = (video) => (
  {
    type: RECEIVE_VIDEO,
    video,
  }
);

export const receiveErrors = (errors) => (
  {
    type: RECEIVE_VIDEO_ERRORS,
    errors
  }
);

export const vPlaying = (bool) => (
  {
    type: VID_STATUS,
    bool
  }
);

export const requestAllVideos = () => dispatch => {
  return(
    APIUtil.fetchAllVideos().then(videos => dispatch(receiveAllVideos(videos)),
  err => {
    dispatch(receiveErrors(err.responseJSON));
  }));
};

export const requestSingleVideo = (id) => dispatch => {
  return(
    APIUtil.fetchSingleVideo(id).then(video => dispatch(receiveSingleVideo(video)),
  err => {
    dispatch(receiveErrors(err.responseJSON));
  }));
};

export const createVideo = video => dispatch => (
  APIUtil.createVideo(video).then(video => (
    dispatch(receiveSingleVideo(video))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);
