import {connect} from 'react-redux';
import { requestSingleVideo,
  requestAllVideos,
  vPlaying,
createLike, updateLike, deleteLike, createView  } from '../../actions/video_actions';
import { createComment, requestAllComments  } from '../../actions/comment_actions';
import { requestAllUsers  } from '../../actions/user_actions';
import { selectAllVideos  } from '../../reducers/selectors';
import VideoShow from './video_show';

const msp = (state, ownProps) => {
  return({
    videos: selectAllVideos(state),
    users: state.entities.users,
    video: state.entities.videos[ownProps.match.params.id],
    comments: state.entities.comments,
    vidPlaying: state.ui.vidPlaying.vidPlaying,
    currentUser: state.entities.users[state.session.id]
  })
};

const mdp = dispatch => {
  return({
    requestSingleVideo: (id) => dispatch(requestSingleVideo(id)),
    requestAllVideos: () => dispatch(requestAllVideos()),
    requestAllUsers: () => dispatch(requestAllUsers()),
    createComment: (comment) => dispatch(createComment(comment)),
    requestAllComments: (id) => dispatch(requestAllComments(id)),
    vPlaying: (bool) => dispatch(vPlaying(bool)),
    createLike: (videoId, like) => dispatch(createLike(videoId, like)),
    updateLike: (videoId, userId, like) => dispatch(updateLike(videoId, userId, like)),
    deleteLike: (id) => dispatch(deleteLike(id)),
    createView: (videoId) => dispatch(createView(videoId)),
  })
};

export default connect(msp, mdp)(VideoShow);
