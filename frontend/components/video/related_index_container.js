import {connect} from 'react-redux';
import {requestAllVideos, watchLaterButton } from '../../actions/video_actions';
import { requestAllUsers, createWatch, deleteWatch,toggleAutoPlay  } from '../../actions/user_actions';
import { selectAllVideos  } from '../../reducers/selectors';
import { openVidModal  } from '../../actions/video_modal_actions';
import RelatedIndex from './related_index';

const msp = (state, ownProps) => {
  return({
    videos: selectAllVideos(state),
    users: state.entities.users,
    currentUserID: state.session.id,
    button: state.ui.watchLaterBttn,
    nightMode: state.session.night_mode,
    videoQueue: state.ui.vidPlaying.videoQueue,
    autoplay: state.session.autoplay
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
    toggleAutoPlay: (id, data) => dispatch(toggleAutoPlay(id, data))
  })
};

export default connect(msp, mdp)(RelatedIndex);
