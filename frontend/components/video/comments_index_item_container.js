import {connect} from 'react-redux';
import { selectAllVideos, selectAllComments  } from '../../reducers/selectors';
import { createSubComment, editComment, deleteComment  } from '../../actions/comment_actions';
import CommentIndexItem from './comment_index_item';

const msp = (state, ownProps) => {
  return({
    comments: state.entities.comments,
  })
};

const mdp = dispatch => {
  return({
    createSubComment: (comment) => dispatch(createSubComment(comment)),
    editComment: (videoId, commentId, data) => dispatch(editComment(videoId, commentId, data)),
    deleteComment: (videoId, commentId) => dispatch(deleteComment(videoId, commentId))
  })
};

export default connect(msp, mdp)(CommentIndexItem);
