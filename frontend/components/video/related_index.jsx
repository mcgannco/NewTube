import React from 'react';
import { Link } from 'react-router-dom';
import RelatedVideoIndexItem from './related_video_index_item';

class RelatedIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    this.props.requestAllVideos().then(this.props.requestAllUsers())
  }

  render() {
    let {videos, users, currentUserID, openVidModal,
      createWatch, deleteWatch, watchLaterButton, nightMode, vid} = this.props;
      return(
        <ul>
        {videos.map((video,idx) => <RelatedVideoIndexItem idx={idx} vid={vid} key={video.id}
        openVidModal={openVidModal} createWatch={createWatch} deleteWatch={deleteWatch}watchLaterButton={watchLaterButton}
        timeAgo= {video.timestamp} nightMode={nightMode} users={users} currentUserID={currentUserID}
        video={video} author={users[video.author_id] ? users[video.author_id].username : ""}/>)}
        </ul>
      )
    }
  }


export default RelatedIndex;
