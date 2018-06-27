import React from 'react';
import { Link } from 'react-router-dom';

const AppDropDown = () => {
  return(
    <div className="app-drop-down-container">
      <ul className="app-drop-down">
        <Link to='/signin'>
          <li className="drop-down-list-item">
            <div>
              <span>
                <i className="fas fa-play"></i>
              </span>
              <div>Channels</div>
            </div>
            </li>
          </Link>

          <Link to='/signin'>
            <li className="drop-down-list-item">
              <div>
                <span>
                  <i className="fas fa-podcast"></i>
                </span>
                <div>Channels</div>
              </div>
              </li>
            </Link>
      </ul>
    </div>
  )
};

export default AppDropDown;
