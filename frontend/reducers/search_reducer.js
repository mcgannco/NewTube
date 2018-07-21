import { combineReducers } from 'redux';
import searchedVideos from './search_video_reducer.js';
import searchedUsers from './search_user_reducer.js';
import searchedTerm from './search_term_reducer.js';
import searchedTermResult from './searched_result_term_reducer.js';
import searchedResultVideos from './searched_videos_result_reducer.js';
import searchedResultUsers from './searched_users_result_reducer.js';

const searchReducer = combineReducers({
  searchedVideos,
  searchedUsers,
  searchedTerm,
  searchedResultVideos,
  searchedResultUsers,
  searchedTermResult
});

export default searchReducer;
