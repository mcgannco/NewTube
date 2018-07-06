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
    return(
      <div className="user-drop-down-container">
        <ul className="user-drop-down">
          <Link to={`/channel/${currentUser.id}`}>
            <li className="drop-down-list-item">
              <div>
                <span>
                  <i className="fas fa-play"></i>
                </span>
                <div>{currentUser.username}</div>
              </div>
            </li>
          </Link>

          <div onClick={this.logoutUser}>
            <li className="drop-down-list-item">
              <div>
                <span>
                  <i className="fas fa-podcast"></i>
                </span>
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
