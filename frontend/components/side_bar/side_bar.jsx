import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = ({closeModal}) => {
  return(
    <div className="side-bar">
          <span onClick={closeModal}>
              <i className="fa fa-bars"></i>
              <Link to="/"><img id="nav-bar-logo" src={window.logo}></img></Link>
              <p>NewTube</p>
          </span>
          <div>Trending</div>

    </div>
  )
};

export default SideBar;
