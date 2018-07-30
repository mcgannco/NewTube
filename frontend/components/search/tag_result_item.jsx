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
    let { tag, nightMode } = this.props;
    let icon;
    let bcolor;
    if(tag) {
      if(tag.name === "Nature") {
        bcolor = "nature"
      } else if (tag.name === "Music") {
        bcolor = "music"
      } else if (tag.name === "Sports") {
        bcolor = "sports"
      } else if (tag.name === "Movies") {
        bcolor = "movie"
      } else if (tag.name === "TV") {
        bcolor = "tv"
      } else {
        bcolor = "default-app"
      }
    }
    return(
        <Link to={`/apps/${tag.id}`}>
          <div className="tag-result-container">
            <div className="tag-result-icon-icon">

              <span className={tag.name === "Nature" ? bcolor : "hidden"}>
                  <i className="fas fa-leaf"></i>
              </span>

              <span className={tag.name === "Movies" ? bcolor : "hidden"}>
                  <i className="fas fa-film"></i>
              </span>

              <span className={tag.name === "Music" ? bcolor : "hidden"}>
                  <i className="fas fa-music"></i>
              </span>

              <span className={tag.name === "Sports" ? bcolor : "hidden"}>
                  <i className="fas fa-football-ball"></i>
              </span>

              <span className={tag.name === "TV" ? bcolor : "hidden"}>
                  <i className="fas fa-tv"></i>
              </span>

              <span className={(tag.name != "TV" && tag.name != "Sports" && tag.name != "Music" && tag.name != "Movies" && tag.name != "Nature") ? bcolor : "hidden"}>
                <i className="fas fa-tags"></i>
              </span>

            </div>

            <div className="user-result-info-containter">
              <div className={nightMode ? "user-result-name-night" : "user-result-name"}>#{tag.name}</div>
              </div>
            </div>
        </Link>
    )

  }

};

export default withRouter(TagResultItem);
