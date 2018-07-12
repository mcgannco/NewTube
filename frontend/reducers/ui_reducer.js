import { combineReducers } from 'redux';
import modalReducer from './modal_reducer';
import vidmodalReducer from './vid_modal_reducer';
import loadingReducer from './loading_reducer';
import redirectReducer from './redirect_reducer';
import vidPlayingReducer from './vid_playing_reducer';

const uiReducer = combineReducers({
  modal: modalReducer,
  vmodal: vidmodalReducer,
  loading: loadingReducer,
  uploadRedirect: redirectReducer,
  vidPlaying: vidPlayingReducer
});

export default uiReducer;
