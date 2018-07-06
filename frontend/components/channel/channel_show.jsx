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
    this.setState({edit: false, buttons: false, cancel: false,bannerFile: "",
    bannerURL: "",
    avatarFile: "",
    avatarURL: ""})
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
      bannerURL: "",
      avatarFile: "",
      avatarURL: ""})
    )

  }

  render() {
    let {user} = this.props;
    if(!user) {
      return null;
    }
    let banner;
    if(this.state.bannerURL === "" && this.props.user.banner_img_url) {
      banner = this.props.user.banner_img_url
    } else {
      banner = this.state.bannerURL
    }

      return(
      <div className="channel-container">
        <div
          className="user-banner-container">
          <div className="user-banner"
            onMouseEnter={this.showEditButtons}
            onMouseLeave={this.hideButtons}
            style={
              {backgroundImage: `url(${banner})`}
             }>
          <div className='right-container'>
            <div className="banner-edit-container">
              <span className={this.state.edit ? "banner-edit-container-span" : "hidden"}><i className="fas fa-edit"></i></span>
              <input className={this.state.buttons ? "banner-edit-input" : "hidden"}
                onChange={this.updateBanner}
                type="file"></input>
              <button onClick={this.editProfile} className={this.state.edit ? "hidden" : "customize-button"}>Customize Channel</button>
            </div>

            <div className="finalize-buttons">
              <button onClick={this.submitChanges} className={this.state.bannerURL || this.state.avatarURL ? "save-button" : "hidden"}>Save Changes</button>
              <button onClick={this.cancelEdit} className={this.state.edit ? "finalize-button" : "hidden"}>Cancel</button>
            </div>

          </div>

          </div>

        </div>
        <div className="user-info-container">
          <div className="user-show-icon">
            <span>s</span>
          </div>
        </div>
      </div>
      )
    }
  }


export default ChannelShow;
