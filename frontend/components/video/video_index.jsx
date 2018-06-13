import React from 'react';
import { Link } from 'react-router-dom';
import VideoIndexItem from './video_index_item';

class VideoIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.props.requestAllVideos()
  }

  render() {
    let {videos} = this.props;
      return(
        <div>
          <ul>
          {videos.map(video => <VideoIndexItem key={video.id} video={video} />)}
          </ul>
        </div>
      )
    }
  }


export default VideoIndex;
