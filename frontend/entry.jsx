import React from 'react';
import ReactDom from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

// testing
import { signup, login, logout } from './util/session_api_util';
window.signup = signup;
window.login = login;
window.logout = logout;
//


document.addEventListener('DOMContentLoaded', () =>{
  const store = configureStore();
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  ReactDom.render(<Root store={store}/>, document.getElementById('root'))
});
