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

  render() {
    let {user} = this.props;
    if(!user) {
      return null;
    }

      return(
      <div className="channel-container">
        <div
          className="user-banner-container">
          <div className="user-banner"
            onMouseEnter={this.showEditButtons}
            onMouseLeave={this.hideButtons}
            style={
              {backgroundImage: `url(${this.state.bannerURL})`}
             }>
            <h1>{user.username}</h1>

          <div className='right-container'>
            <div className="banner-edit-container">
              <span className={this.state.edit ? "hidden" : "hidden"}><i className="fas fa-edit"></i></span>
              <input className={this.state.buttons ? "banner-edit-input" : "hidden"}
                onChange={this.updateBanner}
                type="file"></input>
              <button onClick={this.editProfile} className={this.state.edit ? "hidden" : "customize-button"}>Customize Channel</button>
            </div>

            <div className="finalize-buttons">
              <button onClick={this.cancelEdit} className={this.state.bannerURL || this.state.avatarURL ? "save-button" : "hidden"}>Save Changes</button>
              <button onClick={this.cancelEdit} className={this.state.edit ? "finalize-button" : "hidden"}>Cancel</button>
            </div>

          </div>

          </div>

        </div>
      </div>
      )
    }
  }


export default ChannelShow;
