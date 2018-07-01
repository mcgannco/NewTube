import React from 'react';
import { Link } from 'react-router-dom';

const VideoIndexItem = ({ video,idx, author }) => {
  return(
    <li>
      <div>
        <video className={idx} id='video' src={video.video_url} width="250" height="150"  />
        <p>{video.title}</p>
        <nav className="video-author-views">
          <span>{author}</span>

          <div>
            <span>100K views</span>

            <span className="dot-seperator">
              <i class="fas fa-circle"></i>
            </span>

            <span>2 weeks ago</span>

          </div>
          </nav>
      </div>
    </li>
  )

};

export default VideoIndexItem;
