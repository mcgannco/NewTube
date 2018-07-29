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
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    this.props.requestAllVideos().then(this.props.requestAllUsers()).then(this.updateWindowDimensions());
    let margin;
    let width = window.innerWidth;
    let num_vids = Math.floor(width / 225);
    let vids_length = num_vids * 225;
    margin = ((width - vids_length) / 2) + 2.5;
    this.setState({headermargin: margin, headerwidth: width - (margin * 2)})
    $('body').animate({ scrollTop: top }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    let a = document.getElementById("video-0")
    if(a) {
      let width = window.innerWidth;
      let headerWidth = (width - (a.offsetLeft * 2))
      let margin = a.offsetLeft
      this.setState({ headermargin: margin, headerwidth: headerWidth});
    }
  }

  render() {
    let {videos, users, currentUserID, openVidModal, createWatch,
      deleteWatch, watchLaterButton, nightMode} = this.props;
    let marg;
    if (document.getElementById("video-0")) {
      marg = document.getElementById("video-0").offsetLeft.toString();
    } else {
      marg = this.state.headermargin.toString();
    }

    let header;
    if(this.state.headerwidth) {
      header = this.state.headerwidth
    }

    if (!users) {
      return null;
    }
      return(
        <div className='video-index-container' id='body'>
          <div className='video-index'>
            <div className="video-header" style={{marginLeft: marg + 'px', width: header + 'px'}}>
              <h1 className={nightMode ? "video-header-h1-night" : "video-header-h1"}>Recommended</h1>
              </div>
            <ul>
            {videos.map((video,idx) => <VideoIndexItem idx={idx} users={users} key={video.id} timeAgo= {video.timestamp} video={video}
            currentUserID={currentUserID} watchLaterButton={watchLaterButton}
            createWatch={createWatch} deleteWatch={deleteWatch}
            openVidModal={openVidModal}
            author={users[video.author_id] ? users[video.author_id].username : ""}
            nightMode={nightMode}/>)}
            </ul>
          </div>

          <button
            id="watch-later-bttn-toggle"
            className={this.props.button ? "watch-later-bttn" : "hidden"}>{this.props.button} Watchlist
          </button>

        </div>
      )
    }
  }


export default VideoIndex;
