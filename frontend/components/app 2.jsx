import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/sign_up_form_container';
import VideoIndex from './video/video_index';
import Modal from './modal/modal';
import {AuthRoute} from '../util/route_util';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

const App = () => (
  <div>
    <NavBarContainer />
    <Modal />
     <Switch>
       <Route exact path="/" component={VideoIndex} />
       <AuthRoute exact path="/signin" component={LoginFormContainer} />
       <AuthRoute exact path="/signup" component={SignupFormContainer} />
     </Switch>
  </div>
);

export default App;
