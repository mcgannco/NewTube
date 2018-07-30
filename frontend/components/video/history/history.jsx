import React from 'react';
import { Link } from 'react-router-dom';
import VideoResultItem from '../../search/video_result_item';
import isEmpty from 'lodash/isEmpty'

class History extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.trackScrolling = this.trackScrolling.bind(this);
    this.isBottom = this.isBottom.bind(this);
  }

  componentWillMount() {
    this.props.clearAllVideos()
  }

  componentDidMount() {
    document.getElementById('app').addEventListener('scroll', this.trackScrolling);
    if(this.props.currentUser) {
      this.props.requestSingleUser(this.props.currentUser).then(
        this.props.fetchHistory(1)
      )
    }
    $('.watch-later-bttn').hide()
    $('body').animate({ scrollTop: top }, 0);
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.button && !nextProps.button) {

    } else if (nextProps.button) {
      $('.watch-later-bttn')
      setTimeout(function() {
          $(".watch-later-bttn").fadeOut(1500);
      }, 3000);
    } else {
      $('.watch-later-bttn').hide()
    }
  }

  componentWillUnmount() {
    document.getElementById('app').removeEventListener('scroll', this.trackScrolling);
    this.props.resetHistory();
  }

  isBottom(el) {
  return el.getBoundingClientRect().bottom <= window.innerHeight;
}

  trackScrolling() {
    const wrappedElement = document.getElementsByClassName('results-container')[0];
    if (this.isBottom(wrappedElement)) {
      if(this.props.historyIds.length < this.props.historyLength) {
        if(!this.props.subVideoLoader) {
          this.props.startSubVideoLoader()
          this.props.fetchHistory(this.props.historyIds.length)
        }
      } else {
        this.props.clearSubVideoLoader()
      }
    }
  };

  render() {
    let {users, videos, currentUser, openVidModal, createWatch,
      deleteWatch, videoHash,
    watchLaterButton, historyIds, nightMode } = this.props;
    let search_result_list;

    if(historyIds && historyIds.length > 0) {
      let historyVideos = [];
      for (var i = 0; i < historyIds.length; i++) {
        if (videos.includes(videoHash[historyIds[i]])) {
          historyVideos.push(videoHash[historyIds[i]])
        }
      }
      search_result_list = <ul>
                {historyVideos.map((video,idx) => <li>
                  <VideoResultItem
                  key={idx} openVidModal={openVidModal} nightMode={nightMode} createWatch={createWatch} deleteWatch={deleteWatch}
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
            <div className="loaderContainer">
              <div className={this.props.subVideoLoader ? "lds-ring" : "hidden"}><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
      )
    }
  }


export default History;
