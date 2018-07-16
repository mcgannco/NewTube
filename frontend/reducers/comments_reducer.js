import { RECEIVE_ALL_COMMENTS, RECEIVE_COMMENT, RECEIVE_SUB_COMMENT } from '../actions/comment_actions';
import merge from 'lodash/merge';
import _ from 'lodash';

const commentsReducer =  (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  let subComment;
  let parentComment;

  switch(action.type) {
    case RECEIVE_ALL_COMMENTS:
      return(merge({}, state, action.comments));
    case RECEIVE_COMMENT:
      return Object.assign({}, state, {[action.comment.id]: action.comment});
    case RECEIVE_SUB_COMMENT:
      newState = _.merge({}, state);
      subComment = {[action.comment.id]: action.comment};
      parentComment = {[action.comment.parent_comment_id]: newState[action.comment.parent_comment_id]};
      parentComment[action.comment.parent_comment_id].child_comment_ids = parentComment[action.comment.parent_comment_id].child_comment_ids.concat(subComment[action.comment.id].id)

      return Object.assign({}, newState, subComment, parentComment);

    default:
      return state;
  }
};

export default commentsReducer;
