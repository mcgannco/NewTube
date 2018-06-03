import React from 'react';
import { Link } from 'react-router-dom';

const UserDropDown = () => {
  return(
      <ul className="video-drop-down">
        <Link to='/signin'>
          <li className="drop-down-list-item">
            <div>
              <span>
                <i className="fas fa-play"></i>
              </span>
              <div>Upload Profile</div>
            </div>
            </li>
          </Link>

          <Link to='/signin'>
            <li className="drop-down-list-item">
              <div>
                <span>
                  <i className="fas fa-podcast"></i>
                </span>
                <div>User</div>
              </div>
              </li>
            </Link>


      </ul>
  )
};

export default UserDropDown;
