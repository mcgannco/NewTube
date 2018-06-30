import React from 'react';
import { Link } from 'react-router-dom';
import VideoIndexItem from './video_index_item';

class VideoIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      headermargin: 0,
      headerwidth: 0,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.initialMargin = this.initialMargin.bind(this);
  }

  componentDidMount() {
    this.props.requestAllVideos().then(this.updateWindowDimensions());
    window.addEventListener('resize', this.updateWindowDimensions);
    let margin;
    let width = window.innerWidth;
    margin  = this.initialMargin(width);
    this.setState({headermargin: margin, headerwidth: width - (margin * 2)})
  }

  initialMargin(width) {
    let num_vids = Math.floor(width / 225);
    let vids_length = num_vids * 225;
    let remaining_margin = ((width - vids_length) / 2) + 2.5;
    return remaining_margin;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    let a = document.getElementsByClassName("0")[0]
    if(a) {
      let width = window.innerWidth;
      let headerWidth = (width - (a.offsetLeft * 2))
      this.setState({ headermargin: a.offsetLeft, headerwidth: headerWidth});
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

    let header;
    if(this.state.headerwidth) {
      header = this.state.headerwidth
    }

      return(
        <div className='video-index-container' id='body'>
          <div className='video-index'>
            <h1 style={{marginLeft: marg + 'px', width: header + 'px'}}>Recommended</h1>
            <ul>
            {videos.map((video,idx) => <VideoIndexItem idx={idx} key={video.id} video={video} />)}
            </ul>
          </div>
        </div>
      )
    }
  }


export default VideoIndex;
