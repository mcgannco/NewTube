import React from 'react';
import { Link } from 'react-router-dom';

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
      avatarURL: ""
    }
    this.editProfile = this.editProfile.bind(this);
    this.showEditButtons = this.showEditButtons.bind(this);
    this.hideButtons = this.hideButtons.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.updateBanner = this.updateBanner.bind(this);
    this.updateAvatar = this.updateAvatar.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
  }

  componentDidMount() {
    this.props.requestSingleUser(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user && (this.props.user.id != nextProps.match.params.id)) {
      this.props.requestSingleUser(nextProps.match.params.id).then(window.scrollTo(0, 0));
    }
  }

  editProfile() {
    this.setState({edit: true, cancel: true, buttons: true})
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
    avatarURL: ""
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
    const formData = new FormData();
    if (avatar) {
      formData.append("user[avatar]", avatar);
    }
    if (banner) {
      formData.append("user[banner]", banner);
    }

    this.props.editUser(this.props.user.id, formData).then(
      this.setState({edit: false,
      buttons: false,
      cancel: false,
      bannerFile: "",
      avatarFile: "",
    })
    )

  }

  render() {
    let {user, currentUserID, loading} = this.props;
    if(!user) {
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

      return(
      <div className="channel-container">
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
        </div>
      </div>
      )
    }
  }


export default ChannelShow;
