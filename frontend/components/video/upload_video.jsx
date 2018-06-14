import React from 'react';
import { Link } from 'react-router-dom';

class UploadVideo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: "",
      videoFile: "",
      vThumb: "",
      videoUrl: ""
    }
    this.updateFile = this.updateFile.bind(this);
    this.uploadVideo = this.uploadVideo.bind(this);
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
    let file    = e.currentTarget.files[0];
    this.setState({videoFile: file})
    let reader  = new FileReader();
    reader.onloadend = function () {
      this.setState({ vThumb: reader.result });
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    }

    this.setState({ videoUrl: window.URL.createObjectURL(file)});
  }

  uploadVideo(e) {
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
    let uploadForm;
    if (this.state.videoFile) {
      uploadForm = <div onClick={this.test} className="upload-field">
                    <video src={this.state.videoUrl}  width="480" height="270"  />
                  </div>
    } else {
      uploadForm =   <div className="upload-field">
                      <form className="upload-video-input">
                        <span><i className="fas fa-cloud-upload-alt"></i>
                        <p>Select files to upload</p>
                        <p>Or drag and drop files</p>
                        </span>
                        <input
                          type="file"
                          onChange={this.updateFile}
                          />
                      </form>
                  </div>
    }
      return(
        <div className = "upload-container">
          {uploadForm}
        </div>
      )
    }
  }


export default UploadVideo;
