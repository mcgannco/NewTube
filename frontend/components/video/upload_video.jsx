import React from 'react';
import { Link } from 'react-router-dom';

class UploadVideo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: ""
    }
    this.updateFile = this.updateFile.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(e) {
    let field = e.currentTarget.id;
    if (field === "title") {
      this.setState({title: e.currentTarget.value})
    } else {
      this.setState({description: e.currentTarget.value})
    }
  }

  updateFile(e) {
    const { createVideo} = this.props;
    let videoForm = new FormData();
    const vFile = e.currentTarget.files[0];
    videoForm.append("video[clip]", vFile);
    videoForm.append("video[title]", this.state.title);
    videoForm.append("video[description]", this.state.description);
    createVideo(videoForm).then( action => {
      this.props.history.push(`/`);
    });

  }

  render() {
      return(
        <div>
          <h1>Upload</h1>
            <label>Title
            </label>
            <input id="title" onChange={this.updateInput}type="text"></input>

              <label>description
              </label>
              <input id="description" onChange={this.updateInput} type="text"></input>

            <input
            className="upload-video-input"
            type="file"
            onChange={this.updateFile}
            />
        </div>
      )
    }
  }


export default UploadVideo;
