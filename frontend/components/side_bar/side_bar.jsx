import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Redirect, withRouter } from 'react-router-dom';

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.handleRedirect = this.handleRedirect.bind(this)
  }

  componentDidMount() {
    this.props.requestSubscriptions()
  }

  handleRedirect(arg) {
    if(!this.props.currentUser) {
      this.props.closeModal()
      this.props.history.push('/signin')
    } else if(arg === 'subscription') {
        this.props.sideBarLink('subscription')
        this.props.closeModal();
        this.props.history.push(`/channel/${this.props.currentUser}`)
    } else if(arg === 'watchlater') {
        this.props.sideBarLink('watchlater')
        this.props.closeModal();
        this.props.history.push(`/channel/${this.props.currentUser}`)
    } else if(arg === 'likedvids') {
        this.props.sideBarLink('likedvids')
        this.props.closeModal();
        this.props.history.push(`/channel/${this.props.currentUser}`)
    } else if(arg === 'uploads') {
        this.props.sideBarLink('uploads')
        this.props.closeModal();
        this.props.history.push(`/channel/${this.props.currentUser}`)
    }
  }

  render() {
    let { status, closeModal, currentUser, users, currentUserId } = this.props;

    let length;
    if(currentUser.id) {
      length = currentUser.subscriberIds.length
    }

  return(
    <div className ="side-bar">
          <span onClick={closeModal}>
            <nav><i className="fa fa-bars"></i></nav>

              <div className="side-bar-logo">
                <Link to="/"><img id="nav-bar-logo" src={window.logo}></img></Link>
                <p>NewTube</p>
              </div>

          </span>

          <div className="side-bar-section-one">

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

            <nav className="side-bar-section-header">
              LIBRARY
            </nav>

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

            <nav className={currentUser ? "side-bar-section-header" : "hidden"}>
              SUBSCRIPTIONS
            </nav>

            <section className={length && length > 0 ? "hidden" : "side-bar-no-subs"} onClick={closeModal}>
              <nav><i className="fas fa-users"></i></nav>
              <p>No Subscriptions</p>
            </section>

            <nav className="side-bar-section-header">
              MORE FROM NEWTUBE
            </nav>

            <div
              onClick={() => this.handleRedirect('likedvids')}>
              <nav><i className="fas fa-trophy"></i></nav>
              <p>Most Viewed</p>
            </div>

            <div
              onClick={() => this.handleRedirect('likedvids')}>
              <nav><i className="fas fa-thumbs-up"></i></nav>
              <p>Most Liked</p>
            </div>

            <div
              onClick={() => this.handleRedirect('likedvids')}>
              <nav><i className="fas fa-calendar-alt"></i></nav>
              <p>Oldest</p>
            </div>

            <div
              onClick={() => this.handleRedirect('likedvids')}>
              <nav><i className="far fa-plus-square"></i></nav>
              <p>Recently Added</p>
            </div>

          </div>
        </div>
    )
  }
};

export default withRouter(SideBar);
