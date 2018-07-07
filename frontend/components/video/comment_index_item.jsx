import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      preview: false
    }
    this.showOptions = this.showOptions.bind(this);
    this.closeshowOptions = this.closeshowOptions.bind(this);
  }

  showOptions() {
    this.setState({preview: true})
  }

  closeshowOptions() {
    this.setState({preview: false})
  }

  render() {
    let { comment, user } = this.props;
    let date = new Date(comment.timestamp);
    let userAvatar = user.profile_img_url;
    return(
      <li
        onMouseEnter={this.showOptions}
        onMouseLeave={this.closeshowOptions}
        >
        <div className="comment-content-container">
          <div className="comment-icon">
            <span style={
              {backgroundImage: `url(${userAvatar})`}
             }>
              {user.profile_img_url ? "" : user.username.slice(0,1)}
            </span>
          </div>

          <nav className="hover-comment-container">
            <div>
              <div className="comment-body">
              <Link to={`/channel/${user.id}`}><p>{user.username}</p></Link>
                <span>
                  <TimeAgo date={date} minPeriod='60' />
                </span>
              </div>
              <p>{comment.body}</p>
            </div>


            <span className={this.state.preview ? "opitions" : "hidden"}>
              <i className="fas fa-ellipsis-v"></i>
            </span>
          </nav>
        </div>
      </li>
    )

  }

};

export default CommentIndexItem;
