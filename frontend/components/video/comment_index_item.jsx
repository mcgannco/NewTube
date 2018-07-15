import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      preview: false,
      subComment: false,
      subStr: "",
      allowSubmit: false
    }
    this.showOptions = this.showOptions.bind(this);
    this.closeshowOptions = this.closeshowOptions.bind(this);
    this.commentCommentBar = this.commentCommentBar.bind(this);
    this.closeSubComment = this.closeSubComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.submit = this.submit.bind(this);
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
      this.props.createComment({
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

  render() {
    let { comment, user, currentUser } = this.props;
    let date = new Date(comment.timestamp);
    if (!user) {
      return null;
    }
    let userAvatar = user.profile_img_url;
    let subuserAvatar = currentUser.profile_img_url;

    return(
      <li
        onMouseEnter={this.showOptions}
        onMouseLeave={this.closeshowOptions}
        >
        <div className="comment-content-container">
          <div className="parent-container">
          <div className="comment-icon">
            <span style={
              {backgroundImage: `url(${userAvatar})`}
             }>
              {user.profile_img_url ? "" : user.username.slice(0,1)}
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
              <p className="comment-body-body">{comment.body}</p>

                <div className="children-comment-container">
                  <div className="children-comment">
                    <div>
                      <i className="fas fa-thumbs-up"></i>
                      <p className="comment-like-count"> 344</p>
                    </div>
                    <div>
                      <i className="fas fa-thumbs-down"></i>
                      <p className="comment-like-count"> 344</p>
                    </div>
                      <p className="reply-comment" onClick={this.commentCommentBar}>Reply</p>
                    </div>

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

                    <span className="view-all-replies">View all 12 replies <i className="fas fa-angle-down"></i></span>
                </div>
          </div>
            <span className={this.state.preview ? "opitions" : "hiddenoption"}>
              <i className="fas fa-ellipsis-v"></i>
            </span>
          </nav>
          </div>

        </div>

      </li>
    )

  }

};

export default CommentIndexItem;
