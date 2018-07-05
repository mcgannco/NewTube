import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/sign_up_form_container';
import VideoIndexContainer from './video/video_index_container';
import VideoShowContainer from './video/video_show_container';
import ChannelShowContainer from './channel/channel_show_container';
import UploadVideoContainer from './video/upload_video_container';
import Modal from './modal/modal';
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
     <Switch>
       <AuthRoute exact path="/signin" component={LoginFormContainer} />
       <AuthRoute exact path="/signup" component={SignupFormContainer} />
       <ProtectedRoute exact path='/upload' component={UploadVideoContainer} />
       <Route exact path="/video/:id" component={VideoShowContainer} />
       <Route exact path="/channel/:id" component={ChannelShowContainer} />
       <Route path="/" component={VideoIndexContainer} />
     </Switch>



  </div>
);

export default App;
