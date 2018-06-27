import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = ({closeModal}) => {
  return(
    <div className="side-bar">
          <span onClick={closeModal}>
              <i className="fa fa-bars"></i>
              <div>
                <Link to="/"><img id="nav-bar-logo" src={window.logo}></img></Link>
                <p>NewTube</p>
              </div>
          </span>

          <div className="side-bar-section-one">
            <div>
              <nav><i className="fas fa-home"></i></nav>
              <p>Home</p>
            </div>

            <div>
              <nav><i className="fas fa-fire"></i></nav>
              <p>Trending</p>
            </div>

            <div>
              <nav><i className="far fa-folder-open"></i></nav>
              <p>Subscriptions</p>
            </div>
          </div>
        </div>
    )
};

export default SideBar;
