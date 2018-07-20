import { combineReducers } from 'redux';
import searchedVideos from './search_video_reducer.js';
import searchedUsers from './search_user_reducer.js';

const searchReducer = combineReducers({
  searchedVideos,
  searchedUsers
});

export default searchReducer;
