import React from 'react';
import { Link } from 'react-router-dom';

const VideoDropDown = () => {
  return(
      <ul className="video-drop-down">
        <Link to='/signin'>
          <li>
            <div>
              <span>
                <i className="fas fa-play"></i>
              </span>
              <div>Upload Video</div>
            </div>
            </li>
          </Link>

          <Link to='/signin'>
            <li>
              <div>
                <span>
                  <i className="fas fa-podcast"></i>
                </span>
                <div>Go live</div>
              </div>
              </li>
            </Link>


      </ul>
  )
};

export default VideoDropDown;
