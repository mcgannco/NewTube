import React from 'react';
import { Link } from 'react-router-dom';

const UserDropDown = ({currentUser, logout}) => {
  return(
    <div className="user-drop-down-container">
      <ul className="user-drop-down">
        <Link to='/signin'>
          <li className="drop-down-list-item">
            <div>
              <span>
                <i className="fas fa-play"></i>
              </span>
              <div>{currentUser.username}</div>
            </div>
            </li>
          </Link>

          <div onClick={logout}>
            <li className="drop-down-list-item">
              <div>
                <span>
                  <i className="fas fa-podcast"></i>
                </span>
                <div>Sign out</div>
              </div>
              </li>
            </div>
      </ul>
    </div>
  )
};

export default UserDropDown;
