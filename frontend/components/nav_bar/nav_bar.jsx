import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../search/search';
const NavBar = ({currentUser, logout}) => {
  let loggedin;
  if (!currentUser) {
    loggedin = <li>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Signup</Link>
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
      				<img id="nav-bar-logo" src={window.logo}></img>
      				<span>NewTube</span>
      			</li>
      		</ul>
      	</nav>
        <nav className="nav-search">
          <Search />
        </nav>
      	<nav className="right-nav">
      		<ul>
      			<li>
              <span><i className="fas fa-video"></i></span>
      			</li>
            <li>
            <span>  <i className="fas fa-th"></i></span>
            </li>
            <li>
              <span><i className="fas fa-ellipsis-v"></i></span>
            </li>

      			{loggedin}
      		</ul>
      	</nav>
      </header>
    )
};

export default NavBar;
