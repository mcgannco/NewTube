import React from 'react';
import { Link } from 'react-router-dom';
import CommentIndexItemContainer from './comments_index_item_container';

class CommentsIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentInput: "",
      submitButtons: false,
      allowSubmit: false,
      commentSort: "time",
      commentsDropDown: false
    }
    this.updateInput = this.updateInput.bind(this);
    this.showButton = this.showButton.bind(this);
    this.hideButtons = this.hideButtons.bind(this);
    this.submit = this.submit.bind(this);
    this.toggleCommentSort = this.toggleCommentSort.bind(this);
    this.closeCommentSort = this.closeCommentSort.bind(this);
    this.commentSortSet = this.commentSortSet.bind(this);
    this.topComment = this.topComment.bind(this);
    this.merge = this.merge.bind(this);
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

  commentSortSet(e) {
    this.setState({commentSort: e})
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

  toggleCommentSort(e) {
    e.preventDefault()
    this.setState({ commentsDropDown: true }, () => {
    document.addEventListener('click', this.closeCommentSort);
    });
  }

  closeCommentSort(e) {
    e.preventDefault();
    this.setState({ commentsDropDown: false }, () => {
      document.removeEventListener('click', this.closeCommentSort);
    });
  }

  topComment(comments) {
    if (comments.length < 2) {
      return comments;
    } else {
      const middle = Math.floor(comments.length / 2);
      const left = this.topComment(comments.slice(0, middle));
      const right = this.topComment(comments.slice(middle));
      return this.merge(left, right);
    }
  }

  merge(left, right) {
    const merged = [];
    while (left.length > 0 && right.length > 0) {
      let nextItem = ((left[0].likes - left[0].dislikes) > (right[0].likes - right[0].dislikes)) ? left.shift() : right.shift();
      merged.push(nextItem);
    }
    return merged.concat(left, right);
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
    let commentsSortDD;
    if(this.state.commentsDropDown) {
      commentsSortDD = <div className="comment-sort-dd-container">
        <span onClick={() => this.commentSortSet('likes')} className={this.state.commentSort === "likes" ? "comment-select" : "comment-unselect"}>Top Comments</span>
        <span onClick={() => this.commentSortSet('time')}className={this.state.commentSort === "time" ? "comment-select" : "comment-unselect"}>Newest First</span>
      </div>
    }

    let commentsSorted;
    if(this.state.commentSort === "time") {
      commentsSorted = comments.reverse();
    } else {
      commentsSorted = this.topComment(comments);
    }
    return(
      <div className="user-comment-div-container">
        <div className="comments-container-num-comments">
          <p>{numComments} Comments</p>
          <nav className="comment-sort" onClick={this.toggleCommentSort}><i className="fas fa-sort-amount-down"></i>
        {commentsSortDD}
          </nav>
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
          {commentsSorted.map((comment,idx) => <CommentIndexItemContainer key={idx} createComment={createComment} currentUser={currentUser} user={users[comment.author_id]} users={users}comment={comment}/>)}
        </ul>

      </div>
    )
  }
}

export default CommentsIndex;
