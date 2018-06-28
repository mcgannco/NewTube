import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,

    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

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

  render() {
    return(
      <div className="search-container">
        <input className="search" type="text" placeholder="Search"></input>
        <button>
          <i className="fas fa-search"></i>
          <nav className="searchtiptext">Search</nav>
        </button>
      </div>
    )
  }
};

export default Search;
