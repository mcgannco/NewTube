import {connect} from 'react-redux';
import { fetchSearch, fetchResultSearch } from '../../actions/search_actions';
import Search from './search';

const msp = (state) => {
  return({
    video_arr: state.ui.search.searchedVideos,
    user_arr: state.ui.search.searchedUsers,
    users: state.entities.users,
    videos: state.entities.videos,
    searchedTerm: state.ui.search.searchedTerm
  })
};

const mdp = dispatch => {
  return({
     fetchSearch: (query) => dispatch(fetchSearch(query)),
     fetchResultSearch: (query) => dispatch(fetchResultSearch(query)),
  })
};

export default connect(msp, mdp)(Search);
