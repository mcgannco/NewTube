import React from 'react';
import { Link } from 'react-router-dom';
import VideoResultItem from '../../search/video_result_item';
import isEmpty from 'lodash/isEmpty'

class History extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.sortVideos = this.sortVideos.bind(this);
  }

  componentDidMount() {
    this.props.requestAllVideos().then(this.props.requestAllUsers())
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
      let nextItem = ((left[0].likes) > (right[0].likes)) ? left.shift() : right.shift();
      merged.push(nextItem);
    }
    return merged.concat(left, right);
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
