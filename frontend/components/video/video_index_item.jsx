import React from 'react';
import { Link } from 'react-router-dom';

const VideoIndexItem = ({ video }) => {
  return(
    <li>
      <span>{video.title}</span>
      <video src={video.video_url} width="320" height="240" controls />
    </li>
  )

};

export default VideoIndexItem;
