import React from 'react';
import { Link } from 'react-router-dom';

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
    if(all_searched_results && all_searched_results.length > 0) {
      search_result_list = <ul className={this.state.searchList && this.state.searchStr !== "" ? "" : "hidden"}>
        { all_searched_results.map((el,idx) => <Link to={el.username ? `/channel/${el.id}` : `/video/${el.id}`}><li key={idx}>{el.username ? el.username : el.title}</li></Link>)}
      </ul>
    }
    return(
      <div className="search-container">
        <input onChange={this.search} className="search" type="text" value={this.state.searchStr} placeholder="Search"></input>
        <button onClick={this.querySearch}>
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

export default Search;
