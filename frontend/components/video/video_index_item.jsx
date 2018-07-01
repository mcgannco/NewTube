import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';

class VideoIndexItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videoLength: "",
    }
    this.preview = this.preview.bind(this);
    this.getDuration = this.getDuration.bind(this);
  }

  preview(e) {

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
        <div>
          <div className="video-thumb" id={"video-" + idx}>
            <video
              onMouseEnter={this.preview}
              onLoadedMetadata={this.getDuration}
              className={idx}
              id='video'
              src={video.video_url}
              width="250"
              height="150"
              />
            <nav className="video-duration">{this.state.videoLength}</nav>
          </div>

          <p>{video.title}</p>
          <nav className="video-author-views">
            <span>{author}</span>

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
      </li>
    )

  }

};

export default VideoIndexItem;
