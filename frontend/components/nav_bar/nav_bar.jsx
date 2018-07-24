import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../search/search_container';
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
      smallSearch: false,
      width: 0,
      height: 0,
      hideBigSearch: false,
      expandlittleSearch: false,
      hidelittleSearch: false
    }
    this.vidDropDown = this.vidDropDown.bind(this);
    this.closeVid = this.closeVid.bind(this);
    this.appDropDown = this.appDropDown.bind(this);
    this.closeApp = this.closeApp.bind(this);
    this.settingDropDown = this.settingDropDown.bind(this);
    this.closeSetting = this.closeSetting.bind(this);
    this.userDropDown = this.userDropDown.bind(this);
    this.closeUser = this.closeUser.bind(this);
    this.smallSearch = this.smallSearch.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.closeSmallSearch = this.closeSmallSearch.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    if (window.innerWidth <= 660) {
      this.setState({ width: window.innerWidth, height: window.innerHeight, hideBigSearch: true });
    } else {
      this.setState({ width: window.innerWidth, height: window.innerHeight, hideBigSearch: false, smallSearch: false });
    }
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

  smallSearch(e) {

    e.preventDefault();
    this.setState({ smallSearch: true }, () => {
    document.getElementById('body').addEventListener('click', this.closeSmallSearch);
    });
  }

  closeSmallSearch(e) {
    e.preventDefault();
    this.setState({ smallSearch: false }, () => {
      document.getElementById('body').removeEventListener('click', this.closeSmallSearch);
    });
  }


  render() {
    const {currentUser, logout, openModal} = this.props
    let loggedin;
    let userDropDown;
    let userAvatar;
    if (this.props.currentUser) {
      userAvatar = this.props.currentUser.profile_img_url;
    }
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
          <span style={
            {backgroundImage: `url(${userAvatar})`}
           }>
            {userAvatar  !== "/avatars/original/missing.png" ? "" : currentUser.username[0]}
          </span>
          {this.state.usersDropDown ? dd : ""}
        </div>
      }
      let navsearch;
      if(this.state.smallSearch) {
        navsearch = "small-search"
      } else if (this.state.hideBigSearch) {
        navsearch = "nav-search-hide"
      } else {
        navsearch = "nav-search"
      }

      return(
        <header id="header-header" className={ this.state.smallSearch ? "small-search-main-nav" : "main-nav"}>
          <nav className={ this.state.smallSearch ? "no-left-nav" : "left-nav"}>
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

          <div onClick={this.closeSmallSearch} className={this.state.smallSearch ? "back-button-small-search" : "no-back-button-small-search"}>
            <span>
              <i className="fas fa-arrow-left"></i>
            </span>
            <nav className="tooltiptext">Back</nav>
          </div>

          <nav className={navsearch}>
            <Search hideBigSearch={this.state.hideBigSearch} smallSearch={this.state.smallSearch}/>
          </nav>
          <nav className={ this.state.smallSearch ? "no-left-nav" : "right-nav"}>

            <ul>
              <li onClick={this.smallSearch} id="nav-button">
                <span>
                  <i className="fas fa-search"></i>
                </span>
                <nav className="tooltiptext">Search</nav>
              </li>

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
