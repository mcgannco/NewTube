import React from 'react';

const SideBar = ({closeModal}) => {
  return(
    <div className="side-bar">
      <ul>
        <li><span onClick={closeModal}><i className="fa fa-bars"></i></span> Home</li>
        <li>Trending</li>

      </ul>
    </div>
  )
};

export default SideBar;
