import {connect} from 'react-redux';
import { requestAllVideos, wacthButton, watchLaterButton  } from '../../actions/video_actions';
import { requestAllUsers, createWatch, deleteWatch  } from '../../actions/user_actions';
import { selectAllVideos  } from '../../reducers/selectors';
import { openVidModal  } from '../../actions/video_modal_actions';
import VideoIndex from './video_index';

const msp = state => {
  return({
    videos: selectAllVideos(state),
    users: state.entities.users,
    currentUserID: state.session.id,
    button: state.ui.watchLaterBttn,
    nightMode: state.session.night_mode
  })
};

const mdp = dispatch => {
  return({
    requestAllVideos: () => dispatch(requestAllVideos()),
    requestAllUsers: () => dispatch(requestAllUsers()),
    openVidModal: (modal, vid) => dispatch(openVidModal(modal, vid)),
    createWatch: (vidId) => dispatch(createWatch(vidId)),
    deleteWatch: (vidId) => dispatch(deleteWatch(vidId)),
    watchLaterButton: (status) => dispatch(watchLaterButton(status)),
  })
};

export default connect(msp, mdp)(VideoIndex);
