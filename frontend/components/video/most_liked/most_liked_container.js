import {connect} from 'react-redux';
import { createSub, deleteSub, createWatch, deleteWatch } from '../../../actions/user_actions';
import { openVidModal  } from '../../../actions/video_modal_actions';
import {requestAllVideos, watchLaterButton } from '../../../actions/video_actions';
import {selectAllVideos } from '../../../reducers/selectors';
import MostLikes from './most_liked'
const msp = (state, ownProps) => {
  return({
    videos: selectAllVideos(state),
    users: state.entities.users,
    currentUser: state.session.id,
    button: state.ui.watchLaterBttn,
    nightMode: state.session.night_mode
  })
};

const mdp = dispatch => {
  return({
    requestAllVideos: () => dispatch(requestAllVideos()),
    requestAllUsers: () => dispatch(requestAllUsers()),
    createSub: (subscribeeId) => dispatch(createSub(subscribeeId)),
    deleteSub: (subscribeeId) => dispatch(deleteSub(subscribeeId)),
    createWatch: (vidId) => dispatch(createWatch(vidId)),
    deleteWatch: (vidId) => dispatch(deleteWatch(vidId)),
    watchLaterButton: (status) => dispatch(watchLaterButton(status)),
    openVidModal: (modal, vid) => dispatch(openVidModal(modal, vid)),
  })
};

export default connect(msp, mdp)(MostLikes);
