import React from 'react';
import { Link } from 'react-router-dom';

const VideoDropDown = () => {
  return(
    <div className="video-drop-down-container">
      <ul className="video-drop-down">
        <Link to='/upload'>
          <li className="drop-down-list-item">
            <div>
              <span>
                <i className="fas fa-play"></i>
              </span>
              <div>Upload Video</div>
            </div>
            </li>
          </Link>

          <Link to='/signin'>
            <li className="drop-down-list-item">
              <div>
                <span>
                  <i className="fas fa-podcast"></i>
                </span>
                <div>Go live</div>
              </div>
              </li>
            </Link>
      </ul>
    </div>
  )
};

export default VideoDropDown;
