import { combineReducers } from 'redux';
import modalReducer from './modal_reducer';
import vidmodalReducer from './vid_modal_reducer';
import loadingReducer from './loading_reducer';
import redirectReducer from './redirect_reducer';
import vidPlayingReducer from './vid_playing_reducer';
import watchLaterReducer from './watch_later_button_reducer';
import searchReducer from './search_reducer';
import sideBarReducer from './side_bar_reducer';
import filteredVideosReducer from './filtered_videos_reducer';

const uiReducer = combineReducers({
  modal: modalReducer,
  vmodal: vidmodalReducer,
  loading: loadingReducer,
  uploadRedirect: redirectReducer,
  vidPlaying: vidPlayingReducer,
  watchLaterBttn:watchLaterReducer,
  search: searchReducer,
  sideLink: sideBarReducer,
  filteredVideos: filteredVideosReducer,
});

export default uiReducer;
