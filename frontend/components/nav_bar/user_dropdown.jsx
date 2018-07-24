import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Redirect, withRouter } from 'react-router-dom';

class UserDropDown extends React.Component {
  constructor(props) {
    super(props)
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser() {
    this.props.logout().then(this.props.history.push('/'))
  }


  render() {

    let {currentUser, logout} = this.props
    let userAvatar = currentUser.profile_img_url
    return(
      <div className="user-drop-down-container">
        <ul className="user-drop-down">
          <Link to={`/channel/${currentUser.id}`}>
            <li className="drop-down-list-item-username">
              <div>
                <div>
                  <section className="drop-down-list-item-username-icon" style={
                    {backgroundImage: `url(${userAvatar})`}
                   }>
                  </section>
                </div>
                <div>{currentUser.username}</div>
              </div>
            </li>
          </Link>


          <Link to={`/channel/${currentUser.id}`}>
            <li className="drop-down-list-item">
              <div>
                <section className="dd-user-section">
                  <i className="fas fa-user"></i>
                </section>
                <div>My Channel</div>
              </div>
            </li>
          </Link>

          <div onClick={this.logoutUser}>
            <li className="drop-down-list-item">
              <div>
                <section className="dd-user-section">
                  <i className="fas fa-sign-out-alt"></i>
                </section>
                <div>Sign out</div>
              </div>
            </li>
          </div>
        </ul>
      </div>
    )
  }
};

export default withRouter(UserDropDown);
