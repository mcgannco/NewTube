import React from 'react';
import { Link } from 'react-router-dom';
import VideoIndexItem from './video_index_item';

class VideoShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    this.props.requestSingleVideo(this.props.match.params.id)
    this.props.requestAllVideos().then(this.props.requestAllUsers())
    window.scrollTo(0, 0)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.video && (this.props.video.id != nextProps.match.params.id)) {
      this.props.requestSingleVideo(nextProps.match.params.id);
    }
  }

  render() {
    let {video, videos, users} = this.props;
    if (!video || !users) {
      return null;
    }
      return(
        <section className="video-show-container" id='body'>
        	<section className="video-player-container col col-2-3">
            <nav className="video-container">
              <video
                className="video-player"
                src={video.video_url}
                />
            </nav>

              <h1>{video.title}</h1>
              <div className= "video-stats">
                <span>17,4999,333 views</span>
                <div>
                  <span>
                    <i className="fas fa-thumbs-up"></i>
                    <p>234</p>
                  </span>
                  <span>
                    <i className="fas fa-thumbs-down"></i>
                    <p>234</p>
                  </span>
                </div>
              </div>
        	</section>
        	<section className="col col-1-3">
            <ul>
            {videos.map((video,idx) => <VideoIndexItem idx={idx} key={video.id} timeAgo= {video.timestamp} video={video} author={users[video.author_id] ? users[video.author_id].username : ""}/>)}
            </ul>
    			</section>
        </section>
      )
    }
  }


export default VideoShow;
