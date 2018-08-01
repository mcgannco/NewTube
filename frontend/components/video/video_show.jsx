import React from 'react';
import { Link } from 'react-router-dom';
import RelatedVideoIndexContainer from './related_index_container';
import CommentsIndexContainer from './comments_index_container';
import ReactPlayer from 'react-player'
import { Route, Redirect, withRouter } from 'react-router-dom';

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
      isPlay: true,
      currentTime: "0:00",
      videoPlaying: true,
      videoLength: "",
      currentTimeNum: "",
      durationNum: "",
      showHandle: false,
      videoControls: false,
      volume: true
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
    this.nextVideo = this.nextVideo.bind(this);
    this.previousVideo = this.previousVideo.bind(this);
    this.toggleVolume = this.toggleVolume.bind(this);
    this.tick = this.tick.bind(this);
    this.getCurrentTime = this.getCurrentTime.bind(this);
    this.getDuration = this.getDuration.bind(this);
    this.getProgressWidth = this.getProgressWidth.bind(this);
    this.getHandlePos = this.getHandlePos.bind(this);
    this.toggleNewVideo = this.toggleNewVideo.bind(this);
    this.toggleHandle = this.toggleHandle.bind(this);
    this.hideHandle = this.hideHandle.bind(this);
    this.showVideoControls = this.showVideoControls.bind(this);
    this.hideVideoControls = this.hideVideoControls.bind(this);
    this.setNewTime = this.setNewTime.bind(this);
  }

  componentWillMount() {
    this.props.createView(this.props.match.params.id)
    this.props.recordView(this.props.match.params.id)
  }
  componentDidMount() {
    this.props.requestAllUsers()
    window.addEventListener("resize", this.updateWindowSize);
    $('.watch-later-bttn').hide()
    $('#app').animate({ scrollTop: top }, 0);
  }

  updateWindowSize() {
   this.setState({isColumnView: window.innerWidth <= 1000});
 }

 componentWillUnmount() {
   window.removeEventListener("resize", this.updateWindowSize);
 }

  componentWillReceiveProps(nextProps) {
    if (this.props.video && (this.props.video.id != nextProps.match.params.id)) {
      this.props.requestSingleVideo(nextProps.match.params.id).then($('#app').animate({ scrollTop: top }, 0)).then(
        this.props.createView(nextProps.match.params.id).then(this.props.recordView(nextProps.match.params.id)).then(this.toggleNewVideo)
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
    this.getDuration(e)
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

  getDuration(e) {
    let duration = e.currentTarget.duration;
    let hours  = Math.floor(duration / 3600);
    let minutes = Math.floor(duration/60)
    let seconds = Math.round(duration%60)
    if (hours > 0) {
      let t = new Date(1970,0,1);
      t.setSeconds(duration);
      var s = t.toTimeString().substr(0,8);
      if(duration > 86399) {
        s = Math.floor((t - Date.parse("1/1/70")) / 3600000) + s.substr(2);
      }
        this.setState({videoLength: s})
    } else {
      if(seconds < 10){
         this.setState({videoLength: `${minutes}:0${seconds}`})
      } else{
        this.setState({videoLength: `${minutes}:${seconds}`})
      }
    }
  }

  getCurrentTime(e) {
    let currentTime = e.currentTarget.currentTime;
    let hours  = Math.floor(currentTime / 3600);
    let minutes = Math.floor(currentTime/60)
    let seconds = Math.round(currentTime%60)
    if (hours > 0) {
      let t = new Date(1970,0,1);
      t.setSeconds(currentTime);
      var s = t.toTimeString().substr(0,8);
      if(currentTime > 86399) {
        s = Math.floor((t - Date.parse("1/1/70")) / 3600000) + s.substr(2);
      }
        this.setState({currentTime: s})
    } else {
      if(seconds < 10){
         this.setState({currentTime: `${minutes}:0${seconds}`})
      } else{
        this.setState({currentTime: `${minutes}:${seconds}`})
      }
    }
  }


  togglePlay(e) {
    let video = document.getElementById('vid-player')
    if (this.props.vidPlaying) {
      this.setState({videoPlaying: false})
      this.props.vPlaying(false);
      video.pause();
   } else {
      this.props.vPlaying(true);
      this.setState({videoPlaying: true})
      video.play();
   }
  }

  toggleNewVideo() {
    if (!this.props.vidPlaying) {
      this.props.vPlaying(true);
      this.setState({videoPlaying: true})
   }
  }

  handleEnd(e) {
    if(this.props.autoplay) {
      let currentIdx = this.props.videoQueue.indexOf(this.props.video.id)
      let nextIdx = (this.props.videoQueue.indexOf(this.props.video.id) + 1) > (this.props.videoQueue.length - 1) ? 0 : (this.props.videoQueue.indexOf(this.props.video.id) + 1)
      let nextVidId = this.props.videoHash[this.props.videoQueue[nextIdx]].id
      this.props.history.push(`/video/${nextVidId}`)
    }
  }

  editVid(e, video) {
    this.setState({editStatus: true, title: video.title, description: video.description})
  }

  cancelEdit(e) {
    this.setState({editStatus: false, title: "", description: ""})
  }

  handleLike(e) {
    if (!this.props.currentUser) {
      this.props.history.push('/signin');
      return;
    }
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
      this.props.history.push('/signin');
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

  nextVideo() {
    let currentIdx = this.props.videoQueue.indexOf(this.props.video.id)
    let nextIdx = (this.props.videoQueue.indexOf(this.props.video.id) + 1) > (this.props.videoQueue.length - 1) ? 0 : (this.props.videoQueue.indexOf(this.props.video.id) + 1)
    let nextVidId = this.props.videoHash[this.props.videoQueue[nextIdx]].id
    this.setState({videoPlaying: true})
    this.props.history.push(`/video/${nextVidId}`)
  }

  previousVideo() {
    let currentIdx = this.props.videoQueue.indexOf(this.props.video.id)
    let nextIdx = (this.props.videoQueue.indexOf(this.props.video.id) - 1) < 0 ? (this.props.videoQueue.length - 1) : (this.props.videoQueue.indexOf(this.props.video.id) - 1)
    let nextVidId = this.props.videoHash[this.props.videoQueue[nextIdx]].id
    this.setState({videoPlaying: true})
    this.props.history.push(`/video/${nextVidId}`)
  }

  toggleVolume() {
  let vid =  document.getElementsByClassName("video-player")[0]
    if(this.state.volume) {
      this.setState({volume: false})
      vid.muted = true;
    } else {
      this.setState({volume: true})
      vid.muted = false
    }
  }

  tick(e){
    this.getCurrentTime(e)
    this.setState({currentTimeNum: e.currentTarget.currentTime, durationNum: e.currentTarget.duration})
  }

  getProgressWidth() {
    return 98 * (this.state.currentTimeNum) / this.state.durationNum;
  }

  getHandlePos() {
   return 98 * (this.state.currentTimeNum) / this.state.durationNum;
 }

 toggleHandle() {
   this.setState({showHandle: true})
 }

 hideHandle() {
   this.setState({showHandle: false})
 }

 showVideoControls() {
   this.setState({videoControls: true})
 }

 hideVideoControls() {
   this.setState({videoControls: false})
 }

 setNewTime(e) {
   let xCoord = e.clientX - 35;
   let barWidth = document.getElementsByClassName("progress-background")[0].offsetWidth
   let newTime = (xCoord / barWidth) * this.state.durationNum
   document.getElementById('vid-player').currentTime = newTime
   this.setState({currentTimeNum: newTime })
 }

  render() {
    let {video,users, currentUser, nightMode} = this.props;
    let commentContainer;
    let relatedContainer;
    if (!video || !users ) {
      return null;
    } else if (video) {
      commentContainer =   <CommentsIndexContainer vidId={video.id} requestAllUsers={this.props.requestAllUsers} createComment={this.props.createComment} requestAllComments={this.props.requestAllComments}/>
      relatedContainer =   <RelatedVideoIndexContainer video={video}/>
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
      if(nightMode) {
        expandDescription = "expand-description-night";
        expandDescriptionMain = "expand-description-main-night";
        expandDescriptionShowMore = "expand-description-show-more-night";
      } else {
        expandDescription = "expand-description";
        expandDescriptionMain = "expand-description-main";
        expandDescriptionShowMore = "expand-description-show-more";
      }
    } else {
      if(nightMode) {
        expandDescription = "description-night";
        expandDescriptionMain = "description-main-night";
        expandDescriptionShowMore = "description-show-more-night";
      } else {
        expandDescription = "description";
        expandDescriptionMain = "description-main";
        expandDescriptionShowMore = "description-show-more";
      }
    }

    let videoTiteClass;
    let videoInputClass;
    let videoTextAreaClass;
    if(this.state.editStatus) {
      videoTiteClass = "hidden"
      if(nightMode) {
        videoInputClass = "edit-title-show-input-night"
        videoTextAreaClass = "edit-show-description-night"
      } else {
        videoInputClass = "edit-title-show-input"
        videoTextAreaClass = "edit-show-description"
      }
    } else {
      videoInputClass = "hidden"
      videoTextAreaClass = "hidden"
      if(nightMode) {
        videoTiteClass = "video-player-h1-night"
      } else {
        videoTiteClass = "video-player-h1"
      }
    }

    const progressWidth = { width: `${this.getProgressWidth()}%` };
     const handleLeftDist = { left: `calc(${this.getHandlePos()}% - 12px)` };
      return(
        <section className="video-show-container" id='body'>
        	<section className="video-player-container col col-2-3">
            <nav className="video-container"
              id='vid-player-container'
              onMouseEnter={this.showVideoControls}
              onMouseLeave={this.hideVideoControls}>
              <video
                autoPlay
                preload='metadata'
                onLoadedMetadata={this.videoSetup}
                onTimeUpdate={this.tick}
                onEnded={this.handleEnd}
                className="video-player"
                onClick={this.togglePlay}
                id="vid-player"
                src={video.video_url}
                />

              <section className={this.state.videoControls ? "vid-controls" : "hidden"}
                onMouseEnter={this.toggleHandle}
                onMouseLeave={this.hideHandle}>
                <section className="playbar-timeline">
                  <div className="progress-background"
                    onClick={this.setNewTime}></div>
                  <div className="progress-bar" style={progressWidth}
                    onClick={this.setNewTime}></div>
                  <div className={this.state.showHandle ? "progress-handle" : "hidden-handle"} style={handleLeftDist}>
                  </div>
                </section>

                <div className="playbar-buttons">

                  <div className="buttons-left">

                    <nav onClick={this.previousVideo} className="backward">
                      <i className="fas fa-step-backward"></i>
                    </nav>

                    <nav onClick={this.togglePlay} className={!this.state.videoPlaying ? "play-play-button" : 'hidden'}>
                      <i className="fas fa-play"></i>
                    </nav>

                    <nav onClick={this.togglePlay} className={this.state.videoPlaying ? "play-play-button" : 'hidden'}>
                      <i className="fas fa-pause"></i>
                    </nav>

                    <nav onClick={this.nextVideo} className="forward">
                      <i className="fas fa-step-forward"></i>
                    </nav>

                    <nav className={this.state.volume ? "video-volume" : "hidden"}
                      onClick={this.toggleVolume}>
                      <i className="fas fa-volume-up"></i>
                    </nav>

                    <nav className={!this.state.volume ? "video-volume" : "hidden"}
                      onClick={this.toggleVolume}>
                      <i class="fas fa-volume-off"></i>
                    </nav>

                    <nav className="video-time-summary">
                      <p>{this.state.currentTime } / {this.state.videoLength} </p>
                    </nav>


                    </div>



                </div>
              </section>

            </nav>

              <h1 className={videoTiteClass}>{video.title}</h1>
              <input onChange={this.updateTitle} className={videoInputClass} value={this.state.title}></input>
              <div className= {nightMode ? "video-stats-night" : "video-stats"}>
                <span className="total-views">{this.formatViews(this.props.video.view_count)} views</span>
                <div>
                  <span className={nightMode ? "video-show-likes-night" : "video-show-likes"}>
                    <nav onClick={() => this.handleLike(true)}>
                      <i className="fas fa-thumbs-up"></i>
                    </nav>
                    <p>{this.formatNumber(video.likes)}</p>
                  </span>
                  <span className={nightMode ? "video-show-dislikes-night" : "video-show-dislikes"}>
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
                      <Link to={`/channel/${video.author_id}`}>
                        <p className={nightMode ? "uploader-div-p-night" : "uploader-div-p"}>{users[video.author_id].username}</p>
                      </Link>
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
              <textarea onChange={this.updateDescription} value={this.state.description} className={videoTextAreaClass}>{this.state.description}</textarea>

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
