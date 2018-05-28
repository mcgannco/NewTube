import React from 'react';

const Search = () => {
  return(
    <div className="search-container">
      <input className="search" type="text" placeholder="Search"></input>
      <button><i className="fas fa-search"></i></button>
    </div>
  )
};

export default Search;