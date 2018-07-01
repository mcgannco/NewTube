import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

// testing
import { signup, login, logout } from './actions/session_actions';
import { requestAllVideos, createVideo } from './actions/video_actions';
import { requestAllUsers } from './actions/user_actions';
window.requestAllVideos = requestAllVideos;
window.createVideo = createVideo;
window.signup = signup;
window.login = login;
window.logout = logout;
window.requestAllUsers = requestAllUsers;
import { openModal, closeModal } from './actions/modal_actions';
window.openModal = openModal;
window.closeModal = closeModal;
//


document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      session: { id: window.currentUser.id },
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});
