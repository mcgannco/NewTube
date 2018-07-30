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
    watchLaterButton, trendingVideoIds, tag, nightMode } = this.props;
    let video_list;
    let banner;
    let bcolor;
    if(tag) {
      if(tag.name === "Nature") {
        banner = "nature-banner";
        bcolor = "nature-nature"
      } else if (tag.name === "Music") {
        banner = "music-banner";
        bcolor = "music-music"
      } else if (tag.name === "Sports") {
        banner = "sports-banner";
        bcolor = "sports-sports"
      } else if (tag.name === "Movies") {
        banner = "movies-banner";
        bcolor = "movies-movies"
      } else if (tag.name === "TV") {
        banner = "tv-banner";
        bcolor = "tv-tv"
      } else {
        banner = "app-show-banner";
        bcolor = "default-app-h"
      }
    }
    if(videos.length > 0) {
      let filtered = [];
      for (var i = 0; i < videos.length; i++) {
        if(tag && videos[i].tags !== undefined && videos[i].tags[tag.id]) {
          filtered.push(videos[i])
        }
      }
      video_list = <ul>
                {filtered.map((video,idx) => <li>
                  <VideoResultItem
                  key={idx} nightMode={nightMode} openVidModal={openVidModal} createWatch={createWatch} deleteWatch={deleteWatch}
                  watchLaterButton={watchLaterButton} currentUser={currentUser} users={users}
                  timeAgo={video.timestamp} video={video}>}</VideoResultItem></li>)}
              </ul>
    }
      return(
        <div className="results-container" id="body">
          <div className={banner}>
            <section className={tag && tag.name === "Nature" ? "nature-icon-nav-bar" : "hidden"}>
              <i className="fas fa-leaf"></i>
            </section>

            <section className={tag && tag.name === "Music" ? "music-icon-nav-bar" : "hidden"}>
              <i className="fas fa-music"></i>
            </section>

            <section className={tag && tag.name === "Movies" ? "movies-icon-nav-bar" : "hidden"}>
              <i className="fas fa-film"></i>
            </section>

            <section className={tag && tag.name === "TV" ? "tv-icon-nav-bar" : "hidden"}>
              <i className="fas fa-tv"></i>
            </section>

            <section className={tag && tag.name === "Sports" ? "sports-icon-nav-bar" : "hidden"}>
              <i className="fas fa-football-ball"></i>
            </section>

            <span className={( tag && (tag.name != "TV" && tag.name != "Sports" && tag.name != "Music" && tag.name != "Movies" && tag.name != "Nature")) ? "tags-icon-nav-bar" : "hidden"}>
              <i className="fas fa-tags"></i>
            </span>

            <h1 className={bcolor}>{tag ? tag.name : ""}</h1>
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
