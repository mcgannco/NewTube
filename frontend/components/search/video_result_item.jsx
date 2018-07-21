import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';

class VideoResultItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    let { video, timeAgo} = this.props;
    let date = new Date(timeAgo);
    return(
      <li>
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
              <span>{video.title}</span>

                <div>
                  <span>{video.view_count} views</span>

                  <span className="dot-seperator">
                    <i className="fas fa-circle"></i>
                  </span>

                  <span>
                    <TimeAgo date={date} minPeriod='60' />
                  </span>
                </div>

              </div>
          </div>
        </div>
      </li>
    )

  }

};

export default VideoResultItem;
