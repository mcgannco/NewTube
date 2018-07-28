import React from 'react';
import { Link } from 'react-router-dom';

const SettingDropDown = () => {
  return(
    <div className="setting-drop-down-container">
      <ul className="setting-drop-down">
        <Link to='/signin'>
          <li className="drop-down-list-item">
            <div>
              <span>
                <i className="fas fa-moon"></i>
              </span>
              <div>Night Mode</div>
            </div>
            </li>
          </Link>
      </ul>
    </div>
  )
};

export default SettingDropDown;
