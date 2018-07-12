import merge from 'lodash/merge';
import { OPEN_VIDEO_MODAL, CLOSE_VIDEO_MODAL } from '../actions/video_modal_actions';

const vidmodalReducer = (state = null, action) => {
  switch (action.type) {
    case OPEN_VIDEO_MODAL:
      return [action.modal, action.vid];
    case CLOSE_VIDEO_MODAL:
      return null;
    default:
    return state;
  }
};

export default vidmodalReducer;
