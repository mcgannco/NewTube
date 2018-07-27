import React from 'react';
import { Link } from 'react-router-dom';
import VideoResultItem from '../search/video_result_item';

class AppShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
    this.props.clearAllVideos()
  }

  componentDidMount() {
    this.props.fetchTag(this.props.match.params.id)
    $('.watch-later-bttn').hide()
    $('#app').animate({ scrollTop: top }, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id != nextProps.match.params.id) {
      this.props.clearAllVideos()
      this.props.fetchTag(nextProps.match.params.id)
    }
    $('.watch-later-bttn')
    setTimeout(function() {
        $(".watch-later-bttn").fadeOut(1500);
    }, 3000);
  }

  render() {
    let {users, videos, currentUser, openVidModal, createWatch, deleteWatch, videoHash,
    watchLaterButton, trendingVideoIds, tag } = this.props;
    let video_list;
    let banner;
    if(tag) {
      if(tag.name === "Nature") {
        banner = "nature-banner";
      } else if (tag.name === "Music") {
        banner = "music-banner";
      } else if (tag.name === "Sports") {
        banner = "sports-banner";
      } else if (tag.name === "Movies") {
        banner = "movies-banner";
      } else if (tag.name === "TV") {
        banner = "tv-banner";
      } else {
        banner = "app-show-banner";
      }
    }
    if(videos.length > 0) {
      video_list = <ul>
                {videos.map((video,idx) => <li>
                  <VideoResultItem
                  key={idx} openVidModal={openVidModal} createWatch={createWatch} deleteWatch={deleteWatch}
                  watchLaterButton={watchLaterButton} currentUser={currentUser} users={users}
                  timeAgo={video.timestamp} video={video}>}</VideoResultItem></li>)}
              </ul>
    }
      return(
        <div className="results-container" id="body">
          <div className={banner}>
            <section className={tag && tag.name === "Nature" ? "tag-icon-nav-bar" : "hidden"}>
              <i className="fas fa-leaf"></i>
            </section>

            <section className={tag && tag.name === "Music" ? "tag-icon-nav-bar" : "hidden"}>
              <i className="fas fa-music"></i>
            </section>

            <section className={tag && tag.name === "Movies" ? "tag-icon-nav-bar" : "hidden"}>
              <i className="fas fa-film"></i>
            </section>

            <section className={tag && tag.name === "TV" ? "tag-icon-nav-bar" : "hidden"}>
              <i className="fas fa-tv"></i>
            </section>

            <section className={tag && tag.name === "Sports" ? "tag-icon-nav-bar" : "hidden"}>
              <i className="fas fa-football-ball"></i>
            </section>
            <h1>{tag ? tag.name : ""}</h1>
          </div>
          {video_list}
          <button
            id="watch-later-bttn-toggle"
            className={this.props.button ? "watch-later-bttn" : "hidden"}>{this.props.button} Watchlist
          </button>
        </div>
      )
    }
  }


export default AppShow;
