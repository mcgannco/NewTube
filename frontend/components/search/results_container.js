import {connect} from 'react-redux';
import { fetchResultSearch, clearResultSearchTerm } from '../../actions/search_actions';
import { createSub, deleteSub, createWatch, deleteWatch } from '../../actions/user_actions';
import { watchLaterButton } from '../../actions/video_actions';
import Results from './results';
import { openVidModal  } from '../../actions/video_modal_actions';

const msp = (state) => {
  return({
    currentUser: state.session.id,
    users: state.entities.users,
    videos: state.entities.videos,
    query: state.ui.search.searchedTermResult,
    video_arr: state.ui.search.searchedResultVideos,
    user_arr: state.ui.search.searchedResultUsers,
    button: state.ui.watchLaterBttn
  })
};

const mdp = dispatch => {
  return({
     fetchResultSearch: (query) => dispatch(fetchResultSearch(query)),
     requestAllVideos: () => dispatch(requestAllVideos()),
     requestAllUsers: () => dispatch(requestAllUsers()),
     clearResultSearchTerm: () => dispatch(clearResultSearchTerm()),
     createSub: (subscribeeId) => dispatch(createSub(subscribeeId)),
     deleteSub: (subscribeeId) => dispatch(deleteSub(subscribeeId)),
     createWatch: (vidId) => dispatch(createWatch(vidId)),
     deleteWatch: (vidId) => dispatch(deleteWatch(vidId)),
     watchLaterButton: (status) => dispatch(watchLaterButton(status)),
     openVidModal: (modal, vid) => dispatch(openVidModal(modal, vid)),
  })
};

export default connect(msp, mdp)(Results);
