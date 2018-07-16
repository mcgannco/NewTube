import React from 'react';
import { Link } from 'react-router-dom';
import CommentIndexItemContainer from './comments_index_item_container';

class CommentsIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentInput: "",
      submitButtons: false,
      allowSubmit: false
    }
    this.updateInput = this.updateInput.bind(this);
    this.showButton = this.showButton.bind(this);
    this.hideButtons = this.hideButtons.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.requestAllComments(this.props.vidId)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.vidId && (this.props.vidId != nextProps.vidId)) {
      this.props.requestAllComments(nextProps.vidId)
    }
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
      this.props.createComment({
        body: this.state.commentInput,
        video_id: this.props.vidId,
        author_id: this.props.currentUser.id
       })
       .then(
        this.setState({commentInput: "", submitButtons: false})
      )
    }
  }

  render() {

    let {comments, vidId, users, currentUser, createComment} = this.props;
    let numComments;

    if(comments.length > 0) {
      comments = comments.filter(comment => comment.video_id === vidId && comment.parent_comment_id === null);
      numComments = comments.length;
    }

    let userAvatar = currentUser ? users[currentUser.id].profile_img_url : window.defaultUser;
    let userName;
    if(!currentUser || currentUser.profile_img_url !== "/avatars/original/missing.png") {
      userName = "";
    } else {
      userName = currentUser.username.slice(0,1)
    }

    return(
      <div className="user-comment-div-container">
        <div className="comments-container-num-comments">
          <p>{numComments} Comments</p>
          <nav><i className="fas fa-sort-amount-down"></i></nav>
        </div>
        <div className="user-comment-div">
          <span style={
            {backgroundImage: `url(${userAvatar})`}
          }>{userName}</span>
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

        <ul>
          {comments.reverse().map((comment,idx) => <CommentIndexItemContainer key={idx} createComment={createComment} currentUser={currentUser} user={users[comment.author_id]} users={users}comment={comment}/>)}
        </ul>

      </div>
    )
  }
}

export default CommentsIndex;
