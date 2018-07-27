import {connect} from 'react-redux';
import AppShow from './app_show'
import { clearAllVideos, fetchTag } from '../../actions/video_actions';
import { selectAllVideos  } from '../../reducers/selectors';
import { createSub, deleteSub, createWatch, deleteWatch } from '../../actions/user_actions';
import { watchLaterButton } from '../../actions/video_actions';
import { openVidModal  } from '../../actions/video_modal_actions';

const msp = (state, ownProps) => {
  return({
    videos: selectAllVideos(state),
    users: state.entities.users,
    currentUser: state.session.id,
    button: state.ui.watchLaterBttn,
    trendingVideoIds: state.ui.filteredVideos["trending"],
    tag: state.ui.currentTag
  })
};

const mdp = dispatch => {
  return({
    clearAllVideos: () => dispatch(clearAllVideos()),
    fetchTag: (id) => dispatch(fetchTag(id)),
    createSub: (subscribeeId) => dispatch(createSub(subscribeeId)),
    deleteSub: (subscribeeId) => dispatch(deleteSub(subscribeeId)),
    createWatch: (vidId) => dispatch(createWatch(vidId)),
    deleteWatch: (vidId) => dispatch(deleteWatch(vidId)),
    watchLaterButton: (status) => dispatch(watchLaterButton(status)),
    openVidModal: (modal, vid) => dispatch(openVidModal(modal, vid)),
  })
};

export default connect(msp, mdp)(AppShow);
