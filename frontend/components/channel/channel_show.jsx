import React from 'react';
import { Link } from 'react-router-dom';
import VideoIndexItem from '../video/video_index_item';

class ChannelShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      buttons: false,
      cancel: false,
      bannerFile: "",
      bannerURL: "",
      avatarFile: "",
      avatarURL: "",
      selected: "HOME",
      username: "",
      description: ""
    }
    this.editProfile = this.editProfile.bind(this);
    this.showEditButtons = this.showEditButtons.bind(this);
    this.hideButtons = this.hideButtons.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.updateBanner = this.updateBanner.bind(this);
    this.updateAvatar = this.updateAvatar.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
    this.selectToggle = this.selectToggle.bind(this);
    this.handleSubs = this.handleSubs.bind(this);
    this.formatViews = this.formatViews.bind(this);
    this.formatNumber = this.formatNumber.bind(this);
    this.convertDate = this.convertDate.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }

  componentDidMount() {
    debugger
    this.props.requestAllUsers().then(this.props.requestAllVideos()).then(this.props.clearUserErrors())
    $('.watch-later-bttn').hide()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user && (this.props.user.id != nextProps.match.params.id)) {
      this.props.requestSingleUser(nextProps.match.params.id).then(window.scrollTo(0, 0));
    }

    $('.watch-later-bttn')
    setTimeout(function() {
        $(".watch-later-bttn").fadeOut(1500);
    }, 3000);
  }

  componentWillUnmount() {
    this.props.clearUserErrors()
  }

  editProfile() {
    this.props.clearUserErrors().then(
    this.setState({edit: true, cancel: true, buttons: true,
      selected: "ABOUT", username: this.props.user.username,
      description: this.props.user.description}))
  }

  showEditButtons() {
    if(this.state.edit) {
      this.setState({buttons: true})
    }
  }

  hideButtons() {
    this.setState({buttons: false})
  }

  cancelEdit() {
    let {user} = this.props;
    if (user.banner_img_url !== "/banners/original/missing.png")
    this.setState({edit: false, buttons: false, cancel: false,
    bannerFile: "",
    avatarFile: "",
    avatarFile: "",
    bannerURL: "",
    avatarURL: "",
    username: "",
    description: ""
    })
  }

  updateBanner(e) {
    let file = e.currentTarget.files[0];
    this.setState({bannerFile: file})
    let reader  = new FileReader();
    reader.onloadend = function () {
      this.setState({ bannerURL: reader.result });
    }.bind(this);
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  updateAvatar(e) {
    let file = e.currentTarget.files[0];
    this.setState({avatarFile: file})
    let reader  = new FileReader();
    reader.onloadend = function () {
      this.setState({ avatarURL: reader.result });
    }.bind(this);
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  submitChanges(e) {
    e.preventDefault();
    const avatar = this.state.avatarFile;
    const banner = this.state.bannerFile;
    const username = this.state.username;
    const description = this.state.description;
    const formData = new FormData();
    if (avatar) {
      formData.append("user[avatar]", avatar);
    }
    if (banner) {
      formData.append("user[banner]", banner);
    }

    if(username) {
      formData.append("user[username]", username);
    }

    if (description) {
      formData.append("user[description]", description);
    }

    this.props.editUser(this.props.user.id, formData).then(
      this.setState({edit: false,
      buttons: false,
      cancel: false,
      bannerFile: "",
      avatarFile: "",
      username: "",
      description: ""
    })
    )
  }

  selectToggle(e) {
    if (e === "HOME") {
      this.setState({selected: "HOME"})
    } else if (e === "VIDEOS") {
      this.setState({selected: "VIDEOS"})
    } else if (e === "CHANNELS") {
      this.setState({selected: "CHANNELS"})
    } else if (e === "LIKES") {
      this.setState({selected: "LIKES"})
    } else if (e === "ABOUT") {
      this.setState({selected: "ABOUT"})
    } else if (e === "WATCHLIST") {
      this.setState({selected: "WATCHLIST"})
    }
  }

  handleSubs(user) {
    const { currentUserID, users, createSub, deleteSub } = this.props;
    if (!user) {
      return;
    }
    let subscribee_id = user.id
    if (!currentUserID) {
      this.props.history.push('/signin');
      return;
    }

    if (users[currentUserID].subscriberIds.includes(subscribee_id)) {
      deleteSub(subscribee_id);
    } else {
      createSub(subscribee_id);
    }
  }

  formatViews(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  formatNumber(num) {
    num = Math.abs(num);
    let formattedNumber;
    if (num >= 1000000000) {
        formattedNumber = (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    } else if (num >= 1000000) {
        formattedNumber =  (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else  if (num >= 1000) {
        formattedNumber =  (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
        formattedNumber = num;
    }
    return formattedNumber;
  }

  convertDate(date) {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let d  = new Date(date);
    return d.toLocaleDateString("en-US", options);
  }

  updateUsername(e) {
    this.setState({username: e.currentTarget.value})
  }

  updateDescription(e) {
    this.setState({description: e.currentTarget.value})
  }

  render() {
    let {user, currentUserID, loading, videos, users, users_arr, openVidModal, watchLaterButton, createWatch, deleteWatch} = this.props;
    if(!user || !videos || !users_arr) {
      return null;
    }

    let banner = user.banner_img_url;
    let avatar = user.profile_img_url;

    let customize;
    if(user.id !== currentUserID) {
      customize = "hidden";
    } else if (this.state.edit) {
      customize = "hidden"
    } else {
      customize = "customize-button";
    }

    let navSubButton;
    let navSubButtonClass;
    if(currentUserID === user.id) {
      navSubButtonClass = "hidden";
    } else if (currentUserID && users[currentUserID].subscriberIds.includes(user.id)) {
      navSubButtonClass = "nav-subscribed";
      navSubButton = "SUBSCRIBED";
    } else {
      navSubButtonClass = "nav-subscribe";
      navSubButton = "SUBSCRIBE";
    }

    let selected;
    if(this.state.selected ==="VIDEOS") {
      videos = videos.filter(video => video.author_id === user.id)
      selected = <div className='video-index'>
        <ul>
        {videos.map((video,idx) => <VideoIndexItem idx={idx} key={video.id} users={users} watchLaterButton={watchLaterButton} createWatch={createWatch} deleteWatch={deleteWatch} openVidModal={openVidModal}timeAgo= {video.timestamp} video={video} currentUserID={currentUserID}author={users[video.author_id] ? users[video.author_id].username : ""}/>)}
        </ul>
        <nav className={videos.length === 0 ? "empty-message" : "hidden"}>
          <p>{videos.length === 0 ? "No Uploads" : ""}</p>
        </nav>
      </div>
    } else if (this.state.selected === "WATCHLIST") {
      videos = videos.filter(video => user.watchLaterIds.includes(video.id))
      selected = <div className='video-index'>
        <ul>
        {videos.map((video,idx) => <VideoIndexItem idx={idx} users={users} key={video.id} watchLaterButton={watchLaterButton} createWatch={createWatch} deleteWatch={deleteWatch} openVidModal={openVidModal}timeAgo= {video.timestamp} video={video} currentUserID={currentUserID}author={users[video.author_id] ? users[video.author_id].username : ""}/>)}
        </ul>
        <nav className={videos.length === 0 ? "empty-message" : "hidden"}>
          <p>{videos.length === 0 ? "No Videos Added" : ""}</p>
        </nav>
      </div>
    } else if (this.state.selected === "CHANNELS") {
      users_arr = users_arr.filter(channel => user.subscriberIds.includes(channel.id));
      selected = <div className="channel-index">
        <ul>
          {users_arr.map((user,idx) => <li key={user.id}>
            <div>
              <Link className={user.profile_img_url === "/avatars/original/missing.png" ? "hidden" : ""} to={`/channel/${user.id}`}><img src={user.profile_img_url}></img></Link>
              <Link className={user.profile_img_url === "/avatars/original/missing.png" ? "channel-no-pic" : "hidden"} to={`/channel/${user.id}`}>{user.username.slice(0,1)}</Link>
              <Link to={`/channel/${user.id}`}>  <h1>{user.username}</h1></Link>
              <p>{this.formatViews(user.subscribeeIds.length)} subscribers</p>
              <button className={user.id === currentUserID ? "hidden" : ""}onClick={() => this.handleSubs(user)}>{currentUserID && users[currentUserID].subscriberIds.includes(user.id) ? "Subscribed" : "Subscribe"}</button>
              <p className={user.id === currentUserID ? "" : "hidden"}>My Channel</p>
            </div>
          </li>)}
        </ul>
        <nav className={users_arr.length === 0 ? "empty-message" : "hidden"}>
          <p>{users_arr.length === 0 ? "No Subscriptions" : ""}</p>
        </nav>
      </div>
    } else if (this.state.selected === "LIKES") {
      let likedVideoIds = user.likedVideoIds
      videos = videos.filter(video => likedVideoIds.includes(video.id))
      selected = <div className='video-index'>
        <ul>
        {videos.map((video,idx) => <VideoIndexItem idx={idx} users={users} key={video.id} watchLaterButton={watchLaterButton} createWatch={createWatch} deleteWatch={deleteWatch} openVidModal={openVidModal}timeAgo= {video.timestamp} currentUserID={currentUserID} video={video} author={users[video.author_id] ? users[video.author_id].username : ""}/>)}
        </ul>
        <nav className={videos.length === 0 ? "empty-message" : "hidden"}>
          <p>{videos.length === 0 ? "No Likes" : ""}</p>
        </nav>
      </div>

    } else if (this.state.selected === "ABOUT") {
      videos = videos.filter(video => video.author_id === user.id)
      let subscribers = users_arr.filter(channel => channel.subscriberIds.includes(user.id))
      let total_views = 0;
      videos.forEach(vid =>  total_views += vid.view_count)
      selected = <section className="user-container" id='body'>
                	<section className="user-description-container col col-1-2">
                    <div className="description-header">
                      <span>Description</span>
                      <p className={this.state.edit ? "hidden" : ""}>{user.description ? user.description : "No Description"}</p>
                      <textarea value={this.state.description} onChange={this.updateDescription} className={this.state.edit ? "edit-description" : "hidden"}>{this.state.description}</textarea>
                    </div>
                  </section>
                  	<section className="col col-1-2">

                      <section className="col col-1-2-1">
                        <div className="stats-header">
                          <span>Stats</span>
                          <p>Joined {this.convertDate(user.timestamp)}</p>
                          <p>{this.formatViews(total_views)} views</p>
                        </div>
                      </section>

                      <section className="col col-1-2-1">
                        <div className="subs-header">
                          <span>SUBSCRIBERS</span>
                            <ul className="subs-list-ul">
                              {subscribers.map((user,idx) => <li key={user.id}>
                                <div className="subs-nav-item">
                                  <div className="subscribers-nav">
                                    <Link className={user.profile_img_url === "/avatars/original/missing.png" ? "hidden" : ""}to={`/channel/${user.id}`}><img src={user.profile_img_url}></img></Link>
                                    <Link className={user.profile_img_url === "/avatars/original/missing.png" ? "" : "hidden"}to={`/channel/${user.id}`}><div className="no-pic-avatar">{user.username.slice(0,1)}</div></Link>
                                    <Link to={`/channel/${user.id}`}>  <h1>{user.username}</h1></Link>
                                  </div>
                                  <button className={user.id === currentUserID ? "hidden" : ""}onClick={() => this.handleSubs(user)}>{currentUserID && users[currentUserID].subscriberIds.includes(user.id) ? "Subscribed" : "Subscribe"}</button>
                                  <p className={user.id === currentUserID ? "" : "hidden"}>My Channel</p>
                                </div>
                              </li>)}
                            </ul>
                            <p className={subscribers.length === 0 ? "no-subs-p" : "hidden"}>No Subscribers</p>
                        </div>
                      </section>

            			</section>
                </section>
    }

      return(
      <div className="channel-container" id="body">
        <div
          className="user-banner-container">
          <div className="user-banner"
            style={
              {backgroundImage: `url(${banner})`}
             }>
          <div className='right-container'>
            <div className={currentUserID === user.id ? "banner-edit-container" : "" }>
              <span className={this.state.edit ? "banner-edit-container-span" : "hidden"}>
                <i className="fas fa-camera"></i>
              </span>
              <input className={this.state.buttons ? "banner-edit-input" : "hidden"}
                onChange={this.updateBanner}
                value=""
                type="file"></input>
              <button onClick={this.editProfile} className={customize}>Customize Channel</button>
            </div>

            <div className="finalize-buttons">
              <button onClick={this.submitChanges} className={this.state.edit  || this.state.avatarFile ? "save-button" : "hidden"}>Save Changes</button>
              <button onClick={this.cancelEdit} className={this.state.edit || this.state.avatarFile ? "finalize-button" : "hidden"}>Cancel</button>
            </div>

          </div>

          </div>

          <div className={ this.state.bannerURL ? "banner-preview" : "hidden"}
            style={
              {backgroundImage: `url(${this.state.bannerURL})`}
             }>

          </div>

        </div>

        <div className="user-info-container">
          <div className="user-show-icon">
            <span style={
              {backgroundImage: `url(${avatar})`}
            }>{user.profile_img_url === "/avatars/original/missing.png" ? user.username.slice(0,1): ""}</span>

          <nav className={this.state.avatarURL ? "avatarPreview" : "hidden"}
            style={
              {backgroundImage: `url(${this.state.avatarURL})`}
             }></nav>

           <div className={this.state.edit ? "avatar-cam" : "hidden"}>
                 <i className="fas fa-camera"></i>
               </div>

              <input
                className={currentUserID === user.id && this.state.buttons ? "avatar-input" : "hidden"}
                type="file"
                value=""
                onChange={this.updateAvatar}>
              </input>
          </div>
          <div className="user-name-info">
            <nav>
              <div>
                <h1 className={this.state.edit ? "hidden" : "user-name-info-h1"}>{user.username}</h1>
                <input onChange={this.updateUsername} className={this.state.edit ? "user-name-info-input" : "hidden"} value={this.state.username}/>
                <p className="subs-count">{this.formatViews(user.subscribeeIds.length)} subscribers</p>
              </div>
              <p className="user-errors-update">{this.props.errors[0] ? "Username Invalid" : ""}</p>
            </nav>

            <nav className="subs">
              <button onClick={() => this.handleSubs(user)} className={navSubButtonClass}>{navSubButton} {this.formatNumber(user.subscribeeIds.length)}</button>
            </nav>

          </div>
        </div>

        <div className="user-toggle-options">
          <ul>
            <li className={this.state.selected === "HOME" ? "selected" : ""}
              onClick={() => this.selectToggle("HOME")}>
              HOME
            </li>

            <li className={this.state.selected === "VIDEOS" ? "selected" : ""}
              onClick={() => this.selectToggle("VIDEOS")}>
              VIDEOS
            </li>

            <li className={this.state.selected === "WATCHLIST" ? "selected" : ""}
              onClick={() => this.selectToggle("WATCHLIST")}>
              WATCHLISTS
            </li>

            <li className={this.state.selected === "CHANNELS" ? "selected" : ""}
              onClick={() => this.selectToggle("CHANNELS")}>
              CHANNELS
            </li>

            <li className={this.state.selected === "LIKES" ? "selected" : ""}
              onClick={() => this.selectToggle("LIKES")}>
              LIKES
            </li>

            <li className={this.state.selected === "ABOUT" ? "selected" : ""}
              onClick={() => this.selectToggle("ABOUT")}>
              ABOUT
            </li>
          </ul>
        </div>
        {selected}
        <button
          id="watch-later-bttn-toggle"
          className={this.props.button ? "watch-later-bttn" : "watch-later-bttn"}>{this.props.button} Watchlist
        </button>
      </div>
      )
    }
  }


export default ChannelShow;
