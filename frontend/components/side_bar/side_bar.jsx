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

          <div className="side-bar-section-one">
            <div>
              <i class="fas fa-home"></i>
              <p>Home</p>
            </div>

            <div>
              <i class="fas fa-fire"></i>
              <p>Trending</p>
            </div>

            <div>
              <i class="far fa-folder-open"></i>
              <p>Subscriptions</p>
            </div>
          </div>





    </div>
  )
};

export default SideBar;
