import { combineReducers } from 'redux';
import modalReducer from './modal_reducer';
import loadingReducer from './loading_reducer';
import redirectReducer from './redirect_reducer';

const uiReducer = combineReducers({
  modal: modalReducer,
  loading: loadingReducer,
  uploadRedirect: redirectReducer,
});

export default uiReducer;
