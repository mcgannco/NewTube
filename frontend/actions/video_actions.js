import * as APIUtil from '../util/video_util';
export const RECEIVE_ALL_VIDEOS = 'RECEIVE_ALL_VIDEOS ';
export const RECEIVE_VIDEO = 'RECEIVE_VIDEO ';
export const RECEIVE_VIDEO_ERRORS = 'RECEIVE_VIDEO_ERRORS ';
export const CLEAR_VIDEO_ERRORS = 'CLEAR_VIDEO_ERRORS ';
export const VID_STATUS = 'VID_STATUS';
export const DESTROY_VIDEO = 'DESTROY_VIDEO';
export const WATCH_LATER_BTTN = 'WATCH_LATER_BTTN';
export const RECEIVE_LIKE = 'RECEIVE_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';
export const CLEAR_VIDEOS = 'CLEAR_VIDEOS';
export const RECEIVE_HISTORY = 'RECEIVE_HISTORY';
export const SUB_LOADER = 'SUB_LOADER';
export const CLEAR_SUB_LOADER = 'CLEAR_SUB_LOADER';
export const RESET_HISTORY = 'RESET_HISTORY';
export const VIDEO_LOAD = 'VIDEO_LOAD';
export const TOP_TAGS = 'TOP_TAGS';

export const receiveAllVideos = (videos) => (
  {
    type: RECEIVE_ALL_VIDEOS,
    videos
  }
);

export const receiveHistory = (payload) => (
  {
    type: RECEIVE_HISTORY,
    videos: payload.videos,
    users: payload.users,
    numberOfHistoryVideos: payload.number_of_history_videos,
    HistoryVideoIds: payload.history_video_ids
  }
);

export const resetHistory = () => (
  {
    type: RESET_HISTORY,
  }
);

export const receiveSingleVideo = (video) => (
  {
    type: RECEIVE_VIDEO,
    video,
  }
);

export const receiveSingleLike = (video) => (
  {
    type: RECEIVE_LIKE,
    video,
  }
);

export const removeSingleLike = (video) => (
  {
    type: REMOVE_LIKE,
    video,
  }
);

export const receiveErrors = (errors) => {
  return({
    type: RECEIVE_VIDEO_ERRORS,
    errors
  })
};

export const clearAllVideoErrors = () => (
  {
    type: CLEAR_VIDEO_ERRORS,
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

export const clearAllVideos = () => (
  {
    type: CLEAR_VIDEOS,
  }
);

export const startSubVideoLoader = () => (
  {
    type: SUB_LOADER,
  }
);

export const clearSubVideoLoader = () => (
  {
    type: CLEAR_SUB_LOADER,
  }
);

export const startLoadingVideo = () => (
  {
    type: VIDEO_LOAD,
  }
);

export const receiveTopTags = (tags) => (
  {
    type: TOP_TAGS,
    tags
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

export const createVideo = video => dispatch => {
  dispatch(startLoadingVideo());
  return(APIUtil.createVideo(video).then(video => (
    dispatch(receiveSingleVideo(video))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)
};

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
  return APIUtil.createLike(videoId, like).then(video => dispatch(receiveSingleLike(video)));
};

export const updateLike = (videoId, userId, like) => dispatch => {
  return APIUtil.updateLike(videoId, userId, like).then(video => dispatch(receiveSingleLike(video)));
};

export const deleteLike = (id) => dispatch => {
  return APIUtil.deleteLike(id).then(video => dispatch(removeSingleLike(video)));
};

export const createView = (videoId) => dispatch => {
  return APIUtil.createView(videoId).then(video => dispatch(receiveSingleVideo(video)));
};

export const fetchHistory = offSet => dispatch => {
  return APIUtil.fetchHistory(offSet)
    .then( videos => dispatch( receiveHistory(videos)),
           err    => dispatch( receiveErrors(err.responseJSON)));
};

export const fetchTopTags = () => dispatch => {
  return(
    APIUtil.fetchTopTags().then(tags => dispatch(receiveTopTags(tags)),
  err => {
    dispatch(receiveErrors(err.responseJSON));
  }));
};
