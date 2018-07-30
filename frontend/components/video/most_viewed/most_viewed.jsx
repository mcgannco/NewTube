import React from 'react';
import { Link } from 'react-router-dom';
import VideoResultItem from '../../search/video_result_item';

class MostViews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.sortVideos = this.sortVideos.bind(this);
  }

  componentDidMount() {
    this.props.requestAllVideos().then(this.props.requestAllUsers())
    $('body').animate({ scrollTop: top }, 0);
    $('.watch-later-bttn').hide()
  }

  componentWillReceiveProps(nextProps) {

    $('.watch-later-bttn')
    setTimeout(function() {
        $(".watch-later-bttn").fadeOut(1500);
    }, 3000);
  }

  sortVideos(videos) {
    if (videos.length < 2) {
      return videos;
    } else {
      const middle = Math.floor(videos.length / 2);
      const left = this.sortVideos(videos.slice(0, middle));
      const right = this.sortVideos(videos.slice(middle));
      return this.merge(left, right);
    }
  }

  merge(left, right) {
    const merged = [];
    while (left.length > 0 && right.length > 0) {
      let nextItem = ((left[0].view_count) > (right[0].view_count)) ? left.shift() : right.shift();
      merged.push(nextItem);
    }
    return merged.concat(left, right);
  }


  render() {
    let {users, videos, currentUser, openVidModal, createWatch, deleteWatch, videoHash,
    watchLaterButton, trendingVideoIds, nightMode } = this.props;

    let search_result_list;
    if(videos) {
      search_result_list = <ul>
                {this.sortVideos(videos).slice(0,10).map((video,idx) => <li>
                  <VideoResultItem
                  key={idx} nightMode={nightMode} openVidModal={openVidModal} createWatch={createWatch} deleteWatch={deleteWatch}
                  watchLaterButton={watchLaterButton} currentUser={currentUser} users={users}
                  timeAgo={video.timestamp} video={video}>}</VideoResultItem></li>)}
              </ul>
    }

      return(
        <div className="results-container" id="body">
          {search_result_list}
          <button
            id="watch-later-bttn-toggle"
            className={this.props.button ? "watch-later-bttn" : "hidden"}>{this.props.button} Watchlist
          </button>
        </div>
      )
    }
  }


export default MostViews;
