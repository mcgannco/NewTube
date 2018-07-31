import React from 'react';
import { Link } from 'react-router-dom';
import RelatedVideoIndexItem from './related_video_index_item';

class RelatedIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videoQueueLength: 10
    }
  }
  componentDidMount() {
    this.props.requestAllVideos().then(this.props.requestAllUsers())
  }

  createVideoQueue() {
    let startIdx = this.props.videoQueue.indexOf(this.props.video.id);
    let count = this.state.videoQueueLength;
    let endIdx = startIdx+count
    let length = this.props.videos.length;
    let {videos} = this.props

    let sideBarQueue = videos.slice(startIdx,  endIdx>length?length: endIdx)
    .concat(videos.slice(0,  endIdx>length?endIdx-length: 0));

    return sideBarQueue

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
        <ul>
        {sideBarQueue.map((video,idx) => <RelatedVideoIndexItem idx={idx} vid={vid} key={video.id}
        openVidModal={openVidModal} createWatch={createWatch} deleteWatch={deleteWatch}watchLaterButton={watchLaterButton}
        timeAgo= {video.timestamp} nightMode={nightMode} users={users} currentUserID={currentUserID}
        video={video} author={users[video.author_id] ? users[video.author_id].username : ""}/>)}
        </ul>
      )
    }
  }


export default RelatedIndex;
