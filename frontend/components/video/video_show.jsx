import React from 'react';
import { Link } from 'react-router-dom';
import RelatedVideoIndexContainer from './related_index_container';
import CommentsIndexContainer from './comments_index_container';

class VideoShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expandDescription: false,
      isColumnView: window.innerWidth <= 1000,
      duration: 0,
      views: ""
    }
    this.updateWindowSize = this.updateWindowSize.bind(this);
    this.showMore = this.showMore.bind(this);
    this.convertDate = this.convertDate.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.videoSetup = this.videoSetup.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleSubs = this.handleSubs.bind(this);
    this.formatNumber = this.formatNumber.bind(this);
    this.formatViews = this.formatViews.bind(this);
  }

  componentWillMount() {
    this.props.createView(this.props.match.params.id)
  }
  componentDidMount() {
    this.props.requestAllUsers()
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
      this.props.requestSingleVideo(nextProps.match.params.id).then(window.scrollTo(0, 0)).then(
        this.props.createView(nextProps.match.params.id)
      );
    }
  }

  showMore(e) {
    if (e.currentTarget.innerText === "SHOW MORE") {
      this.setState({expandDescription: true})
    } else {
      this.setState({expandDescription: false})
    }
  }

  convertDate(date) {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let d  = new Date(date);
    return d.toLocaleDateString("en-US", options);
  }

  videoSetup(e) {
    let video = e.currentTarget;
    let playPromise = video.play();
    if (playPromise !== undefined) {
    playPromise.then(_ => {

    })
    .catch(error => {
      return null
    });
    }
  }

  togglePlay(e) {
    let video = document.getElementById('vid-player')
    if (this.props.vidPlaying) {
     this.props.vPlaying(false);
     video.pause();
   } else {
     this.props.vPlaying(true);
     video.play();
   }
  }

  handleEnd(e) {

  }

  handleLike(e) {
    if (!this.props.video) {
      return;
    }
    if (this.props.video.currentUsersLike.like_value === 'N/A') {
      this.props.createLike(this.props.video.id, {like_value: e});
    } else if (e === this.props.video.currentUsersLike.like_value) {
      const likeId = this.props.video.currentUsersLike.id;
      this.props.deleteLike(likeId);
    } else {
      this.props.updateLike(this.props.video.id, this.props.currentUser.id, {like_value: e});
    }
  }

  handleSubs(e) {

  }

  formatNumber(num) {
    num = Math.abs(num);
    let formattedNumber;
    if (num >= 1000000000) {
        formattedNumber = (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    } else if (num >= 1000000) {
        formattedNumber =  (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else  if (num >= 1000) {
        formattedNumber =  (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
        formattedNumber = num;
    }
    return formattedNumber;
  }

  formatViews(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    let {video,users, currentUser} = this.props;
    let commentContainer;
    let relatedContainer;
    if (!video || !users ) {
      return null;
    } else if (video) {
      commentContainer =   <CommentsIndexContainer vidId={video.id} requestAllUsers={this.props.requestAllUsers} createComment={this.props.createComment} requestAllComments={this.props.requestAllComments}/>
      relatedContainer =   <RelatedVideoIndexContainer />
    }
    if(!users[video.author_id]) {
      return null;
    }

    let showmore = this.state.expandDescription ? "SHOW LESS" : "SHOW MORE"
    let userIcon = users[video.author_id].username[0];
    let userAvatar = users[video.author_id].profile_img_url;
    let date = this.convertDate(video.timestamp);
    let playPauseButton;
    let play = window.play;
    let pause = window.pause;
    let icon;
    if(this.props.vidPlaying) {
      icon = pause;
      playPauseButton = <div style={
        {backgroundImage: `url(${pause})`}
       }></div>
    } else {
      icon = play;
      playPauseButton = <div style={
        {backgroundImage: `url(${play})`}
       }></div>
    }

      return(
        <section className="video-show-container" id='body'>
        	<section className="video-player-container col col-2-3">
            <nav className="video-container"
              id='vid-player-container'>
              <video
                controls
                autoPlay
                preload='metadata'
                onLoadedMetadata={this.videoSetup}
                onEnded={this.handleEnd}
                className="video-player"
                onClick={this.togglePlay}
                id="vid-player"
                src={video.video_url}
                />
            </nav>

              <h1>{video.title}</h1>
              <div className= "video-stats">
                <span className="total-views">{this.formatViews(this.props.video.view_count)} views</span>
                <div>
                  <span className="video-show-likes">
                    <nav onClick={() => this.handleLike(true)}>
                      <i className="fas fa-thumbs-up"></i>
                    </nav>
                    <p>{this.formatNumber(video.likes)}</p>
                  </span>
                  <span className="video-show-dislikes">
                    <nav onClick={() => this.handleLike(false)}>
                      <i className="fas fa-thumbs-down"></i>
                    </nav>
                    <p>{this.formatNumber(video.dislikes)}</p>
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

                  <button onClick={() => this.handleSubs(false)}>Subscribe {this.formatNumber(users[video.author_id].subCount)}</button>;
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
                {commentContainer}
              </div>

              </section>
        	</section>


        	<section className="col col-1-3">
            {relatedContainer}
            <div className={this.state.isColumnView ? "comments-container" : "hidden"}>
              {commentContainer}
            </div>
    			</section>
        </section>
      )
    }
  }


export default VideoShow;
