import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({currentUser, logout}) => {

  const loggedOut = () => {
    return(
      <div className="signIn">


      <header class="main-nav">
      	<nav class="left-nav">
      		<ul>
      			<li id="sections-sidebar-btn">
      				<i class="fa fa-bars"></i>
      				<span>sections</span>
      			</li>
      			<li id="search-modal-btn">
      				<i class="fa fa-search"></i>
      				<span>search</span>
      			</li>
      		</ul>
      	</nav>
      	<nav class="right-nav">
      		<ul>
      			<li>
      				<button>Subscribe Now</button>
      			</li>
      			<li>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Signup</Link>
      			</li>
      			<li id="gear-dropdown-btn">
      				<i class="fas fa-cog"></i>
      			</li>
      		</ul>
      	</nav>
      </header>
      </div>
    )
  }

  const loggedIn = () => {
    return(
      <header class="main-nav">
      	<nav class="left-nav">
      		<ul>
      			<li id="sections-sidebar-btn">
      				<i class="fa fa-bars"></i>
      				<span>sections</span>
      			</li>
      			<li id="search-modal-btn">
      				<i class="fa fa-search"></i>
      				<span>search</span>
      			</li>
      		</ul>
      	</nav>
      	<nav class="right-nav">
      		<ul>
      			<li>
      				<button>Subscribe Now</button>
      			</li>
      			<li>
              <a href="#"onClick={logout}>Logout</a>
      			</li>
      			<li id="gear-dropdown-btn">
      				<i class="fas fa-cog"></i>
      			</li>
      		</ul>
      	</nav>
      </header>
    )
  }

  return currentUser ?  loggedIn() : loggedOut();
};

export default NavBar;
