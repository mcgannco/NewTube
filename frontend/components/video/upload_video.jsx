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
    let {errors, videoLoad, nightMode} = this.props;
    let errorsHash;
    if(errors.length > 0) {
      errorsHash = this.generateErrors(errors);
    }

    let titleError;
    let titleErrorClass;
    let descriptionErrorClass;
    if(nightMode) {
      titleError = ""
      titleErrorClass = "upload-details-details-input-night";
      descriptionErrorClass = "upload-details-details-textarea-night";
    } else {
      titleError = ""
      titleErrorClass = "upload-details-details-input";
      descriptionErrorClass = "upload-details-details-textarea";
    }
      for (let i = 0; i < errors.length; i++) {
        if(errorsHash && errorsHash["Title can't be blank"] && (errorsHash && errorsHash["Description can't be blank"])) {
          if(nightMode) {
            titleError = "Title can't be blank"
            titleErrorClass = "upload-errors-input-night"
            descriptionErrorClass = "upload-details-details-textarea-errors-night"
          } else {
            titleError = "Title can't be blank"
            titleErrorClass = "upload-errors-input"
            descriptionErrorClass = "upload-details-details-textarea-errors"
          }
        } else if (errorsHash && errorsHash["Title can't be blank"]) {
          if(nightMode) {
            titleError = "Title can't be blank"
            titleErrorClass = "upload-errors-input-night"
            descriptionErrorClass = "upload-details-details-textarea-night"
          } else {
            titleError = "Title can't be blank"
            titleErrorClass = "upload-errors-input"
            descriptionErrorClass = "upload-details-details-textarea"
          }
        } else if (errorsHash && errorsHash["Author video titles must be unique"] && (errorsHash && errorsHash["Description can't be blank"])) {
          if(nightMode) {
            titleError = "Title already taken"
            titleErrorClass = "upload-errors-input-night"
            descriptionErrorClass = "upload-details-details-textarea-errors-night"
          } else {
            titleError = "Title already taken"
            titleErrorClass = "upload-errors-input"
            descriptionErrorClass = "upload-details-details-textarea-errors"
          }
        } else if (errorsHash && errorsHash["Author video titles must be unique"]) {
          if(nightMode) {
            titleError = "Title already taken"
            titleErrorClass = "upload-errors-input-night"
            descriptionErrorClass = "upload-details-details-textarea-night"
          } else {
            titleError = "Title already taken"
            titleErrorClass = "upload-errors-input"
            descriptionErrorClass = "upload-details-details-textarea"
          }
        } else if (errorsHash && errorsHash["Clip content type is invalid", "Clip is invalid"] && (errorsHash && errorsHash["Description can't be blank"])) {
          if(nightMode) {
            titleError = "Invalid file"
            titleErrorClass = "upload-errors-input-night"
            descriptionErrorClass = "upload-details-details-textarea-errors-night"
          } else {
            titleError = "Invalid file"
            titleErrorClass = "upload-errors-input"
            descriptionErrorClass = "upload-details-details-textarea-errors"
          }
        } else if (errorsHash && errorsHash["Clip content type is invalid", "Clip is invalid"]) {
          if(nightMode) {
            titleError = "Invalid file"
            titleErrorClass = "upload-errors-input-night"
            descriptionErrorClass = "upload-details-details-textarea-night"
          } else {
            titleError = "Invalid file"
            titleErrorClass = "upload-errors-input"
            descriptionErrorClass = "upload-details-details-textarea"
          }
        } else if(errorsHash && errorsHash["Description can't be blank"]) {
          if(nightMode) {
            titleError = ""
            titleErrorClass = "upload-details-details-input-night"
            descriptionErrorClass = "upload-details-details-textarea-errors-night"
          } else {
            titleError = ""
            titleErrorClass = "upload-details-details-input"
            descriptionErrorClass = "upload-details-details-textarea-errors"
          }
        } else {
          if(nightMode) {
            titleError = ""
            titleErrorClass = "upload-details-details-input-night"
            descriptionErrorClass = "upload-details-details-textarea-night"
          } else {
            titleError = ""
            titleErrorClass = "upload-details-details-input"
            descriptionErrorClass = "upload-details-details-textarea"
          }
        }
      }


    let selectedForm;
    if (this.state.sub === "Basic Info") {
      selectedForm = <form className={nightMode ? "selectedFormForm-night" : "selectedFormForm"}>
        <input className={ titleErrorClass } id ="title" placeholder= "Title" value={this.state.title} onChange={this.updateInput}></input>
          <p className="upload-error-messages">{titleError}</p>
        <textarea className={descriptionErrorClass} id ="description" placeholder= "Description" value={this.state.description} onChange={this.updateInput}></textarea>
          <p className="description-upload-error-messages">{errorsHash && errorsHash["Description can't be blank"] ? errorsHash["Description can't be blank"] : ""}</p>
      </form>
    } else if((this.state.sub === "Additional Info")){
      selectedForm = <form className={nightMode ? "selectedFormForm-night" : "selectedFormForm"}>
        <input onChange={this.updateTag} value={this.state.tagbody} className={nightMode ? "upload-details-details-input-night" : "upload-details-details-input"} placeholder="Tags"></input>
        <button onClick={this.addTag} className="add-tag-button">Add Tag</button>
        <ul className="tag-list">
          {this.state.tagArr.map((tag,idx) => <li className="tag-list-li" idx={idx} key={idx.id}>{tag}</li>)}
        </ul>
      </form>
    }
    if (this.state.videoFile) {
      let basicInfo;
      let additional;
      if(this.state.sub === "Basic Info") {
        if(nightMode) {
          basicInfo = "selectedTab-night"
          additional = "unselectedTab-night"
        } else {
          basicInfo = "selectedTab"
          additional = "unselectedTab"
        }
      } else {
        if(nightMode) {
          basicInfo = "unselectedTab-night"
          additional = "selectedTab-night"
        } else {
          basicInfo = "unselectedTab"
          additional = "selectedTab"
        }
      }
      uploadForm = <div onClick={this.test} className={nightMode ? "upload-field-night" : "upload-field"}>
                      <div className="upload-details-video">
                        <span>
                          <video src={this.state.videoUrl}  width="250" height="150"  />
                          <h1 className={nightMode ? "upload-details-video-h1-night" : "upload-details-video-h1"}>Upload Status</h1>
                          <p>{this.state.status}</p>
                        </span>

                        <div>
                          <span className="video-upload-button-container">
                            <button className="publish" onClick={this.uploadVideo}>Publish</button>
                          </span>

                          <nav>
                            <p className={basicInfo} onClick={this.subForm}>Basic Info</p>
                            <p className={additional} onClick={this.subForm}>Additional Info</p>
                          </nav>
                        </div>
                    </div>

                    <div className="upload-details-details">
                      <div>
                        <h1 className={nightMode ? "upload-details-details-h1-night" : "upload-details-details-h1"}></h1>
                      </div>
                      {selectedForm}
                    </div>
                    <div className={videoLoad ? "lds-ring-upload" : "hidden"}><div></div><div></div><div></div><div></div></div>
                  </div>
    } else {
      uploadForm =   <div className={nightMode ? "upload-field-night" : "upload-field"}>
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
