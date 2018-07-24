import {connect} from 'react-redux';
import { selectAllVideos, selectAllComments  } from '../../reducers/selectors';
import { createSubComment, editComment, deleteComment, createCommentLike, updateCommentLike,
deleteCommentLike  } from '../../actions/comment_actions';
import CommentIndexItem from './comment_index_item';

const msp = (state, ownProps) => {
  return({
    comments: state.entities.comments,
    currentUserId: state.session.id
  })
};

const mdp = dispatch => {
  return({
    createSubComment: (comment) => dispatch(createSubComment(comment)),
    editComment: (videoId, commentId, data) => dispatch(editComment(videoId, commentId, data)),
    deleteComment: (videoId, commentId) => dispatch(deleteComment(videoId, commentId)),
    createCommentLike: (videoId, commentId, like) => dispatch(createCommentLike(videoId, commentId, like)),
    updateCommentLike: (videoId, commentId, user_id, like) => dispatch(updateCommentLike(videoId, commentId, user_id, like)),
    deleteCommentLike: (id) => dispatch(deleteCommentLike(id)),
  })
};

export default connect(msp, mdp)(CommentIndexItem);
