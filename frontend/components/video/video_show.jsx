import React from 'react';
import { Link } from 'react-router-dom';
import RelatedVideoIndexItem from './related_video_index_item';
import CommentsIndexContainer from './comments_index_container';

class VideoShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expandDescription: false,
      isColumnView: window.innerWidth <= 1000
    }
    this.updateWindowSize = this.updateWindowSize.bind(this);
    this.showMore = this.showMore.bind(this);
    this.convertDate = this.convertDate.bind(this);
  }
  componentDidMount() {
    this.props.requestSingleVideo(this.props.match.params.id)
    this.props.requestAllVideos().then(this.props.requestAllUsers())
    window.addEventListener("resize", this.updateWindowSize);
    window.scrollTo(0, 0);
  }

  updateWindowSize() {
   this.setState({isColumnView: window.innerWidth <= 1000});
 }

 componentWillUnmount() {
   window.removeEventListener("resize", this.updateWindowSize);
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

  componentDidUpdate() {
    let $continer = $('#vid-player-container');
    let $video = $('#vid-player');
  }

  convertDate(date) {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let d  = new Date(date);
    return d.toLocaleDateString("en-US", options);
  }

  render() {
    let {video, videos, users, currentUser} = this.props;
    if (!video || !users || currentUser) {
      return null;
    }

    if(!users[video.author_id]) {
      return null;
    }

    let showmore = this.state.expandDescription ? "SHOW LESS" : "SHOW MORE"
    let userIcon = users[video.author_id].username[0];
    let userAvatar = users[video.author_id].profile_img_url;
    let date = this.convertDate(video.timestamp)
      return(
        <section className="video-show-container" id='body'>
        	<section className="video-player-container col col-2-3">
            <nav className="video-container"
              id='vid-player-container'>
              <video
                autoPlay preload='metadata' controls
                className="video-player"
                id="vid-player"
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
                      <span style={
                        {backgroundImage: `url(${userAvatar})`}
                       }>{userIcon}</span>
                    </div>

                    <div>
                      <Link to={`/channel/${video.author_id}`}><p>{users[video.author_id].username}</p></Link>
                      <nav>Published on {date}</nav>
                    </div>

                    </div>

                    <button>Subscribe 3.4M</button>
                </div>
                <div className={this.state.expandDescription ? "expand-description" : "description"}>
                  <div>
                    <p className={this.state.expandDescription ? "expand-description-main" : "description-main"  }>
                      {video.description}
                    </p>
                    <p onClick={this.showMore}className={this.state.expandDescription ? "expand-description-show-more" : "description-show-more"}>{showmore}</p>
                  </div>
                </div>
              </div>

              <div className={!this.state.isColumnView ? "comments-container" : "hidden"}>
                <CommentsIndexContainer vidId={video.id} createComment={this.props.createComment} requestAllComments={this.props.requestAllComments}/>
              </div>

              </section>
        	</section>


        	<section className="col col-1-3">
            <ul>
            {videos.map((video,idx) => <RelatedVideoIndexItem idx={idx} key={video.id} timeAgo= {video.timestamp} video={video} author={users[video.author_id] ? users[video.author_id].username : ""}/>)}
            </ul>
            <div className={this.state.isColumnView ? "comments-container" : "hidden"}>
              <CommentsIndexContainer vidId={video.id} createComment={this.props.createComment} requestAllComments={this.props.requestAllComments}/>
            </div>
    			</section>
        </section>
      )
    }
  }


export default VideoShow;
