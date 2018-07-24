import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';
import { Route, Redirect, withRouter } from 'react-router-dom';

class SubsIndexItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.redirect = this.redirect.bind(this);
  }

  redirect(e, id) {
    e.preventDefault()
    this.props.closeModal()
    this.props.history.push(`/channel/${id}`)
  }

  render() {
    let { user } = this.props;
    let userAvatar;
    if(user.profile_img_url) {
      userAvatar = user.profile_img_url;
    }

    return(
      <li onClick={(e) => this.redirect(e, user.id)}>
      <section className="user-sidebar-subs-container">
        <section className="user-sidebar-icon-container">
          <section className="user-sidebar-icon"
            style={
              {backgroundImage: `url(${userAvatar})`}
             }>
             {userAvatar  !== "/avatars/original/missing.png" ? "" : user.username[0]}
          </section>
        </section>

        <section className="user-sidebar-username">{user.username}</section>
      </section>
  </li>
    )

  }

};

export default withRouter(SubsIndexItem);
