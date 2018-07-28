import React from 'react';
import { Link } from 'react-router-dom';

const VideoDropDown = ({nightMode}) => {
  return(
    <div className="video-drop-down-container">
      <ul className={nightMode ? "video-drop-down-night" : "video-drop-down"}>
        <Link to='/upload'>
          <li className={nightMode ? "drop-down-list-item-night" : "drop-down-list-item"}>
            <div>
              <span>
                <i className="fas fa-play"></i>
              </span>
              <div>Upload Video</div>
            </div>
            </li>
          </Link>
      </ul>
    </div>
  )
};

export default VideoDropDown;
