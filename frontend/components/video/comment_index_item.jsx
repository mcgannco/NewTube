import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    let { comment, user } = this.props;
    let date = new Date(comment.timestamp);
    return(
      <li>
        <div className="comment-content-container">
          <div className="comment-icon">
            <span>
              {user.username.slice(0,1)}
            </span>
          </div>

          <nav>
            <div className="comment-body">
              <p>{user.username}</p>
                <span>
                  <TimeAgo date={date} minPeriod='60' />
                </span>
            </div>
            <p>{comment.body}</p>
          </nav>

        </div>
      </li>
    )

  }

};

export default CommentIndexItem;
