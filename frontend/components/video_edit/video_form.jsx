import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class VideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: "",
      title: props.video.title,
      description: props.video.description,
    }
    this.updateTitle = this.updateTitle.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.submit = this.submit.bind(this);
  }

  updateTitle(e) {
    e.preventDefault()
    this.setState({title: e.currentTarget.value})
  }

  updateDescription(e) {
    e.preventDefault()
    this.setState({description: e.currentTarget.value})
  }

  submit(e) {
    if(this.props.formType === "edit") {
      const formData = new FormData();
        formData.append("video[title]", this.state.title);
        formData.append("video[description]", this.state.description);
        this.props.processForm(this.props.video.id, formData).then(
        this.setState({formType: "",title: "",description: ""}))
        this.props.closeVidModal()
    } else {
      let path = this.props.history.location["pathname"]
      if (path === '/') {
        this.props.processForm(this.props.video.id).then(
        this.setState({formType: "",title: "",description: ""}))
        this.props.closeVidModal()
      } else {

      let matches;
      if(path.match(/\d+/g)) {
        matches = path.match(/\d+/g)[0];
        if (parseInt(matches) === this.props.video.id) {
          this.props.processForm(this.props.video.id).then(
          this.setState({formType: "",title: "",description: ""}))
          this.props.closeVidModal()
          this.props.history.push('/')
        } else {
          this.props.processForm(this.props.video.id).then(
          this.setState({formType: "",title: "",description: ""}))
          this.props.closeVidModal()
        }
      } else {
        this.props.processForm(this.props.video.id).then(
        this.setState({formType: "",title: "",description: ""}))
        this.props.closeVidModal()
      }
      }
    }
}

  render() {
    let { formType, video, nightMode } = this.props;
    let titleClass;
    if(formType === "edit") {
      titleClass = "hidden"
    } else {
      if(nightMode) {
        titleClass = "video-edit-h3-night"
      } else {
        titleClass = "video-edit-h3"
      }
    }
    return(
      <div className={nightMode ? "change-video-container-night" : "change-video-container"}>
        <div>
          <video
            width="200"
            height="150"
            className="edit-video-gif"
            src={video.video_url}>
          </video>
          <h3 className={titleClass}>{video.title}</h3>
        </div>

        <div className="video-edit-info-inputs">
          <input className={formType === "edit" ? "" : "hidden"} onChange={this.updateTitle}value={this.state.title}></input>
          <textarea className={formType === "edit" ? "" : "hidden"} onChange={this.updateDescription}>{this.state.description}</textarea>
          <div className={formType === "edit" ? "change-vid-button" : "delete-button-container"}>
            <span className={formType === "edit" ? "hidden" : ""}>Please Confirm Deletion</span>
            <button onClick={this.submit}>{formType === "edit" ? "Submit" : "Delete"}</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(VideoForm);
