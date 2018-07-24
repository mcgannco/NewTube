import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Redirect, withRouter } from 'react-router-dom';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchStr: "",
      searchList: false
    };
    this.search = this.search.bind(this);
    this.querySearch = this.querySearch.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
    this.sendSearch = this.sendSearch.bind(this);
    this.rankSearch = this.rankSearch.bind(this);
    this.similarity = this.similarity.bind(this);
  }

  search(e) {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }

    this.setState({searchStr: e.currentTarget.value}, () =>  {
      this.timeOut = setTimeout(this.querySearch, 300);
    });
  }

  querySearch(e) {
    this.props.fetchSearch(this.state.searchStr).then(
      this.setState({ searchList: true }, () => {
      document.addEventListener('click', this.closeSearch)
    })
  )}

  closeSearch(e) {
    e.preventDefault();
    this.setState({ searchList: false }, () => {
      document.removeEventListener('click', this.closeSearch);
    });
  }

  sendSearch(e) {
    e.preventDefault();
    this.props.fetchResultSearch(this.props.searchedTerm)
    this.props.history.push("/results");
  }

  rankSearch(arr) {
    let rankings = {};
    let element;
    let attribute;
    for (let i = 0; i < arr.length; i++) {
      element = arr[i]
      if(!element) {
        continue;
      }
      if(element.username) {
        attribute = element.username;
      } else {
        attribute = element.title;
      }
      rankings[attribute] = this.similarity(this.state.searchStr.toLowerCase(), attribute.slice(0, this.state.searchStr.length).toLowerCase())
    }
    let keysSorted = Object.keys(rankings).sort(function(a,b){return rankings[a]-rankings[b]})
    let new_arr = [];
    for (let i = 0; i < keysSorted.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if(!arr[j]) {
          continue;
        }
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

  render() {
    let {user_arr, video_arr, users, videos } = this.props
    let users_searched = [];
      for (let i = 0; i < user_arr.length; i++) {
        users_searched.push(users[user_arr[i]])
      }
    let videos_searched = [];
      for (let i = 0; i < video_arr.length; i++) {
        videos_searched.push(videos[video_arr[i]])
      }
    let all_searched_results = videos_searched.concat(users_searched);

    let search_result_list
    let sliceNum;
    if(all_searched_results.length > 10) {
      sliceNum = 10;
    } else {
      sliceNum = all_searched_results.length
    }
    if(all_searched_results && all_searched_results.length > 0) {
      search_result_list = <ul className={this.state.searchList && this.state.searchStr !== "" ? "" : "hidden"}>
        { this.rankSearch(all_searched_results).slice(0,10).map((el,idx) => <Link to={el.username ? `/channel/${el.id}` : `/video/${el.id}`}><li key={idx}>{el.username ? el.username : el.title}</li></Link>)}
      </ul>
    }
    return(
      <div className="search-container">
        <input onChange={this.search} className="search" type="text" value={this.state.searchStr} placeholder="Search"></input>
        <button onClick={this.sendSearch}>
          <i className="fas fa-search"></i>
          <nav className="searchtiptext">Search</nav>
        </button>

        <div className="search-results">
          {search_result_list}
        </div>

      </div>
    )
  }
};

export default withRouter(Search);
