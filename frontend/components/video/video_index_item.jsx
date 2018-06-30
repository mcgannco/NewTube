import React from 'react';
import { Link } from 'react-router-dom';

const VideoIndexItem = ({ video,idx }) => {

  return(
    <li>
      <div>
        <video className={idx} id='video' src={video.video_url} width="250" height="150"  />
        <p>{video.title}</p>
      </div>
    </li>
  )

};

export default VideoIndexItem;
