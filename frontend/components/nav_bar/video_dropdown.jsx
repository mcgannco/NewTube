import React from 'react';
import { Link } from 'react-router-dom';

const VideoDropDown = () => {
  return(
    <div className="video-drop-down">
      <ul>
        <li>
          <div>
            <span>
              <i className="fas fa-video"></i>
            </span>

            <Link to='/signin'>Upload Video </Link>
          </div>
          </li>

        <li>Go live</li>
      </ul>
    </div>
  )
};

export default VideoDropDown;
