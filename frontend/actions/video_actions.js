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

export const editVideo = (id, data) => dispatch => {
  return(
    APIUtil.updateVideo(id, data).then(video => (
      dispatch(receiveSingleVideo(video))
    ), err => (
      dispatch(receiveErrors(err.responseJSON))
    )
  ))
};

export const createLike = (videoId, like) => dispatch => {
  return APIUtil.createLike(videoId, like).then(video => dispatch(receiveSingleVideo(video)));
};

export const updateLike = (videoId, userId, like) => dispatch => {
  return APIUtil.updateLike(videoId, userId, like).then(video => dispatch(receiveSingleVideo(video)));
};

export const deleteLike = (id) => dispatch => {
  return APIUtil.deleteLike(id).then(video => dispatch(receiveSingleVideo(video)));
};

export const createView = (videoId) => dispatch => {
  return APIUtil.createView(videoId).then(video => dispatch(receiveSingleVideo(video)));
};
