import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../search/search';
const NavBar = ({currentUser, logout}) => {

  const loggedOut = () => {
    return(
      <header className="main-nav">
      	<nav className="left-nav">
      		<ul>
      			<li id="sections-sidebar-btn">
      				<i className="fa fa-bars"></i>
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
      				<button>Subscribe Now</button>
      			</li>
      			<li>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Signup</Link>
      			</li>
      			<li id="gear-dropdown-btn">
      				<i className="fas fa-cog"></i>
      			</li>
      		</ul>
      	</nav>
      </header>
    )
  }

  const loggedIn = () => {
    return(
      <header className="main-nav">
      	<nav className="left-nav">
      		<ul>
      			<li id="sections-sidebar-btn">
      				<i className="fa fa-bars"></i>
      				<span>sections</span>
      			</li>
      			<li id="search-modal-btn">
      				<i className="fa fa-search"></i>
      				<span>search</span>
      			</li>
      		</ul>
      	</nav>
      	<nav className="right-nav">
      		<ul>
      			<li>
      				<button>Subscribe Now</button>
      			</li>
      			<li>
              <a href="#"onClick={logout}>Logout</a>
      			</li>
      			<li id="gear-dropdown-btn">
      				<i className="fas fa-cog"></i>
      			</li>
      		</ul>
      	</nav>
      </header>
    )
  }

  return currentUser ?  loggedIn() : loggedOut();
};

export default NavBar;
