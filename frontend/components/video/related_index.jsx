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
    let {videos, users} = this.props;

      return(
        <ul>
        {videos.map((video,idx) => <RelatedVideoIndexItem idx={idx} key={video.id} timeAgo= {video.timestamp} video={video} author={users[video.author_id] ? users[video.author_id].username : ""}/>)}
        </ul>
      )
    }
  }


export default RelatedIndex;
