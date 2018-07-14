import * as APIUtil from '../util/video_util';
export const RECEIVE_ALL_VIDEOS = 'RECEIVE_ALL_VIDEOS ';
export const RECEIVE_VIDEO = 'RECEIVE_VIDEO ';
export const RECEIVE_VIDEO_ERRORS = 'RECEIVE_VIDEO_ERRORS ';
export const VID_STATUS = 'VID_STATUS';
export const DESTROY_VIDEO = 'DESTROY_VIDEO';
export const WATCH_LATER_BTTN = 'WATCH_LATER_BTTN';

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

export const receiveDestroyedVideo = video => ({
  type: DESTROY_VIDEO,
  video
});

export const watchLaterButton = status => ({
  type: WATCH_LATER_BTTN,
  status
})

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

export const deleteVideo = (id) => dispatch => {
  return APIUtil.deleteVideo(id).then(video => dispatch(receiveDestroyedVideo(video)));
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
