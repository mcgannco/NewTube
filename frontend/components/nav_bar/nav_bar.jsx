import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({currentUser, logout}) => {

  const sessionLinks = () => {
    return(
      <div className="signIn">
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </div>
    )
  }

  const greeting = () => {
    return(
      <div className="greeting">
        <p className="welcome">Welcome, {currentUser.username}</p>
        <a href="#"onClick={logout}>Logout</a>
      </div>
    )
  }

  return currentUser ?  greeting() : sessionLinks();
};

export default NavBar;
