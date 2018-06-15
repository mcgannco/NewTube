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
      videoUrl: "",
      status: "",
      sub: "Basic Info"
    }
    this.updateFile = this.updateFile.bind(this);
    this.uploadVideo = this.uploadVideo.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.subForm = this.subForm.bind(this);
  }

  subForm(e) {
    this.setState({sub: e.currentTarget.innerText})
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
      this.setState({ vThumb: reader.result, status: "Pending.  Complete video detail form." });
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    }

    this.setState({ videoUrl: window.URL.createObjectURL(file)});
    this.setState({ title: e.currentTarget.files[0].name.slice(0,e.currentTarget.files[0].name.length - 4)})
  }

  uploadVideo(e) {
    this.setState({status: "Loading. Please keep window open."})
    const { createVideo} = this.props;
    let videoForm = new FormData();
    const vFile = this.state.videoFile;
    videoForm.append("video[clip]", vFile);
    videoForm.append("video[title]", this.state.title);
    videoForm.append("video[description]", this.state.description);
    createVideo(videoForm).then( action => {
      this.setState({videoFile: "", vThumb: "", title: "", description: "", status: "", videoUrl: ""  })
      this.props.history.push(`/`);
    });

  }

  render() {
    let uploadForm;
    let {errors} = this.props;
    let selectedForm;
    if (this.state.sub === "Basic Info") {
      selectedForm = <form>
        <input id ="title" placeholder= "Title" value={this.state.title} onChange={this.updateInput}></input>
        {errors[0]}
        <textarea id ="description" placeholder= "Description" value={this.state.description} onChange={this.updateInput}></textarea>
      </form>
    } else {
      selectedForm = <form><input value=""placeholder="TBD"></input></form>
    }
    if (this.state.videoFile) {
      uploadForm = <div onClick={this.test} className="upload-field">
                      <div className="upload-details-video">
                        <span>
                          <video src={this.state.videoUrl}  width="250" height="150"  />
                          <h1>Upload Status</h1>
                          <p>{this.state.status}</p>
                        </span>

                        <div>
                          <span><button onClick={this.uploadVideo}>Publish</button></span>
                          <nav>
                            <p className={this.state.sub === "Basic Info" ? "selectedTab" : ""} onClick={this.subForm}>Basic Info</p>
                            <p className={this.state.sub === "Additional Info" ? "selectedTab" : ""} onClick={this.subForm}>Additional Info</p>
                            <p className={this.state.sub === "Other" ? "selectedTab" : ""} onClick={this.subForm}>Other</p>
                          </nav>
                        </div>
                    </div>

                    <div className="upload-details-details">
                      <div>
                        <h1></h1>
                      </div>
                      {selectedForm}
                    </div>
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
