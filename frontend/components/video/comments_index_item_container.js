import {connect} from 'react-redux';
import { selectAllVideos, selectAllComments  } from '../../reducers/selectors';
import { createSubComment  } from '../../actions/comment_actions';
import CommentIndexItem from './comment_index_item';

const msp = (state, ownProps) => {
  return({
    comments: state.entities.comments,
  })
};

const mdp = dispatch => {
  return({
    createSubComment: (comment) => dispatch(createSubComment(comment))
  })
};

export default connect(msp, mdp)(CommentIndexItem);
