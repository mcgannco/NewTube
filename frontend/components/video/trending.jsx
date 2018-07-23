import React from 'react';
import { Link } from 'react-router-dom';
import VideoResultItem from '../search/video_result_item';

class Trending extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
    this.props.requestAllVideos().then(this.props.requestAllUsers())
  }

  componentDidMount() {
    this.props.requestTrendingVideos()
    $('.watch-later-bttn').hide()
  }

  componentWillReceiveProps(nextProps) {
    $('.watch-later-bttn')
    setTimeout(function() {
        $(".watch-later-bttn").fadeOut(1500);
    }, 3000);
  }

  render() {
    let {users, videos, currentUser, openVidModal, createWatch, deleteWatch, videoHash,
    watchLaterButton, trendingVideoIds } = this.props;
    let search_result_list = <div>No Trending Videos</div>;
    if(trendingVideoIds && trendingVideoIds.length > 0) {
      let trendingVideos = [];
      for (var i = 0; i < videos.length; i++) {
        if (trendingVideoIds.includes(videos[i].id)) {
          trendingVideos.push(videos[i])
        }

        if(trendingVideos.length  === trendingVideoIds.length) {
          trendingVideos.sort(function(a, b) {
            return trendingVideoIds.indexOf(a.id) - trendingVideoIds.indexOf(b.id);
          });
        }
      }

      search_result_list = <ul>
                {trendingVideos.map((video,idx) => <li>
                  <VideoResultItem
                  key={idx} openVidModal={openVidModal} createWatch={createWatch} deleteWatch={deleteWatch}
                  watchLaterButton={watchLaterButton} currentUser={currentUser} users={users}
                  timeAgo={video.timestamp} video={video}>}</VideoResultItem></li>)}
              </ul>

        }
    return(
      <div className="results-container" id="body">
        {search_result_list}
        <button
          id="watch-later-bttn-toggle"
          className={this.props.button ? "watch-later-bttn" : "watch-later-bttn"}>{this.props.button} Watchlist
        </button>
      </div>

    )
  }
}


export default Trending;
