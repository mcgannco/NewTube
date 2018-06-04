import React from 'react';

const SideBar = ({closeModal}) => {
  return(
    <div className="side-bar">
          <span onClick={closeModal}>
            <i className="fa fa-bars"></i>
            <span>Home</span>
          </span>
          <span>Trending</span>

    </div>
  )
};

export default SideBar;
