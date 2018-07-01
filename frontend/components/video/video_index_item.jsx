import React from 'react';
import { Link } from 'react-router-dom';

const VideoIndexItem = ({ video,idx, author }) => {
  return(
    <li>
      <div>
        <video className={idx} id='video' src={video.video_url} width="250" height="150"  />
        <p>{video.title}</p>
        <nav className="video-author-views"><span>{author}</span><span>Views</span> </nav>
      </div>
    </li>
  )

};

export default VideoIndexItem;
