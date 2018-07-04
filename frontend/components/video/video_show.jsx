import React from 'react';
import { Link } from 'react-router-dom';
import RelatedVideoIndexItem from './related_video_index_item';

class VideoShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expandDescription: false
    }
    this.showMore = this.showMore.bind(this);
  }
  componentDidMount() {
    this.props.requestSingleVideo(this.props.match.params.id)
    this.props.requestAllVideos().then(this.props.requestAllUsers())
    window.scrollTo(0, 0)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.video && (this.props.video.id != nextProps.match.params.id)) {
      this.props.requestSingleVideo(nextProps.match.params.id).then(window.scrollTo(0, 0));
    }
  }

  showMore(e) {
    if (e.currentTarget.innerText === "SHOW MORE") {
      this.setState({expandDescription: true})
    } else {
      this.setState({expandDescription: false})
    }
  }

  render() {
    let {video, videos, users} = this.props;
    if (!video || !users) {
      return null;
    }

    if(!users[video.author_id]) {
      return null;
    }
    let showmore = this.state.expandDescription ? "SHOW LESS" : "SHOW MORE"
    let userIcon = users[video.author_id].username[0];
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
                <span className="total-views">17,4999,333 views</span>
                <div>
                  <span className="video-show-likes">
                    <i className="fas fa-thumbs-up"></i>
                    <p>1,000</p>
                  </span>
                  <span className="video-show-dislikes">
                    <i className="fas fa-thumbs-down"></i>
                    <p>19</p>
                  </span>
                </div>
              </div>
              <section>
                <div className="sub-video-container">
                <div className="video-description">
                  <div className="uploader-container">
                    <div className="uploader-div">
                      <span>{userIcon}</span>
                    </div>

                    <div>
                      <p>{users[video.author_id].username}</p>
                      <nav>Uploaded on June 11, 2011</nav>
                    </div>

                    </div>

                    <button>Subscribe 3.4M</button>
                </div>
                <div className={this.state.expandDescription ? "expand-description" : "description"}>
                  <div>
                    <p className={this.state.expandDescription ? "expand-description-main": "description-main"}>
                      In the by the Los Angeles Lakers fby the Los Angeles Lakers f by the Los Angeles Lakers following LeBron James decision
                      In the by the Los Angeles Lakers fby the Los Angeles Lakers f by the Los Angeles Lakers following LeBron James decision
                      In the by the Los Angeles Lakers fby the Los Angeles Lakers f by the Los Angeles Lakers following LeBron James decision In the by the Los Angeles Lakers fby the Los Angeles Lakers f by the Los Angeles Lakers following LeBron James decision to join them, Stephen A. Smith asks Brian Windhorst how safe Lakers coach Luke Walton is, and whether Phil Jackson might twat</p>
                    <p onClick={this.showMore}className="description-show-more">{showmore}</p>
                  </div>
                </div>
              </div>

              </section>
        	</section>


        	<section className="col col-1-3">
            <ul>
            {videos.map((video,idx) => <RelatedVideoIndexItem idx={idx} key={video.id} timeAgo= {video.timestamp} video={video} author={users[video.author_id] ? users[video.author_id].username : ""}/>)}
            </ul>
    			</section>
        </section>
      )
    }
  }


export default VideoShow;
