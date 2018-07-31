import React from 'react';
import { Link } from 'react-router-dom';
import RelatedVideoIndexItem from './related_video_index_item';

class RelatedIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videoQueueLength: 10,
      autoplay: this.props.autoplay
    }
    this.createVideoQueue  = this.createVideoQueue.bind(this);
    this.toggleAutoPlay  = this.toggleAutoPlay.bind(this);
  }
  componentDidMount() {
    this.props.requestAllVideos().then(this.props.requestAllUsers())
  }

  createVideoQueue() {
    let startIdx = this.props.videoQueue.indexOf(this.props.video.id) + 1 > this.props.videos.length ? 0 : this.props.videoQueue.indexOf(this.props.video.id) + 1;
    let count = this.state.videoQueueLength;
    let endIdx = startIdx+count
    let length = this.props.videos.length;
    let {videos} = this.props
    let sideBarQueue = videos.slice(startIdx,  endIdx>length?length: endIdx)
    .concat(videos.slice(0,  endIdx>length?endIdx-length: 0));
    return sideBarQueue
  }

  toggleAutoPlay() {
    if(this.props.currentUserID) {
      const formData = new FormData();
      formData.append("user[autoplay]", !this.state.autoplay);
      this.props.toggleAutoPlay(this.props.currentUserID, formData).then(
        this.setState({autoplay: !this.state.autoplay})
      );
    } else {
      this.props.history.push('/signin')
    }
  }

  render() {
    let {videos, users, currentUserID, openVidModal,
      createWatch, deleteWatch, watchLaterButton, nightMode, vid, videoQueue} = this.props;
    let sideBarQueue;
      if(videos.length > 0 && videoQueue.length > 0) {
        sideBarQueue = this.createVideoQueue()
      } else {
        return null;
      }

      return(
        <div>
          <div className="side-bar-queue-container">
            <h1 className={nightMode ? "side-bar-queue-h1-night" : "side-bar-queue-h1"}>Up Next</h1>
            <span className="side-bar-queue-toggle-container">
              <h1 className= "side-bar-queue-auto">AUTOPLAY</h1>

                <label class="switch">
                  <input onClick={this.toggleAutoPlay} type="checkbox" checked={this.state.autoplay}/>
                  <span class="slider round">
                  </span>
                </label>

            </span>
          </div>
          <ul>
          {sideBarQueue.map((video,idx) => <RelatedVideoIndexItem idx={idx} vid={vid} key={video.id}
          openVidModal={openVidModal} createWatch={createWatch} deleteWatch={deleteWatch}watchLaterButton={watchLaterButton}
          timeAgo= {video.timestamp} nightMode={nightMode} users={users} currentUserID={currentUserID}
          video={video} author={users[video.author_id] ? users[video.author_id].username : ""}/>)}
          </ul>
        </div>
      )
    }
  }


export default RelatedIndex;
