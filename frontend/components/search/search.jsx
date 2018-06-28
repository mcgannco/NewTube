import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      searchStr: ""
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.search = this.search.bind(this);
    this.querySearch = this.querySearch.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  search(e) {
    this.setState({searchStr: e.currentTarget.value})
  }

  querySearch(e) {

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
