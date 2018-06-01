import React from 'react';
import { Link } from 'react-router-dom';

const VideoDropDown = () => {
  return(
    <div className="video-drop-down">
      <ul>
        <li><Link to='/signin'>Upload Video </Link></li>
        <li>Go live</li>
      </ul>
    </div>
  )
};

export default VideoDropDown;
