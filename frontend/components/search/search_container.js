import {connect} from 'react-redux';
import { fetchSearch } from '../../actions/search_actions';
import Search from './search';

const msp = (state) => {
  return({
    video_arr: state.ui.search.searchedVideos,
    user_arr: state.ui.search.searchedUsers,
    users: state.entities.users,
    videos: state.entities.videos
  })
};

const mdp = dispatch => {
  return({
     fetchSearch: (query) => dispatch(fetchSearch(query)),
  })
};

export default connect(msp, mdp)(Search);
