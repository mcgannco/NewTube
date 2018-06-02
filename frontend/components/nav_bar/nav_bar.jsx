import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../search/search';
import VideoDropDown from './video_dropdown';
import AppDropDown from './app_dropdown';

class NavBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      videoDropDown: false,
      appsDropDown: false,
    }
    this.vidDropDown = this.vidDropDown.bind(this);
    this.appDropDown = this.appDropDown.bind(this);
    this.closeDropDowns = this.closeDropDowns.bind(this);
  }

  vidDropDown(e) {
    e.preventDefault();
    this.setState({ videoDropDown: true }, () => {
    document.addEventListener('click', this.closeDropDowns);
   });
  }

  appDropDown(e) {
    e.preventDefault();
    this.setState({ appsDropDown: true }, () => {
    document.addEventListener('click', this.closeDropDowns);
   });
  }

  closeDropDowns(e) {
    e.preventDefault();
    this.setState({ videoDropDown: false, appsDropDown: false }, () => {
     document.removeEventListener('click', this.closeDropDowns);
   });
  }

  render() {

    const {currentUser, logout, openModal} = this.props
    let loggedin;
    if (!currentUser) {
      loggedin = <li>
        <Link to='/signin'>Sign In</Link>
      </li>} else {
        loggedin = <li onClick={logout}>LogOut</li>
      }

    let vid;
    let app;
    if (this.state.videoDropDown) {
      vid = <VideoDropDown />
    }
    if (this.state.appsDropDown) {
      vid = <AppDropDown />
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
              </li>
              {vid}
              <li onClick={this.appDropDown} id="nav-button">
                <span>  <i className="fas fa-th"></i></span>
                <nav className="tooltiptext">NewTube Apps</nav>
              </li>
              <li id="nav-button">
                <span><i className="fas fa-ellipsis-v"></i></span>
                <nav className="tooltiptext">Settings</nav>
              </li>
              {loggedin}
            </ul>
          </nav>
        </header>
      )
    }
  }


export default NavBar;
