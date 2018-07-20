import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchStr: ""
    };
    this.search = this.search.bind(this);
    this.querySearch = this.querySearch.bind(this);
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
    this.props.fetchSearch(this.state.searchStr)
  }

  render() {
    return(
      <div className="search-container">
        <input onChange={this.search} className="search" type="text" value={this.state.searchStr} placeholder="Search"></input>
        <button onClick={this.querySearch}>
          <i className="fas fa-search"></i>
          <nav className="searchtiptext">Search</nav>
        </button>
      </div>
    )
  }
};

export default Search;
