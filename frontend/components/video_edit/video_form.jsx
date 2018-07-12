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
  }

  updateTitle(e) {
    e.preventDefault()
    this.setState({title: e.currentTarget.value})
  }

  updateDescription(e) {
    e.preventDefault()
    this.setState({description: e.currentTarget.description})
  }

  render() {
    let { formType, video } = this.props;
    return(
      <div className="change-video-container">
        <div>
          <video
            width="200"
            height="150"
            className="edit-video-gif"
            src={video.video_url}>
          </video>
        </div>

        <div className="video-edit-info-inputs">
          <input onChange={this.updateTitle}value={this.state.title}></input>
          <textarea onChange={this.updateDescription}>{this.state.description}</textarea>
          <div className="change-vid-button">
            <button>{formType === "edit" ? "Submit" : "Delete"}</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(VideoForm);
