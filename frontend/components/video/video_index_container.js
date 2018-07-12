import {connect} from 'react-redux';
import { requestAllVideos  } from '../../actions/video_actions';
import { requestAllUsers  } from '../../actions/user_actions';
import { selectAllVideos  } from '../../reducers/selectors';
import { openVidModal  } from '../../actions/video_modal_actions';
import VideoIndex from './video_index';

const msp = state => {
  return({
    videos: selectAllVideos(state),
    users: state.entities.users,
    currentUserID: state.session.id,
  })
};

const mdp = dispatch => {
  return({
    requestAllVideos: () => dispatch(requestAllVideos()),
    requestAllUsers: () => dispatch(requestAllUsers()),
    openVidModal: (modal, vid) => dispatch(openVidModal(modal, vid)),
  })
};

export default connect(msp, mdp)(VideoIndex);
