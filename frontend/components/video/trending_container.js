import {connect} from 'react-redux';
import { selectAllVideos  } from '../../reducers/selectors';
import { requestTrendingVideos  } from '../../actions/filtered_video_actions';
import { createSub, deleteSub, createWatch, deleteWatch, requestAllUsers } from '../../actions/user_actions';
import { watchLaterButton, requestAllVideos } from '../../actions/video_actions';
import { openVidModal  } from '../../actions/video_modal_actions';

import Trending from './trending';

const msp = (state) => {
  return({
    videos: selectAllVideos(state),
    videoHash: state.entities.videos,
    users: state.entities.users,
    currentUser: state.session.id,
    button: state.ui.watchLaterBttn,
    trendingVideoIds: state.ui.filteredVideos["trending"],
    nightMode: state.session.night_mode
  })
};

const mdp = dispatch => {
  return({
    requestAllVideos: () => dispatch(requestAllVideos()),
    requestAllUsers: () => dispatch(requestAllUsers()),
    requestTrendingVideos: () => dispatch(requestTrendingVideos()),
    createSub: (subscribeeId) => dispatch(createSub(subscribeeId)),
    deleteSub: (subscribeeId) => dispatch(deleteSub(subscribeeId)),
    createWatch: (vidId) => dispatch(createWatch(vidId)),
    deleteWatch: (vidId) => dispatch(deleteWatch(vidId)),
    watchLaterButton: (status) => dispatch(watchLaterButton(status)),
    openVidModal: (modal, vid) => dispatch(openVidModal(modal, vid)),

  })
};

export default connect(msp, mdp)(Trending);
