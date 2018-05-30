import { combineReducers } from 'redux';
import sideBarReducer from './side_bar_reducer';

const uiReducer = combineReducers({
  side_bar: sideBarReducer,
});

export default uiReducer;
