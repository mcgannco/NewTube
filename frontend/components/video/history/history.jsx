import React from 'react';
import { Link } from 'react-router-dom';
import VideoResultItem from '../../search/video_result_item';
import isEmpty from 'lodash/isEmpty'

class History extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
    this.props.clearAllVideos()
  }

  componentDidMount() {
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
      $('.watch-later-bttn').hide()
    } else if (nextProps.button) {
      $('.watch-later-bttn')
      setTimeout(function() {
          $(".watch-later-bttn").fadeOut(1500);
      }, 3000);
    } else {
      $('.watch-later-bttn').hide()
    }
  }

  render() {
    let {users, videos, currentUser, openVidModal, createWatch, deleteWatch, videoHash,
    watchLaterButton, trendingVideoIds } = this.props;

    if(isEmpty(videoHash) || isEmpty(users)) {
      return null;
    }

      return(
        <div className="results-container" id="body">
          <button
            id="watch-later-bttn-toggle"
            className={this.props.button ? "watch-later-bttn" : "hidden"}>{this.props.button} Watchlist
          </button>
        </div>
      )
    }
  }


export default History;
