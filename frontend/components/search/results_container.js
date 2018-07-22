import {connect} from 'react-redux';
import { fetchResultSearch, clearResultSearchTerm } from '../../actions/search_actions';
import { createSub, deleteSub } from '../../actions/user_actions';
import Results from './results';

const msp = (state) => {
  return({
    currentUser: state.session.id,
    users: state.entities.users,
    videos: state.entities.videos,
    query: state.ui.search.searchedTermResult,
    video_arr: state.ui.search.searchedResultVideos,
    user_arr: state.ui.search.searchedResultUsers,
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

  })
};

export default connect(msp, mdp)(Results);
