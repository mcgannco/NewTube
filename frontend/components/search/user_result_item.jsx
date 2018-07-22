import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';

class UserResultItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    let { user, timeAgo} = this.props;
    let date = new Date(timeAgo);
    let avatar = user.profile_img_url;

    return(
      <li>
        <Link to={`/channel/${user.id}`}>
        <div className="user-result-container">
          <div className="user-result-icon">
            <span style={
              {backgroundImage: `url(${avatar})`}
            }>{user.profile_img_url === "/avatars/original/missing.png" ? user.username.slice(0,1): ""}
          </span>

          </div>

          <div className="user-result-info-containter">
            <div className="user-result-name">{user.username}</div>
              <div className="user-result-containter">
                <div>{user.subscribeeIds.length} subscribers</div>
                <span className="result-dot-seperator">
                  <i className="fas fa-circle"></i>
                </span>
                <span>
                  <span>{user.uploadIds.length} videos</span>
                </span>
              </div>

              <div className="video-result-description">
                {user.description}
              </div>

          </div>

        </div>
        </Link>
      </li>
    )

  }

};

export default UserResultItem;
