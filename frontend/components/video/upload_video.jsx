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
      sub: "Basic Info",
      tagbody: "",
      tagArr: []
    }
    this.updateFile = this.updateFile.bind(this);
    this.uploadVideo = this.uploadVideo.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.subForm = this.subForm.bind(this);
    this.generateErrors = this.generateErrors.bind(this);
    this.updateTag = this.updateTag.bind(this);
    this.addTag = this.addTag.bind(this);
  }

  componentDidMount() {
    this.props.clearAllVideoErrors()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors.length > 0) {
      this.setState({status: "Pending.  Fix Errors."})
    }
  }

  componentWillUnmount() {
    this.props.clearAllVideoErrors()
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
    if(this.props.videoLoad) {
      return null;
    }
    this.setState({status: "Loading. Please keep window open."})
    const { createVideo} = this.props;
    let videoForm = new FormData();
    const vFile = this.state.videoFile;
    videoForm.append("video[clip]", vFile);
    videoForm.append("video[title]", this.state.title);
    videoForm.append("video[description]", this.state.description);

    this.state.tagArr.forEach((tag_name) => {
          videoForm.append('tags[tag_names][]', tag_name);
    });

    this.setState({sub: "Basic Info"})
    createVideo(videoForm).then( action => {
      this.setState({videoFile: "", vThumb: "", title: "", description: "", status: "", videoUrl: "", tagbody: "",
      tagArr: []  })
      this.props.history.push(`/`);
    });

  }

  generateErrors(errors) {
    let hash = {};
    for (let i = 0; i < errors.length; i++) {
      hash[errors[i]] = errors[i]
    }
    return hash;
  }

  updateTag(e) {
    e.preventDefault();
    this.setState({tagbody: e.currentTarget.value})
  }

  addTag(e) {
    e.preventDefault()
    if(this.state.tagbody === "" || this.state.tagArr.includes(this.state.tagbody)) {
      return null;
    } else {
      let combinedTags = this.state.tagArr.concat(this.state.tagbody)
      this.setState({tagArr: combinedTags, tagbody: ""})
    }
  }

  render() {
    let uploadForm;
    let {errors, videoLoad} = this.props;
    let errorsHash;
    if(errors.length > 0) {
      errorsHash = this.generateErrors(errors);
    }

    let titleError;
    let titleErrorClass = "upload-details-details-input";
      for (let i = 0; i < errors.length; i++) {
        if(errorsHash && errorsHash["Title can't be blank"]) {
          titleError = "Title can't be blank"
          titleErrorClass = "upload-errors-input"
        } else if (errorsHash && errorsHash["Author video titles must be unique"]) {
          titleError = "Title must be unique"
          titleErrorClass = "upload-errors-input"
        } else if (errorsHash && errorsHash["Clip content type is invalid", "Clip is invalid"]) {
          titleError = "Invalid file type"
          titleErrorClass = "upload-errors-input"
        } else {
          titleError = ""
          titleErrorClass = "upload-details-details-input"
        }
      }

    let selectedForm;
    if (this.state.sub === "Basic Info") {
      selectedForm = <form>
        <input className={ titleErrorClass } id ="title" placeholder= "Title" value={this.state.title} onChange={this.updateInput}></input>
          <p className="upload-error-messages">{titleError}</p>
        <textarea className={errorsHash && errorsHash["Description can't be blank"] ? "upload-details-details-textarea-errors" : "upload-details-details-textarea"} id ="description" placeholder= "Description" value={this.state.description} onChange={this.updateInput}></textarea>
          <p className="description-upload-error-messages">{errorsHash && errorsHash["Description can't be blank"] ? errorsHash["Description can't be blank"] : ""}</p>
      </form>
    } else if((this.state.sub === "Additional Info")){
      selectedForm = <form>
        <input onChange={this.updateTag} value={this.state.tagbody} className="upload-details-details-input" placeholder="Tags"></input>
        <button onClick={this.addTag} className="add-tag-button">Add Tag</button>
        <ul className="tag-list">
          {this.state.tagArr.map((tag,idx) => <li className="tag-list-li" idx={idx} key={idx.id}>{tag}</li>)}
        </ul>
      </form>
    } else {
      selectedForm = <form>
        <input className="upload-details-details-input" value=""placeholder="Links"></input>
      </form>
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
                          <span className="video-upload-button-container">
                            <button className="publish" onClick={this.uploadVideo}>Publish</button>
                          </span>

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
                    <div className={videoLoad ? "lds-ring-upload" : "hidden"}><div></div><div></div><div></div><div></div></div>
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
        <div className = "upload-container" id='body'>
          {uploadForm}
        </div>
      )
    }
  }


export default UploadVideo;
