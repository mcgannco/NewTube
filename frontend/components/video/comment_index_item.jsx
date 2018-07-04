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
    let { comment } = this.props;
    return(
      <li>
        {comment.body}
      </li>
    )

  }

};

export default CommentIndexItem;
