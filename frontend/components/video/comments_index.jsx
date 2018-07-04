import React from 'react';
import { Link } from 'react-router-dom';

class CommentsIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentInput: "",
      submitButtons: true,
      allowSubmit: false
    }
    this.updateInput = this.updateInput.bind(this);
    this.showButton = this.showButton.bind(this);
    this.hideButtons = this.hideButtons.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {

  }

  updateInput(e) {
      if (e.currentTarget.value !== "") {
        this.setState({commentInput: e.currentTarget.value,allowSubmit: true})
      } else {
        this.setState({commentInput: e.currentTarget.value, allowSubmit:false})
      }
  }

  showButton(e) {
    if(!this.state.submitButtons) {
      this.setState({submitButtons: true})
    }
  }

  hideButtons(e){
    this.setState({submitButtons: false, commentInput: "", allowSubmit: false})
  }

  submit(e) {
    if(this.state.commentInput === "") {
      return null;
    } else {
      debugger
    }
  }

  render() {
    return(
      <div className="user-comment-div-container">
        <div className="user-comment-div">
          <span>f</span>
          <input onClick={this.showButton}
            onChange={this.updateInput}
            placeholder="Add a public comment..."
            value ={this.state.commentInput}>
          </input>

        </div>

        <div className={this.state.submitButtons ? "comment-button-container" : "hidden"}>
          <button onClick={this.hideButtons} className="cancel-button">Cancel</button>
          <button onClick={this.submit} className={this.state.allowSubmit ? "submit-button" : "no-submit-button"}>Submit</button>
        </div>

      </div>
    )
  }
}

export default CommentsIndex;
