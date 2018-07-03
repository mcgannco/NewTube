import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';

class RelatedVideoIndexItem extends React.Component {
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

  render() {
    let { video, idx, author, timeAgo} = this.props;
    let date = new Date(timeAgo);
    return(
      <li>
        <Link to={`/video/${video.id}`}>
          <div className="related-video-container" onMouseEnter={this.preview}
            onMouseLeave={this.closePreview}>
          <div className="related-video-thumb" id={"video-" + idx}>
            <video
              onTimeUpdate={this.tick}
              onLoadedMetadata={this.getDuration}
              className={idx}
              id='video'
              src={video.video_url}
              width="150"
              height="120"
              />
          </div>

          <div className="related-video-info">
            <div className="related-video-index-title">
                       <p>{video.title}</p>
                       <span className={this.state.preview ? "related-video-index-options-dd" : "related-video-index-options-dd-hidden"}>
                         <i className="fas fa-ellipsis-v"></i>
                       </span>
                     </div>
                     <nav className="video-author-views">
                       <span className="related-video-index-author">{author}</span>
                       <div>
                         <span>100K views</span>
                       </div>
                     </nav>

          </div>

        </div>
        </Link>
      </li>
    )

  }

};

export default RelatedVideoIndexItem;
