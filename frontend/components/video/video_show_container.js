import {connect} from 'react-redux';
import { requestSingleVideo, requestAllVideos  } from '../../actions/video_actions';
import { requestAllUsers  } from '../../actions/user_actions';
import { selectAllVideos  } from '../../reducers/selectors';
import VideoShow from './video_show';

const msp = (state, ownProps) => {
  return({
    videos: selectAllVideos(state),
    users: state.entities.users,
    video: state.entities.videos[ownProps.match.params.id]
  })
};

const mdp = dispatch => {
  return({
    requestSingleVideo: (id) => dispatch(requestSingleVideo(id)),
    requestAllVideos: () => dispatch(requestAllVideos()),
    requestAllUsers: () => dispatch(requestAllUsers()),
  })
};

export default connect(msp, mdp)(VideoShow);
