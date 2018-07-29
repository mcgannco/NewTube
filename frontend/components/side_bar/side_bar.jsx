import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Redirect, withRouter } from 'react-router-dom';
import SubsIndexItem from './subs_index_item';

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.handleRedirect = this.handleRedirect.bind(this)
  }

  componentDidMount() {
    this.props.requestSubscriptions()
  }

  handleRedirect(arg) {
    if(!this.props.currentUserId) {
      this.props.closeModal()
      this.props.history.push('/signin')
    } else if(arg === 'subscription') {
        this.props.sideBarLink('subscription')
        this.props.closeModal();
        this.props.history.push(`/channel/${this.props.currentUserId}`)
    } else if(arg === 'watchlater') {
        this.props.sideBarLink('watchlater')
        this.props.closeModal();
        this.props.history.push(`/channel/${this.props.currentUserId}`)
    } else if(arg === 'likedvids') {
        this.props.sideBarLink('likedvids')
        this.props.closeModal();
        this.props.history.push(`/channel/${this.props.currentUserId}`)
    } else if(arg === 'uploads') {
        this.props.sideBarLink('uploads')
        this.props.closeModal();
        this.props.history.push(`/channel/${this.props.currentUserId}`)
    }
  }

  render() {
    let { status, closeModal, currentUser, users, currentUserId, usersArr, nightMode } = this.props;

    let length;
    if(currentUser.id) {
      length = currentUser.subscriberIds.length;
    }


    let subs = [];
    if(currentUserId) {
    for (var i = 0; i < usersArr.length; i++) {
      if(users[currentUserId].subscriberIds.includes(usersArr[i].id)) {
        subs.push(usersArr[i])
      }
      }
    }

    let subsList;
    if(subs.length > 0) {
      let userAvatar;
      subsList =
        <ul>
          {subs.map((user,idx) =>
            <SubsIndexItem key={idx} user={user} nightMode={nightMode} closeModal={closeModal}></SubsIndexItem>
              )}
      </ul>
    }

    let subsClass;
    let historyClass;
    if(currentUser) {
      if(nightMode) {
        subsClass = "side-bar-section-header-night"
        historyClass = "side-bar-no-subs-night"
      } else {
        subsClass = "side-bar-section-header"
        historyClass = "side-bar-no-subs"
      }
    } else {
      subsClass = "hidden"
      historyClass = "hidden"
    }

    let noSubsClass;
    if(length && length > 0) {
      noSubsClass = "hidden"
    } else {
      if(nightMode) {
        noSubsClass = "side-bar-no-subs-night"
      } else {
        noSubsClass = "side-bar-no-subs"
      }
    }

  return(
    <div className ={nightMode ? "side-bar-night" : "side-bar"}>
          <span onClick={closeModal}>
            <nav><i className="fa fa-bars"></i></nav>

              <div className="side-bar-logo">
                <Link to="/"><img id="nav-bar-logo" src={window.logo}></img></Link>
                <p>NewTube</p>
              </div>

          </span>

          <div className={nightMode ? "side-bar-section-one-night" : "side-bar-section-one"}>

            <Link to='/'><div onClick={closeModal}>
              <nav><i className="fas fa-home"></i></nav>
              <p>Home</p>
            </div></Link>

          <Link to='/trending'><div onClick={closeModal}>
              <nav><i className="fas fa-fire"></i></nav>
              <p>Trending</p>
            </div></Link>

            <div
              onClick={() => this.handleRedirect('subscription')}>
              <nav><i className="far fa-folder-open"></i></nav>
              <p>Subscriptions</p>
            </div>

            <nav className={nightMode ? "side-bar-section-header-night" : "side-bar-section-header"}>
              LIBRARY
            </nav>

          <Link to='/my_history'><section onClick={closeModal} className={historyClass}>
              <nav><i className="fas fa-history"></i>
              </nav>
              <p>History</p>
            </section></Link>

            <div
              onClick={() => this.handleRedirect('watchlater')}>
              <nav><i className="far fa-clock"></i>
              </nav>
              <p>Watch Later</p>
            </div>

            <div
              onClick={() => this.handleRedirect('likedvids')}>
              <nav><i className="fas fa-thumbs-up"></i></nav>
              <p>Liked Videos</p>
            </div>

            <div
              onClick={() => this.handleRedirect('uploads')}>
              <nav><i className="fas fa-play"></i></nav>
              <p>Uploads</p>
            </div>

            <nav className={subsClass}>
              SUBSCRIPTIONS
            </nav>

            <section className={noSubsClass} onClick={closeModal}>
              <nav><i className="fas fa-users"></i></nav>
              <p>No Subscriptions</p>
            </section>

            {subsList}

            <nav className={nightMode ? "side-bar-section-header-night" : "side-bar-section-header"}>
              MORE FROM NEWTUBE
            </nav>

            <Link to='/most_viewed'><div
              onClick={closeModal}>
              <nav><i className="fas fa-trophy"></i></nav>
              <p>Most Viewed</p>
            </div></Link>

          <Link to={"/most_liked"}><div onClick={closeModal}>
              <nav><i className="fas fa-thumbs-up"></i></nav>
              <p>Most Liked</p>
            </div>
          </Link>

            <Link to={"/oldest"}><div onClick={closeModal}>
              <nav><i className="fas fa-calendar-alt"></i></nav>
              <p>Oldest</p>
            </div></Link>

          <Link to={"/recently_added"}><div onClick={closeModal}>
              <nav><i className="far fa-plus-square"></i></nav>
              <p>Recently Added</p>
            </div></Link>

          </div>
        </div>
    )
  }
};

export default withRouter(SideBar);
