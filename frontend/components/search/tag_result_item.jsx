import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';
import { Route, Redirect, withRouter } from 'react-router-dom';

class TagResultItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    let { tag } = this.props;
    return(
        <Link to={`/apps/${tag.id}`}>
          <div className="tag-result-container">
            <div className="missing-user-result-icon">
              <span>
                Tag
              </span>
            </div>

            <div className="user-result-info-containter">
              <div className="user-result-name">{tag.name}</div>
              </div>
            </div>
        </Link>
    )

  }

};

export default withRouter(TagResultItem);
