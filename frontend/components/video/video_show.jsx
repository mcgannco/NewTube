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
      views: "",
      editStatus: false,
      title: "",
      description: ""
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
    this.editVid = this.editVid.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    this.props.createView(this.props.match.params.id)
    this.props.recordView(this.props.match.params.id)
  }
  componentDidMount() {
    this.props.requestAllUsers()
    window.addEventListener("resize", this.updateWindowSize);
    $('.watch-later-bttn').hide()
    $('body').animate({ scrollTop: top }, 0);
  }

  updateWindowSize() {
   this.setState({isColumnView: window.innerWidth <= 1000});
 }

 componentWillUnmount() {
   window.removeEventListener("resize", this.updateWindowSize);
 }

  componentWillReceiveProps(nextProps) {
    if (this.props.video && (this.props.video.id != nextProps.match.params.id)) {
      this.props.requestSingleVideo(nextProps.match.params.id).then($('body').animate({ scrollTop: top }, 0)).then(
        this.props.createView(nextProps.match.params.id).then(this.props.recordView(nextProps.match.params.id))
      );
    }
    $('.watch-later-bttn')
    setTimeout(function() {
        $(".watch-later-bttn").fadeOut(1500);
    }, 3000);
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

  editVid(e, video) {
    this.setState({editStatus: true, title: video.title, description: video.description})
  }

  cancelEdit(e) {
    this.setState({editStatus: false, title: "", description: ""})
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
    const { video, deleteSub, createSub, users, currentUser } = this.props;
    if (!video) {
      return;
    }
    let subscribee_id = video.author_id
    if (!currentUser) {
      this.props.history.push('/login');
      return;
    }

    if (currentUser.subscriberIds.includes(subscribee_id)) {
      deleteSub(subscribee_id);
    } else {
      createSub(subscribee_id);
    }
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

  updateTitle(e) {
    this.setState({title: e.currentTarget.value})
  }

  updateDescription(e) {
    this.setState({description: e.currentTarget.value})
  }

  submit(e) {
    e.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const formData = new FormData();
    if(title) {
      formData.append("video[title]", title);
    }

    if (description) {
      formData.append("video[description]", description);
    }

    this.props.editVideo(this.props.video.id, formData).then(
      this.setState({editStatus: false,
        title: "",
        description: ""
    })
    )
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

    let subButton;
    let subButtonClass;
    if(currentUser && currentUser.id === video.author_id) {
      subButtonClass = "hidden"
    }
    else if(currentUser && currentUser.subscriberIds.includes(video.author_id)) {
      subButton = "SUBSCRIBED"
      subButtonClass = "subscribed-button"
    } else {
      subButton = "SUBSCRIBE"
      subButtonClass = "sub-vid-show"
    }

    let expandDescription;
    let expandDescriptionMain;
    let expandDescriptionShowMore;

    if (this.state.editStatus) {
      expandDescription = "hidden";
      expandDescriptionMain = "hidden";
      expandDescriptionShowMore = "hidden";
    } else if (this.state.expandDescription) {
      expandDescription = "expand-description";
      expandDescriptionMain = "expand-description-main";
      expandDescriptionShowMore = "expand-description-show-more";
    } else {
      expandDescription = "description";
      expandDescriptionMain = "description-main";
      expandDescriptionShowMore = "description-show-more";
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

              <h1 className={this.state.editStatus ? "hidden" : ""}>{video.title}</h1>
              <input onChange={this.updateTitle} className={this.state.editStatus ? "edit-title-show-input" : "hidden"} value={this.state.title}></input>
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
                      }>{users[video.author_id].profile_img_url === "/avatars/original/missing.png" ? userIcon : ""}</span>
                    </div>

                    <div>
                      <Link to={`/channel/${video.author_id}`}><p>{users[video.author_id].username}</p></Link>
                      <nav>Published on {date}</nav>
                    </div>

                    </div>
                <nav className="video-show-edit-bttns">
                <button className={subButtonClass} onClick={this.handleSubs}>{subButton} {this.formatNumber(users[video.author_id].subscribeeIds.length)}</button>
                <button onClick={(e) => this.editVid(e, video)} className={currentUser && video.author_id === currentUser.id && !this.state.editStatus ? "edit-vid" : "hidden"}>EDIT</button>
                <button onClick={this.cancelEdit} className={currentUser && video.author_id === currentUser.id && this.state.editStatus ? "edit-vid" : "hidden"}>CANCEL</button>
                <button onClick={this.submit} className={currentUser && video.author_id === currentUser.id && this.state.editStatus ? "save-vid" : "hidden"}>SAVE</button>
              </nav>

                </div>
                <div className={expandDescription}>
                  <div>
                    <p className={expandDescriptionMain}>
                      {video.description}
                    </p>
                    <p onClick={this.showMore} className={expandDescriptionShowMore}>{showmore}</p>
                  </div>
                </div>
              </div>
              <textarea onChange={this.updateDescription} value={this.state.description} className={this.state.editStatus ? "edit-show-description" : "hidden"}>{this.state.description}</textarea>

              <div className={!this.state.isColumnView ? "comments-container" : "hidden"}>
                {commentContainer}
              </div>

              </section>
              <button
                id="watch-later-bttn-toggle"
                className={this.props.button ? "watch-later-bttn" : "hidden"}>{this.props.button} Watchlist
              </button>
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
