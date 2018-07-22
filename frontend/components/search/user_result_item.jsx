import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';
import { Route, Redirect, withRouter } from 'react-router-dom';

class UserResultItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.formatNumber = this.formatNumber.bind(this)
    this.toggleSubscribe = this.toggleSubscribe.bind(this)
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

  toggleSubscribe(e) {
    e.preventDefault()
    const { currentUser, user, users, createSub, deleteSub } = this.props;
    if (!user) {
      return;
    }
    let subscribee_id = user.id
    if (!currentUser) {
      this.props.history.push('/signin');
      return;
    }

    if (users[currentUser].subscriberIds.includes(subscribee_id)) {
      deleteSub(subscribee_id);
    } else {
      createSub(subscribee_id);
    }
  }

  render() {
    let { user, timeAgo, currentUser} = this.props;
    let date = new Date(timeAgo);
    let avatar = user.profile_img_url;

    let subscribeClass;
    let subscribeText;

    if(currentUser) {
      if(currentUser === user.id) {
        subscribeClass = "hidden";
      }
      else if(user.subscribeeIds.includes(currentUser)) {
        subscribeClass = "nav-subscribed";
        subscribeText = "SUBSCRIBED"
      } else {
        subscribeClass = "nav-subscribe";
        subscribeText = "SUBSCRIBE"
      }
    } else {
      subscribeClass = "nav-subscribe";
      subscribeText = "SUBSCRIBE"
    }

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
            <div className="user-result-left">

            <div className="user-result-name">{user.username}</div>
              <div className="user-result-containter-name">
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

            <div className="user-result-right">
              <button onClick={this.toggleSubscribe}className={subscribeClass}>{subscribeText} {this.formatNumber(user.subscribeeIds.length)}</button>
            </div>

          </div>

        </div>
        </Link>
      </li>
    )

  }

};

export default withRouter(UserResultItem);
