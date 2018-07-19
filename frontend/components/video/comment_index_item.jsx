import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';
import CommentIndexItemContainer from './comments_index_item_container';

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      preview: false,
      subComment: false,
      subStr: "",
      allowSubmit: false,
      showReplies: false,
      optionsDropDown: false,
      targetComment: "",
      body: "",
      commentStatus: "",
      allowEditSubmit: false
    }
    this.showOptions = this.showOptions.bind(this);
    this.closeshowOptions = this.closeshowOptions.bind(this);
    this.commentCommentBar = this.commentCommentBar.bind(this);
    this.closeSubComment = this.closeSubComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.submit = this.submit.bind(this);
    this.toggleReplies = this.toggleReplies.bind(this);
    this.toggleCommentOptions = this.toggleCommentOptions.bind(this);
    this.closeToggleOptions = this.closeToggleOptions.bind(this);
    this.editComment = this.editComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.cancelUpdate = this.cancelUpdate.bind(this);
    this.updateCommentBody = this.updateCommentBody.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.formatNumber = this.formatNumber.bind(this);
  }

  showOptions() {
    this.setState({preview: true})
  }

  closeshowOptions() {
    this.setState({preview: false})
  }

  commentCommentBar(e) {
    this.setState({subComment: true})
  }

  closeSubComment(e) {
    this.setState({subComment: false, subStr: "", allowSubmit: false})
  }

  updateComment(e) {
    if (e.currentTarget.value !== "") {
      this.setState({subStr: e.currentTarget.value,allowSubmit: true})
    } else {
      this.setState({subStr: e.currentTarget.value, allowSubmit:false})
    }
  }

  submit(e) {
    if(this.state.subStr === "") {
      return null;
    } else {
      this.props.createSubComment({
        body: this.state.subStr,
        video_id: this.props.comment.video_id,
        author_id: this.props.currentUser.id,
        parent_comment_id: this.props.comment.id
       })
       .then(
        this.setState({subComment: false, subStr: "", allowSubmit: false})
      )
    }
  }

  toggleReplies(e) {
    e.preventDefault();
    this.setState({showReplies: !this.state.showReplies})
  }

  toggleCommentOptions(e, comment) {
    e.preventDefault()
    this.setState({ optionsDropDown: true, targetComment: comment, body: comment.body }, () => {
    document.getElementById('body-body').addEventListener('click', this.closeToggleOptions);
    });
  }

  closeToggleOptions(e) {
    e.preventDefault()
    if(e.target.id === "edit-comment") {
      this.editComment(e)
    } else if (e.target.id === "delete-comment") {
      this.deleteComment(e)
    } else {
      this.setState({ optionsDropDown: false, targetVid: "" }, () => {
        document.getElementById('body-body').removeEventListener('click', this.closeToggleOptions);
      });
    }
  }

  editComment(e) {
    this.setState({commentStatus: "edit", optionsDropDown: false})
  }

  deleteComment(e) {
    this.setState({commentStatus: "delete", optionsDropDown: false})
  }

  cancelUpdate(e) {
    this.setState({commentStatus: "", optionsDropDown: false, targetComment: "", body: "", allowEditSubmit: false })
  }

  updateCommentBody(e) {
    if (e.currentTarget.value !== "") {
      this.setState({body: e.currentTarget.value,allowEditSubmit: true})
    } else {
      this.setState({body: e.currentTarget.value, allowEditSubmit:false})
    }
  }

  submitEdit(e) {
    if(this.state.commentStatus === "edit") {
      if(this.state.body === "") {
        return null
      } else {
        const formData = new FormData();
        formData.append("comment[body]", this.state.body);
        this.props.editComment(this.state.targetComment.video_id, this.state.targetComment.id, formData).then(
          this.setState({optionsDropDown: false,targetComment: "",body: "",commentStatus: "",allowEditSubmit: false})
        )
      }
    } else if(this.state.commentStatus === "delete") {
      this.props.deleteComment(this.state.targetComment.video_id, this.state.targetComment.id).then(
        this.setState({optionsDropDown: false,targetComment: "",body: "",commentStatus: "",allowEditSubmit: false})
      )
    }
  }

  handleLike(e) {
    if (!this.props.comment) {
      return;
    }

    if (this.props.comment.currentUsersLike.like_value === 'N/A') {
      this.props.createCommentLike(this.props.comment.video_id, this.props.comment.id, {like_value: e});
    } else if (e === this.props.comment.currentUsersLike.like_value) {
      const likeId = this.props.comment.currentUsersLike.id;
      this.props.deleteCommentLike(likeId);
    } else {
      this.props.updateCommentLike(this.props.comment.video_id, this.props.comment.id, this.props.currentUser.id, {like_value: e});
    }
  }

  formatNumber(num) {
    num = Math.abs(num);
    let formattedNumber;
    if (num >= 1000000000) {
        formattedNumber = (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    } else if (num >= 1000000) {
        formattedNumber =  (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else  if (num >= 1000) {
        formattedNumber =  (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
        formattedNumber = num;
    }
    return formattedNumber;
  }

  render() {

    let { comment, user, currentUser, createComment, users, comments } = this.props;
    let date = new Date(comment.timestamp);
    if (!user || !comments) {
      return null;
    }

    let subuserAvatar;
    if(!currentUser) {
      subuserAvatar = window.defaultUser
    } else {
      subuserAvatar = currentUser.profile_img_url
    }
    let userAvatar = user.profile_img_url;
    let child_comments = [];
    if(comment.child_comment_ids.length > 0) {
      for (let i = 0; i < comment.child_comment_ids.length; i++) {
        child_comments.push(comments[comment.child_comment_ids[i]])
      }
    }

    let replyClass;
    let replyMessage;
    if(this.state.showReplies && child_comments.length > 0) {
      replyClass = "view-all-replies"
      replyMessage = 'Hide replies'
    } else if (child_comments.length === 0) {
        replyClass = "hidden"
        replyMessage = ""
    } else {
      replyClass = "view-all-replies"
      replyMessage = `View all ${child_comments.length} replies`
    }

    let toggleDD;
    if(this.state.optionsDropDown) {
      toggleDD = <div className={comment.author_id === currentUser.id ? "toggleCommentOptionsDD" : "hidden"} id="toggleDD">
        <span  id = "edit-comment" className={comment.author_id === currentUser.id ? "" : "hidden"}>Edit</span>
        <span id = "delete-comment" className={comment.author_id === currentUser.id ? "" : "hidden"}>Delete</span>
      </div>
    }

    let submitEditComment;

    if(this.state.commentStatus === "") {
      submitEditComment = "hidden";
    } else if (this.state.commentStatus === "edit" && this.state.allowEditSubmit) {
      submitEditComment = "submit-button";
    } else if (this.state.commentStatus === "delete") {
      submitEditComment = "submit-button";
    } else if (!this.state.allowEditSubmit) {
      submitEditComment = "no-submit-button";
    }

      return(
      <li>
        <div className="comment-content-container"
          onMouseEnter={this.showOptions}
          onMouseLeave={this.closeshowOptions}>
          <div className="parent-container">
          <div className="comment-icon">
            <span style={
              {backgroundImage: `url(${userAvatar})`}
             }>
              {user.profile_img_url != "/avatars/original/missing.png" ? "" : user.username.slice(0,1)}
            </span>
          </div>

          <nav className="hover-comment-container">
            <div className="hover-comment">
              <div className="comment-body">
              <Link to={`/channel/${user.id}`}><p>{user.username}</p></Link>
                <span>
                  <TimeAgo date={date} minPeriod='60' />
                </span>
              </div>
              <p className={this.state.commentStatus === "edit" ? "hidden" : "comment-body-body"}>{comment.body}</p>
              <input onChange={this.updateCommentBody} className={this.state.commentStatus === "edit" ? "comment-body-body-edit" : "hidden"} value={this.state.body}></input>

                <div className="children-comment-container">
                    <section className="children-comment">
                      <div className="children-comment-left">
                        <div>
                          <section className="comment-likes" onClick={() => this.handleLike(true)}>
                            <i className="fas fa-thumbs-up"></i>
                          </section>
                          <p className="comment-like-count">{this.formatNumber(comment.likes)}</p>
                        </div>

                        <div>
                          <section className="comment-likes" onClick={() => this.handleLike(false)}>
                            <i className="fas fa-thumbs-down"></i>
                          </section>
                          <p className="comment-like-count">{this.formatNumber(comment.dislikes)}</p>
                        </div>
                          <p className="reply-comment" onClick={this.commentCommentBar}>Reply</p>
                        </div>

                        <nav className="children-comment-right">
                          <button onClick={this.cancelUpdate} className={this.state.commentStatus === "edit" || this.state.commentStatus=== "delete" ? "cancel-button" : "hidden"}>Cancel</button>
                          <button onClick={this.submitEdit}className={submitEditComment}>Submit</button>
                        </nav>

                    </section>

                    <span className="child-comment-input-container">
                      <span className="child-comment-input">
                        <div className={this.state.subComment ? "little-comment-icon" : "hidden"}>
                          <span style={
                            {backgroundImage: `url(${subuserAvatar})`}
                           }>
                            {user.profile_img_url ? "" : user.username.slice(0,1)}
                          </span>
                        </div>

                        <input placeholder="Add a public reply" onChange={this.updateComment}value={this.state.subStr}className={this.state.subComment ? "new-comment" : "hidden"}></input>
                      </span>
                      <span className={this.state.subComment ? "sub-comment-buttons" : "hidden"}>
                        <button onClick={this.closeSubComment}className="cancel-button">Cancel</button>
                        <button onClick={this.submit} className={this.state.allowSubmit ? "submit-button" : "no-submit-button"}>Submit</button>
                    </span>
                    </span>

                    <span onClick={this.toggleReplies} className={replyClass}>{replyMessage} <i className="fas fa-angle-down"></i></span>
                </div>
          </div>
            <span onClick={(e) => this.toggleCommentOptions(e, comment)}className={this.state.preview ? "opitions" : "hiddenoption"}>
              <i className="fas fa-ellipsis-v"></i>
            </span>
            {toggleDD}
          </nav>
          </div>

        </div>


        <ul className={this.state.showReplies ? "" : "hidden"}>
          {child_comments.length > 0 ? child_comments.reverse().map((child,idx) => <CommentIndexItemContainer key={idx} createComment={createComment} currentUser={currentUser} user={users[child.author_id]} users={users} comment={child}/>) : null}
        </ul>

      </li>
    )
  }

};

export default CommentIndexItem;
