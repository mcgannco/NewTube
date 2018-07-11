import {connect} from 'react-redux';
import { requestAllUsers, requestSingleUser, editUser,createSub, deleteSub,clearUserErrors } from '../../actions/user_actions';
import { requestAllVideos } from '../../actions/video_actions';
import { selectAllVideos, selectAllChannels  } from '../../reducers/selectors';
import ChannelShow from './channel_show';

const msp = (state, ownProps) => {
  return({
    user: state.entities.users[ownProps.match.params.id],
    users: state.entities.users,
    users_arr:selectAllChannels(state),
    videos: selectAllVideos(state),
    currentUserID: state.session.id,
    loading: state.ui.loading.pictureLoading,
    errors: state.errors.session
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
     clearUserErrors: () => dispatch(clearUserErrors())
  })
};

export default connect(msp, mdp)(ChannelShow);
