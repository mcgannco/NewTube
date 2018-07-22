import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';

class VideoResultItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      new: false
    }
    this.formatNum = this.formatNum.bind(this)
  }

  formatNum(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    let { video, timeAgo} = this.props;
    let date = new Date(timeAgo);
    let newStatus;
    if(date) {
      let current = new Date();
      let upload = new Date(video.timestamp)
      if((current - upload) / 1000 / 60 / 60 / 24 <= 7) {
        newStatus = "New";
      }
    }
    return(
      <li>
        <Link to={`video/${video.id}`}>
        <div className="video-result-container">
          <div className="video-result-thumb">
            <video
              src={video.video_url}
              width="250"
              height="160"
              />
          </div>

          <div className="video-result-info">
            <div>
              <span className="video-result-title">{video.title}</span>

                <div className="video-result-stats">
                  <span>{this.formatNum(video.view_count)} views</span>
                  <span className="result-dot-seperator">
                    <i className="fas fa-circle"></i>
                  </span>
                  <span>
                    <TimeAgo date={date} minPeriod='60' />
                  </span>
                </div>

                <div className="video-result-description">
                  {video.description}
                </div>

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
      </li>
    )

  }

};

export default VideoResultItem;
