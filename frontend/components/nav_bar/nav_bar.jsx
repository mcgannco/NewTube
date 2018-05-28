import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../search/search';
const NavBar = ({currentUser, logout}) => {
  let loggedin;
  if (!currentUser) {
    loggedin = <li>
      <Link to='/login'>Sign In</Link>
    </li>} else {
      loggedin = <li onClick={logout}>LogOut</li>
    }
    return(
      <header className="main-nav">
      	<nav className="left-nav">
      		<ul>
      			<li id="sections-sidebar-btn">
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
      			<li>
              <span>
                <i className="fas fa-video"></i>
              </span>
              <nav className="tooltiptext">Create a video or post</nav>
      			</li>
            <li>
            <span>  <i className="fas fa-th"></i></span>
            <nav className="tooltiptext">NewTube Apps</nav>
            </li>
            <li>
              <span><i className="fas fa-ellipsis-v"></i></span>
              <nav className="tooltiptext">Settings</nav>
            </li>
      			{loggedin}
      		</ul>
      	</nav>
      </header>
    )
};

export default NavBar;
