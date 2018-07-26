import React from 'react';
import { Link } from 'react-router-dom';

const AppDropDown = ({topTags}) => {
let tagsList = topTags["toptags"].map((tag,idx) =>
<Link to='/signin'>
  <li className="drop-down-list-item">
    <div>
      <section className={tag.name === "funny" ? "tag-icon-nav-bar" : "hidden"}>
        <i className="fas fa-leaf"></i>
      </section>

      <section className={tag.name === "music" ? "tag-icon-nav-bar" : "hidden"}>
        <i className="fas fa-music"></i>
      </section>

      <section className={tag.name === "movie" ? "tag-icon-nav-bar" : "hidden"}>
        <i className="fas fa-film"></i>
      </section>

      <section className={tag.name === "#hailGeorge" ? "tag-icon-nav-bar" : "hidden"}>
        <i className="fas fa-tv"></i>
      </section>

      <section className={tag.name === "dog" ? "tag-icon-nav-bar" : "hidden"}>
        <i className="fas fa-football-ball"></i>
      </section>

      <div>{tag.name}</div>
    </div>
    </li>
  </Link>)

  return(
    <div className="app-drop-down-container">
      <ul className="app-drop-down">
        {tagsList}
      </ul>
    </div>
  )
};

export default AppDropDown;
