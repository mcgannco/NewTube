import {connect} from 'react-redux';
import { createSub, deleteSub, createWatch, deleteWatch, requestSingleUser } from '../../../actions/user_actions';
import { openVidModal  } from '../../../actions/video_modal_actions';
import {requestAllVideos, watchLaterButton, clearAllVideos, fetchHistory } from '../../../actions/video_actions';
import {selectAllVideos } from '../../../reducers/selectors';
import History from './history'
const msp = (state, ownProps) => {
  return({
    videos: selectAllVideos(state),
    users: state.entities.users,
    currentUser: state.session.id,
    button: state.ui.watchLaterBttn,
    videoHash: state.entities.videos
  })
};

const mdp = dispatch => {
  return({
    requestAllVideos: () => dispatch(requestAllVideos()),
    requestSingleUser: (id) => dispatch(requestSingleUser(id)),
    createSub: (subscribeeId) => dispatch(createSub(subscribeeId)),
    deleteSub: (subscribeeId) => dispatch(deleteSub(subscribeeId)),
    createWatch: (vidId) => dispatch(createWatch(vidId)),
    deleteWatch: (vidId) => dispatch(deleteWatch(vidId)),
    watchLaterButton: (status) => dispatch(watchLaterButton(status)),
    openVidModal: (modal, vid) => dispatch(openVidModal(modal, vid)),
    clearAllVideos: () => dispatch(clearAllVideos()),
    fetchHistory: (offSet) => dispatch(fetchHistory(offSet))
  })
};

export default connect(msp, mdp)(History);
