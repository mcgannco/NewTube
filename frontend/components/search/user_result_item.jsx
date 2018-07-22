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
        <div className="user-result-container">
          <div className="user-result-icon">
            <span style={
              {backgroundImage: `url(${avatar})`}
            }>{user.profile_img_url === "/avatars/original/missing.png" ? user.username.slice(0,1): ""}
          </span>

          </div>

          <div className="user-info-containter">
            <div>{user.username}</div>
            <div>{user.subscribeeIds.length} subscribers</div>
              <span className="result-dot-seperator">
                <i className="fas fa-circle"></i>
              </span>
              <span>
                <span>{user.uploadIds.length} videos</span>
              </span>
          </div>

        </div>
      </li>
    )

  }

};

export default UserResultItem;
