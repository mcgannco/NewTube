import {connect} from 'react-redux';
import { requestAllUsers,createWatch, deleteWatch, requestSingleUser, editUser,createSub, deleteSub,clearUserErrors } from '../../actions/user_actions';
import { requestAllVideos,watchLaterButton } from '../../actions/video_actions';
import { selectAllVideos, selectAllChannels  } from '../../reducers/selectors';
import { openVidModal  } from '../../actions/video_modal_actions';
import { clearSideBarLink  } from '../../actions/side_bar_actions';
import ChannelShow from './channel_show';

const msp = (state, ownProps) => {
  return({
    user: state.entities.users[ownProps.match.params.id],
    users: state.entities.users,
    users_arr:selectAllChannels(state),
    videos: selectAllVideos(state),
    currentUserID: state.session.id,
    loading: state.ui.loading.pictureLoading,
    errors: state.errors.session,
    button: state.ui.watchLaterBttn,
    sideLink: state.ui.sideLink,
    nightMode: state.session.night_mode
  })
};

const mdp = dispatch => {
  return({
    requestSingleUser: (id) => dispatch(requestSingleUser(id)),
    requestAllUsers: () => dispatch(requestAllUsers()),
    requestAllVideos: () => dispatch(requestAllVideos()),
     editUser: (id, data) => dispatch(editUser(id, data)),
     createSub: (subscribeeId) => dispatch(createSub(subscribeeId)),
     deleteSub: (subscribeeId) => dispatch(deleteSub(subscribeeId)),
     clearUserErrors: () => dispatch(clearUserErrors()),
     openVidModal: (modal, vid) => dispatch(openVidModal(modal, vid)),
     createWatch: (vidId) => dispatch(createWatch(vidId)),
     deleteWatch: (vidId) => dispatch(deleteWatch(vidId)),
     watchLaterButton: (status) => dispatch(watchLaterButton(status)),
     clearSideBarLink: () => dispatch(clearSideBarLink()),
  })
};

export default connect(msp, mdp)(ChannelShow);
