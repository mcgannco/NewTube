import {connect} from 'react-redux';
import { requestAllVideos  } from '../../actions/video_actions';
import { requestAllUsers  } from '../../actions/user_actions';
import { selectAllVideos  } from '../../reducers/selectors';
import VideoIndex from './video_index';

const msp = state => {
  return({
    videos: selectAllVideos(state),
    users: state.entities.users
  })
};

const mdp = dispatch => {
  return({
    requestAllVideos: () => dispatch(requestAllVideos()),
    requestAllUsers: () => dispatch(requestAllUsers()),
  })
};

export default connect(msp, mdp)(VideoIndex);
