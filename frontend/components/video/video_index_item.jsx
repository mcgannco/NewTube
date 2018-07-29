import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';
import { Route, Redirect, withRouter } from 'react-router-dom';

class VideoIndexItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videoLength: "",
      currentTime: 0,
      playButton: false,
      preview: false,
      showTime: true,
      optionsDropDown: false,
      targetVid: "",
      watched: false
    }
    this.preview = this.preview.bind(this);
    this.closePreview = this.closePreview.bind(this);
    this.getDuration = this.getDuration.bind(this);
    this.tick = this.tick.bind(this);
    this.formatNumber = this.formatNumber.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
    this.closeToggleOptions = this.closeToggleOptions.bind(this);
    this.editVideo = this.editVideo.bind(this);
    this.editclosePreview = this.editclosePreview.bind(this);
    this.watchLater = this.watchLater.bind(this);
    this.hide = this.hide.bind(this);
    this.clockWatch = this.clockWatch.bind(this);
  }

  componentDidMount() {
    $('.watch-later-bttn').hide()
  }

  componentWillReceiveProps(props, nextProps) {
    $('.watch-later-bttn')
    setTimeout(function() {
        $(".watch-later-bttn").fadeOut(1500);
    }, 3000);
  }

  preview(e) {
    let video = e.currentTarget.children[0].children['video']
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
    let video = e.currentTarget.children[0].children['video']
    video.pause()
    this.setState({preview: false, currentTime: 0, playButton: false, showTime: true})
    video.currentTime = 0
  }

  editclosePreview(e) {
    let video = e.children[0]
    video.pause()
    this.setState({preview: false, currentTime: 0, playButton: false, showTime: true, optionsDropDown: false})
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

  formatNumber(num) {
    num = Math.abs(num);
    let formattedNumber;
    if (num >= 1000000000) {
        formattedNumber = (num / 1000000000).toFixed(0).replace(/\.0$/, '') + 'G';
    } else if (num >= 1000000) {
        formattedNumber =  (num / 1000000).toFixed(0).replace(/\.0$/, '') + 'M';
    } else  if (num >= 1000) {
        formattedNumber =  (num / 1000).toFixed(0).replace(/\.0$/, '') + 'K';
    } else {
        formattedNumber = num;
    }
    return formattedNumber;
  }

  toggleOptions(e, video) {
    e.preventDefault()
    this.setState({ optionsDropDown: true, targetVid: video }, () => {
    document.getElementById('body-body').addEventListener('click', this.closeToggleOptions);
    });
  }

  closeToggleOptions(e) {
    e.preventDefault()
    if(e.target.id === "edit-vid") {
      this.editVideo(e, video)
    } else if (e.target.id === "delete-vid") {
      this.deleteVideo(e, video)
    } else if (e.target.id === "watch-later") {
      this.watchLater(e, video)
    } else {
      this.setState({ optionsDropDown: false, targetVid: "" }, () => {
        document.getElementById('body-body').removeEventListener('click', this.closeToggleOptions);
      });
    }
  }

  editVideo(e, video) {
    let vid = e.target.parentElement.parentElement.parentElement.getElementsByClassName("video-thumb")[0];
    let id = this.state.targetVid
    this.editclosePreview(vid)
    this.props.openVidModal('edit', id)
    this.setState({targetVid: ""})
  }

  deleteVideo(e, video) {
    let vid = e.target.parentElement.parentElement.parentElement.getElementsByClassName("video-thumb")[0];
    let id = this.state.targetVid
    this.editclosePreview(vid)
    this.props.openVidModal('delete', id).then(
      this.setState({targetVid: "", optionsDropDown: false})
    )
  }

  watchLater(e,video) {
    let vid = e.target.parentElement.parentElement.parentElement.getElementsByClassName("video-thumb")[0];
    let id = this.state.targetVid || video
    let {users, currentUserID} = this.props;
    if(users[currentUserID].watchLaterIds.includes(id.id)) {
      this.props.deleteWatch(id.id)
      this.props.watchLaterButton("Removed From")
      $('.watch-later-bttn').show();
    } else {
      this.props.createWatch(id.id)
      this.props.watchLaterButton("Added To")
      $('.watch-later-bttn').show();
    }
  }

  hide() {
    if(this.props.currentUserID) {
      this.setState({ optionsDropDown: false, targetVid: "" }, () => {
        document.removeEventListener('click', this.closeToggleOptions);
      });
    } else {
      this.setState({ optionsDropDown: false, targetVid: "" }, () => {
        document.removeEventListener('click', this.closeToggleOptions);
      });
      this.props.history.push('/signin')
    }

  }

  clockWatch(e,video) {
    e.preventDefault()
    this.setState({targetVid: video})
    this.watchLater(e,video)
  }


  render() {
    let { video, idx, author, timeAgo, currentUserID, users, nightMode} = this.props;
    let date = new Date(timeAgo);
    let toggleDD;
    if(this.state.optionsDropDown) {
      let toggleOptionsClass;
      if(video.author_id === currentUserID) {
        if(nightMode) {
          toggleOptionsClass = "toggle-dd-li-night"
        } else {
          toggleOptionsClass = "toggle-dd-li"
        }
      } else {
        toggleOptionsClass = "hidden"
      }
      toggleDD = <div className={nightMode ? "toggleOptionsDD-night" : "toggleOptionsDD"} id="toggleDD">
        <span onClick={this.editVideo} id = "edit-vid" className={video.author_id === currentUserID ? "" : "hidden"}>Edit</span>
        <span onClick={this.deleteVideo} id = "delete-vid" className={video.author_id === currentUserID ? "" : "hidden"}>Delete</span>
        <span onClick={this.hide}id="watch-later">Watch Later</span>
      </div>
    }
    return(
      <li>
        <Link to={`/video/${video.id}`}>
          <div onMouseEnter={this.preview}
          onMouseLeave={this.closePreview}>
          <div className="video-thumb" id={"video-" + idx}>
            <video
              onTimeUpdate={this.tick}
              onLoadedMetadata={this.getDuration}
              className={idx}
              id='video'
              src={video.video_url}
              width="250"
              height="150"
              />
            <nav className={this.state.showTime ? "video-duration" : "no-video-duration"}>{this.state.videoLength}</nav>
            <nav className={this.state.playButton ? "play-button" : "no-play-button"}><i className="fas fa-play"></i></nav>
            <nav onClick={(e) => this.clockWatch(e,video)} className={currentUserID && this.state.preview && !users[currentUserID].watchLaterIds.includes(video.id) ? "clock" : "no-clock"}><i className="far fa-clock"></i></nav>
            <nav onClick={(e) => this.clockWatch(e,video)} className={currentUserID && this.state.preview &&  users[currentUserID].watchLaterIds.includes(video.id) ? "check" : "no-clock"}><i className="fas fa-check"></i></nav>
          </div>

          <div className="video-index-title">
            <p className={nightMode ? "video-index-title-p-night" : "video-index-title-p"}>{video.title}</p>
            <span onClick={(e) => this.toggleOptions(e, video)} className={this.state.preview ? "video-index-options-dd" : "video-index-options-dd-hidden"}>
              <i className="fas fa-ellipsis-v"></i>
            </span>
            {toggleDD}
          </div>
          <nav className="video-author-views">
            <Link to={`/channel/${video.author_id}`}><span className="video-index-author">{author}</span></Link>

            <div>
              <span>{this.formatNumber(video.view_count)} views</span>

              <span className="dot-seperator">
                <i className="fas fa-circle"></i>
              </span>

              <span>
                <TimeAgo date={date} minPeriod='60' />
              </span>

            </div>
          </nav>
        </div>
        </Link>
      </li>
    )

  }

};

export default withRouter(VideoIndexItem);
