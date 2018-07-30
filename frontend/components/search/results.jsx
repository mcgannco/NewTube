import React from 'react';
import { Link } from 'react-router-dom';
import UserResultItem from './user_result_item';
import VideoResultItem from './video_result_item';
import TagResultItem from './tag_result_item';

class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.rankSearch = this.rankSearch.bind(this);
    this.similarity = this.similarity.bind(this);
    this.formatNum = this.formatNum.bind(this)

  }

  componentDidMount() {
    this.props.requestAllVideos().then(this.props.requestAllUsers()).then(
      this.props.fetchResultSearch(this.props.query)
    )
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
    this.props.clearResultSearchTerm()
  }

  rankSearch(arr) {
    let rankings = {};
    let element;
    let attribute;
    for (let i = 0; i < arr.length; i++) {
      element = arr[i]
      if(element && element.username) {
        attribute = element.username;
      } else if(element && element.title) {
        attribute = element.title;
      } else if (element && element.name) {
        attribute = element.name
      } else if (!element) {
        continue;
      }
      if(element) {
        rankings[attribute] = this.similarity(this.props.query.toLowerCase(), attribute.slice(0, this.props.query.length).toLowerCase())
      }
    }

    let keysSorted = Object.keys(rankings).sort(function(a,b){return rankings[a]-rankings[b]})
    let new_arr = [];
    for (let i = 0; i < keysSorted.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if ((arr[j] && arr[j].username === keysSorted[i]) || (arr[j] && arr[j].title === keysSorted[i]) || (arr[j] && arr[j].name === keysSorted[i])) {
          new_arr.push(arr[j])
        }
      }
    }
    return new_arr
  }

  similarity(a, b) {
    if(a.length == 0) return b.length;
    if(b.length == 0) return a.length;

    var matrix = [];

    var i;
    for(i = 0; i <= b.length; i++){
      matrix[i] = [i];
    }

    var j;
    for(j = 0; j <= a.length; j++){
      matrix[0][j] = j;
    }

    for(i = 1; i <= b.length; i++){
      for(j = 1; j <= a.length; j++){
        if(b.charAt(i-1) == a.charAt(j-1)){
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] = Math.min(matrix[i-1][j-1] + 1,
                                  Math.min(matrix[i][j-1] + 1,
                                           matrix[i-1][j] + 1));
        }
      }
    }

    return matrix[b.length][a.length];

  }

  formatNum(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    let {user_arr, openVidModal, video_arr, users, videos, currentUser,
      createSub, deleteSub, createWatch, deleteWatch, watchLaterButton,
      tags, searchErrors, query, nightMode } = this.props
    let users_searched = [];
      for (let i = 0; i < user_arr.length; i++) {
        users_searched.push(users[user_arr[i]])
      }
    let videos_searched = [];
      for (let i = 0; i < video_arr.length; i++) {
        videos_searched.push(videos[video_arr[i]])
      }
    let all_searched_results = videos_searched.concat(users_searched).concat(tags);

    let search_result_list;
    let search_result_length;
    if(all_searched_results && all_searched_results.length > 0) {
      search_result_list = <ul className={this.props.query !== "" ? "" : "hidden"}>

      {this.props.query ? this.rankSearch(all_searched_results).map((el,idx) => {
          if(el.username){
              return <li><UserResultItem key={idx} nightMode={nightMode} currentUser={currentUser} createSub={createSub} deleteSub={deleteSub} timeAgo={el.timestamp} users={users} user={el}>{el.username}</UserResultItem></li>
          } else if (el.title) {
            return <li><VideoResultItem key={idx} nightMode={nightMode} openVidModal={openVidModal} createWatch={createWatch} deleteWatch={deleteWatch} watchLaterButton={watchLaterButton} currentUser={currentUser} users={users} timeAgo={el.timestamp} video={el}>{el.title}</VideoResultItem></li>
          } else if (el.name) {
            return <li><TagResultItem key={idx} nightMode={nightMode} tag={el}>{el.name}</TagResultItem></li>
          } else {
            return ""
          }
        }
      ) : ""
    }
      </ul>
      search_result_length = all_searched_results.length
    }

    let aboutNum;
    if(this.props.query === "") {
      aboutNum = "hidden";
    } else if(search_result_length > 0) {
      if(nightMode) {
        aboutNum = "results-num-night";
      } else {
        aboutNum = "results-num";
      }
    } else {
      aboutNum = "hidden";
    }

    return(
      <div className="results-container" id="body">
        <h1 className={aboutNum}>{search_result_length > 0 ? `About ${this.formatNum(search_result_length)} results` : "" }</h1>
        {search_result_list}
        <button
          id="watch-later-bttn-toggle"
          className={this.props.button ? "watch-later-bttn" : "watch-later-bttn"}>{this.props.button} Watchlist
        </button>
      </div>
    )
  }
}


export default Results;
