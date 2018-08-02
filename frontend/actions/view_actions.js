import * as APIUtil from '../util/view_util';

export const recordView = (videoId) => dispatch => {
  return APIUtil.recordView(videoId).then(view => console.log(''));
};
