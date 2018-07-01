import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';

const VideoIndexItem = ({ video,idx, author, timeAgo }) => {
  let date = new Date(timeAgo);
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
              <i className="fas fa-circle"></i>
            </span>

            <span><TimeAgo date={date} minPeriod='60' /></span>

          </div>
          </nav>
      </div>
    </li>
  )

};

export default VideoIndexItem;
