import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

// testing
import { signup, login, logout } from './actions/session_actions';
import { requestAllVideos, createVideo, fetchTag } from './actions/video_actions';
import { requestAllUsers, createWatch, deleteWatch,requestSubscriptions } from './actions/user_actions';
import { requestTrendingVideos, receiveAllTrendingVideos } from './actions/filtered_video_actions';
import { fetchTopTags } from './util/video_util';
window.requestAllVideos = requestAllVideos;
window.fetchTopTags = fetchTopTags;
window.fetchTag = fetchTag;
window.requestSubscriptions = requestSubscriptions;
window.createVideo = createVideo;
window.signup = signup;
window.login = login;
window.logout = logout;
window.requestAllUsers = requestAllUsers;
window.createWatch = createWatch;
window.deleteWatch = deleteWatch;
window.requestTrendingVideos = requestTrendingVideos;
window.receiveAllTrendingVideos = receiveAllTrendingVideos;
import { openModal, closeModal } from './actions/modal_actions';
window.openModal = openModal;
window.closeModal = closeModal;
//


document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      session: { id: window.currentUser.id, night_mode: window.currentUser.night_mode },
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
