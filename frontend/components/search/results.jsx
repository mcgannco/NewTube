import React from 'react';
import { Link } from 'react-router-dom';
import UserResultItem from './user_result_item';
import VideoResultItem from './video_result_item';

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
      if(element.username) {
        attribute = element.username;
      } else {
        attribute = element.title;
      }
      rankings[attribute] = this.similarity(this.props.query.toLowerCase(), attribute.slice(0, this.props.query.length).toLowerCase())
    }
    let keysSorted = Object.keys(rankings).sort(function(a,b){return rankings[a]-rankings[b]})
    let new_arr = [];
    for (let i = 0; i < keysSorted.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (arr[j].username === keysSorted[i] || arr[j].title === keysSorted[i]) {
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
    let {user_arr, video_arr, users, videos, currentUser, createSub, deleteSub } = this.props
    let users_searched = [];
      for (let i = 0; i < user_arr.length; i++) {
        users_searched.push(users[user_arr[i]])
      }
    let videos_searched = [];
      for (let i = 0; i < video_arr.length; i++) {
        videos_searched.push(videos[video_arr[i]])
      }
    let all_searched_results = videos_searched.concat(users_searched);

    let search_result_list;
    let search_result_length;
    if(all_searched_results && all_searched_results.length > 0) {
      search_result_list = <ul className={this.props.query !== "" ? "" : "hidden"}>
        { this.props.query ? this.rankSearch(all_searched_results).map((el,idx) =>
          <li>
            {el.username ? <UserResultItem key={idx} currentUser={currentUser} createSub={createSub} deleteSub={deleteSub} timeAgo={el.timestamp} users={users} user={el}>{el.username}</UserResultItem> :
            <VideoResultItem key={idx} currentUser={currentUser} timeAgo={el.timestamp} video={el}>{el.title}</VideoResultItem>
            }
        </li>) : ""}
      </ul>
      search_result_length = all_searched_results.length
    }

    return(
      <div className="results-container" id="body">
        <h1 className={search_result_length > 0 ? "results-num" : "hidden"}>{search_result_length > 0 ? `About ${this.formatNum(search_result_length)} results` : "" }</h1>
        {search_result_list}
      </div>
    )
  }
}


export default Results;
