import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/sign_up_form_container';
import VideoIndexContainer from './video/video_index_container';
import VideoShowContainer from './video/video_show_container';
import ChannelShowContainer from './channel/channel_show_container';
import UploadVideoContainer from './video/upload_video_container';
import ResultsContainer from './search/results_container';
import TrendingContainer from './video/trending_container';
import MostViewsContainer from './video/most_viewed/most_viewed_container';
import MostLikesContainer from './video/most_liked/most_liked_container';
import OldestContainer from './video/oldest/oldest_container';
import RecentlyAddedContainer from './video/recently_added/recently_added_container';
import Modal from './modal/modal';
import VideoModal from './modal/video-modal';
import {AuthRoute, ProtectedRoute} from '../util/route_util';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

const App = () => (
  <div id="app">
    <NavBarContainer />
    <div className="nav-bar-anchor"></div>
    <Modal />
    <VideoModal />
     <Switch>
       <AuthRoute exact path="/signin" component={LoginFormContainer} />
       <AuthRoute exact path="/signup" component={SignupFormContainer} />
       <ProtectedRoute exact path='/upload' component={UploadVideoContainer} />
       <Route exact path="/video/:id" component={VideoShowContainer} />
       <Route exact path="/channel/:id" component={ChannelShowContainer} />
       <Route exact path="/results" component={ResultsContainer} />
       <Route exact path="/trending" component={TrendingContainer} />
       <Route exact path="/most_viewed" component={MostViewsContainer} />
       <Route exact path="/most_liked" component={MostLikesContainer} />
       <Route exact path="/oldest" component={OldestContainer} />
       <Route exact path="/recently_added" component={RecentlyAddedContainer} />
       <Route path="/" component={VideoIndexContainer} />
     </Switch>



  </div>
);

export default App;
