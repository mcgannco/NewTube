import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';

class VideoIndexItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videoLength: "",
      currentTime: 0,
      playButton: false,
      preview: false,
      showTime: true
    }
    this.preview = this.preview.bind(this);
    this.closePreview = this.closePreview.bind(this);
    this.getDuration = this.getDuration.bind(this);
    this.tick = this.tick.bind(this);
  }

  preview(e) {
    let video = e.currentTarget.children["video"];
    this.setState({preview: true, showTime: false})
    video.muted = true;
    video.play()
  }

  closePreview(e) {
    let video = e.currentTarget.children["video"];
    this.setState({preview: false, currentTime: 0, playButton: false, showTime: true})
    video.pause()
    video.currentTime = 0
  }

  resetPreview(e) {
    this.setState({currentTime: 0, playButton: true, showTime: true})
    e.currentTarget.pause()
    e.currentTarget.currentTime = 0
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

  render() {
    let { video, idx, author, timeAgo} = this.props;
    let date = new Date(timeAgo);
    return(
      <li>
        <Link to={`/videos/${video.id}`}><div>
          <div
            onMouseEnter={this.preview}
            onMouseLeave={this.closePreview}
            className="video-thumb" id={"video-" + idx}>
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
          </div>

          <p>{video.title}</p>
          <nav className="video-author-views">
            <Link to='/upload'><span className="video-index-author">{author}</span></Link>

            <div>
              <span>100K views</span>

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

export default VideoIndexItem;
