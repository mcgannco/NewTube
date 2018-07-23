import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';

class VideoResultItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      new: false,
      videoLength: "",
      currentTime: 0,
      playButton: false,
      preview: false,
      showTime: true,
      optionsDropDown: false,
      targetVid: "",
      watched: false
    }
    this.formatNum = this.formatNum.bind(this)
    this.preview = this.preview.bind(this)
    this.closePreview = this.closePreview.bind(this)
    this.getDuration = this.getDuration.bind(this)
    this.resetPreview = this.resetPreview.bind(this)
    this.tick = this.tick.bind(this)
    this.clockWatch = this.clockWatch.bind(this)
    this.watchLater = this.watchLater.bind(this)
    this.toggleOptions = this.toggleOptions.bind(this)
    this.closeToggleOptions = this.closeToggleOptions.bind(this)
    this.editVideo = this.editVideo.bind(this)
    this.deleteVideo = this.deleteVideo.bind(this)
    this.editclosePreview = this.editclosePreview.bind(this)
    this.hide = this.hide.bind(this)
  }

  formatNum(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  preview(e) {
    let video = e.currentTarget.children[0].children[0]
    video.muted = true;
    let playPromise = video.play();
    if (playPromise !== undefined) {
    playPromise.then(_ => {
      this.setState({preview: true, showTime: false})
    })
    .catch(error => {
      return null
    });
  }
}

  closePreview(e) {
    let video = e.currentTarget.children[0].children[0]
    video.pause()
    this.setState({preview: false, currentTime: 0, playButton: false, showTime: true})
    video.currentTime = 0
  }

  resetPreview(e) {
    e.currentTarget.pause()
    e.currentTarget.currentTime = 0
    this.setState({playButton: true, showTime: true, currentTime: 0})
  }


  tick(e) {
    let video = e.currentTarget;
    this.setState({currentTime: video.currentTime})
    if(this.state.currentTime >= 4) {
      this.resetPreview(e);
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

  clockWatch(e,video) {
    e.preventDefault()
    this.setState({targetVid: video})
    this.watchLater(e,video)
  }

  watchLater(e,video) {
    let vid = e.target.parentElement.parentElement.children[0];
    let id = this.state.targetVid || video
    let {users, currentUser} = this.props;
    if(users[currentUser].watchLaterIds.includes(id.id)) {
      this.props.deleteWatch(id.id)
      this.props.watchLaterButton("Removed From")
      $('.watch-later-bttn').show();
    } else {
      this.props.createWatch(id.id)
      this.props.watchLaterButton("Added To")
      $('.watch-later-bttn').show();
    }
  }

  toggleOptions(e, video) {
    e.preventDefault()
    this.setState({ optionsDropDown: true, targetVid: video }, () => {
    document.getElementById('body').addEventListener('click', this.closeToggleOptions);
    });
  }

  closeToggleOptions(e) {
    e.preventDefault()
    if(e.target.id === "edit-vid") {
      this.editVideo(e)
    } else if (e.target.id === "delete-vid") {
      this.deleteVideo(e)
    } else if (e.target.id === "watch-later") {
      this.watchLater(e)
    } else {
      this.setState({ optionsDropDown: false, targetVid: "" }, () => {
        document.getElementById('body').removeEventListener('click', this.closeToggleOptions);
      });
    }
  }

  editVideo(e) {
    let vid = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0]
    let id = this.state.targetVid
    this.editclosePreview(vid)
    this.props.openVidModal('edit', id)
    this.setState({targetVid: ""})
  }

  deleteVideo(e) {
    let vid = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0]
    let id = this.state.targetVid
    this.editclosePreview(vid)
    this.props.openVidModal('delete', id).then(
      this.setState({targetVid: "", optionsDropDown: false})
    )
  }

  editclosePreview(e) {
    let video = e
    video.pause()
    this.setState({preview: false, currentTime: 0, playButton: false, showTime: true, optionsDropDown: false})
    video.currentTime = 0
  }

  hide() {
    this.setState({ optionsDropDown: false, targetVid: "" }, () => {
      document.getElementById('body').removeEventListener('click', this.closeToggleOptions);
    });
  }

  render() {
    let { video, timeAgo, users, currentUser} = this.props;
    let toggleDD;
    let date = new Date(timeAgo);
    let newStatus;
    if(date) {
      let current = new Date();
      let upload = new Date(video.timestamp)
      if((current - upload) / 1000 / 60 / 60 / 24 <= 7) {
        newStatus = "New";
      }
    }

    if(this.state.optionsDropDown) {

      toggleDD = <div className="toggleOptionsDD" id="toggleDD">
        <span onClick={this.editVideo} id = "edit-vid" className={video.author_id === currentUser ? "" : "hidden"}>Edit</span>
        <span onClick={this.deleteVideo} id = "delete-vid" className={video.author_id === currentUser ? "" : "hidden"}>Delete</span>
        <span onClick={this.hide}id="watch-later">Watch Later</span>
      </div>
    }

    return(
        <Link to={`video/${video.id}`}>
        <div className="video-result-container"
          onMouseEnter={this.preview}
          onMouseLeave={this.closePreview}>
          <div className="video-result-thumb">
            <video
              src={video.video_url}
              onLoadedMetadata={this.getDuration}
              onTimeUpdate={this.tick}
              width="250"
              height="160"
              />
              <nav className={this.state.showTime ? "video-duration" : "no-video-duration"}>{this.state.videoLength}</nav>
              <nav className={this.state.playButton ? "result-play-button" : "no-play-button"}><i className="fas fa-play"></i></nav>

            <nav onClick={(e) => this.clockWatch(e,video)} className={currentUser && this.state.preview && !users[currentUser].watchLaterIds.includes(video.id) ? "result-clock" : "no-clock"}><i className="far fa-clock"></i></nav>
            <nav onClick={(e) => this.clockWatch(e,video)} className={currentUser && this.state.preview &&  users[currentUser].watchLaterIds.includes(video.id) ? "result-check" : "no-clock"}><i className="fas fa-check"></i></nav>
          </div>

          <div className="video-result-info">
            <div className="result-content">
              <div className="result-top-row">
                <span className="video-result-title">{video.title}</span>

                  <div className="result-options">
                    <span onClick={(e) => this.toggleOptions(e, video)} className={this.state.preview ? "video-index-options-dd" : "video-index-options-dd-hidden"}>
                      <i className="fas fa-ellipsis-v"></i>
                    </span>
                    {toggleDD}
                  </div>
              </div>

                <div className="video-result-stats">
                  <Link to={`/channel/${video.author_id}`}><span className="video-result-author">{users[video.author_id].username}</span></Link>
                    <span className="result-dot-seperator">
                      <i className="fas fa-circle"></i>
                    </span>
                  <span>{this.formatNum(video.view_count)} views</span>
                  <span className="result-dot-seperator">
                    <i className="fas fa-circle"></i>
                  </span>
                  <span>
                    <TimeAgo date={date} minPeriod='60' />
                  </span>
                </div>

                <p className="video-result-description">
                  {video.description}
                </p>
                <div>

                </div>
                <span>{this.state.new ? "New" : ""}</span>
              </div>
              <span className="new-status">
                {newStatus}
              </span>
            </div>
        </div>
        </Link>
    )

  }

};

export default VideoResultItem;
