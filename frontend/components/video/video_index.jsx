import React from 'react';
import { Link } from 'react-router-dom';
import VideoIndexItem from './video_index_item';

class VideoIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      headermargin: 0
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.props.requestAllVideos().then(this.updateWindowDimensions());
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    let a = document.getElementsByClassName("0")[0]
    if(a) {
      this.setState({ headermargin: a.offsetLeft });
    }
  }

  render() {
    let {videos} = this.props;
    let marg;
    if (document.getElementsByClassName("0")[0]) {
      marg = document.getElementsByClassName("0")[0].offsetLeft.toString();
    } else {
      marg = this.state.headermargin.toString();
    }

      return(
        <div className='video-index-container' id='body'>
          <div className='video-index'>
            <h1 style={{marginLeft: marg + 'px'}}>Recommended</h1>
            <ul>
            {videos.map((video,idx) => <VideoIndexItem idx={idx} key={video.id} video={video} />)}
            </ul>
          </div>
        </div>
      )
    }
  }


export default VideoIndex;
