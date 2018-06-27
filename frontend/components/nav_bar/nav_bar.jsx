import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../search/search';
import VideoDropDown from './video_dropdown';
import AppDropDown from './app_dropdown';
import SettingDropDown from './setting_dropdown';
import UserDropDown from './user_dropdown';

class NavBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      videoDropDown: false,
      appsDropDown: false,
      settingsDropDown: false,
      usersDropDown: false,
    }
    this.vidDropDown = this.vidDropDown.bind(this);
    this.closeVid = this.closeVid.bind(this);
    this.appDropDown = this.appDropDown.bind(this);
    this.closeApp = this.closeApp.bind(this);
    this.settingDropDown = this.settingDropDown.bind(this);
    this.closeSetting = this.closeSetting.bind(this);
    this.userDropDown = this.userDropDown.bind(this);
    this.closeUser = this.closeUser.bind(this);
  }

  vidDropDown(e) {
    e.preventDefault();
    this.setState({ videoDropDown: true }, () => {
    document.addEventListener('click', this.closeVid);
   });
  }

  closeVid(e) {
    e.preventDefault();
    this.setState({ videoDropDown: false }, () => {
      document.removeEventListener('click', this.closeVid);
    });
  }

  appDropDown(e) {
    e.preventDefault();
    this.setState({ appsDropDown: true }, () => {
    document.addEventListener('click', this.closeApp);
    });
  }

  closeApp(e) {
    e.preventDefault();
    this.setState({ appsDropDown: false }, () => {
      document.removeEventListener('click', this.closeApp);
    });
  }

  settingDropDown(e) {
    e.preventDefault();
    this.setState({ settingsDropDown: true }, () => {
    document.addEventListener('click', this.closeSetting);
    });
  }

  closeSetting(e) {
    e.preventDefault();
    this.setState({ settingsDropDown: false }, () => {
      document.removeEventListener('click', this.closeSetting);
    });
  }

  userDropDown(e) {
    e.preventDefault();
    this.setState({ usersDropDown: true }, () => {
    document.addEventListener('click', this.closeUser);
    });
  }

  closeUser(e) {
    e.preventDefault();
    this.setState({ usersDropDown: false }, () => {
      document.removeEventListener('click', this.closeUser);
    });
  }


  render() {
    const {currentUser, logout, openModal} = this.props
    let loggedin;
    let userDropDown;

    let dd;
    if (this.state.videoDropDown) {
      dd = <VideoDropDown />
    }
    if (this.state.appsDropDown) {
      dd = <AppDropDown />
    }
    if (this.state.settingsDropDown) {
      dd = <SettingDropDown />
    }

    if (this.state.usersDropDown && currentUser) {
      dd = <UserDropDown currentUser={currentUser} logout={logout}/>
    }

    if (!currentUser) {
      loggedin = <li>
                  <Link to='/signin'>SIGN IN</Link>
                </li>
      } else {
        loggedin = <div className="user-profile-div" onClick={this.userDropDown}>
          <span>
            {currentUser.username[0]}
          </span>
          {this.state.usersDropDown ? dd : ""}
        </div>
      }

      return(
        <header className="main-nav">
          <nav className="left-nav">
            <ul>
              <li id="nav-button" onClick={() => openModal('sidebar')}>
                <span><i className="fa fa-bars"></i></span>
              </li>
              <li id="search-modal-btn">
                <Link to="/"><img id="nav-bar-logo" src={window.logo}></img></Link>
                <Link to="/"><p>NewTube</p></Link>
                <nav className="hometext">NewTube Home</nav>
              </li>
            </ul>
          </nav>
          <nav className="nav-search">
            <Search />
          </nav>
          <nav className="right-nav">
            <ul>
              <li onClick={this.vidDropDown} id="nav-button">
                <span>
                  <i className="fas fa-video"></i>
                </span>
                <nav className="tooltiptext">Create a video or post</nav>
                  {this.state.videoDropDown ? dd : ""}
              </li>
              <li onClick={this.appDropDown} id="nav-button">
                <span>  <i className="fas fa-th"></i></span>
                <nav className="tooltiptext">NewTube Apps</nav>
                  {this.state.appsDropDown ? dd : ""}
              </li>
              <li onClick={this.settingDropDown} id="nav-button">
                <span><i className="fas fa-ellipsis-v"></i></span>
                <nav className="tooltiptext">Settings</nav>
                {this.state.settingsDropDown ? dd : ""}
              </li>
              {loggedin}
            </ul>
          </nav>
        </header>
      )
    }
  }


export default NavBar;
