import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import { fetchTopTags } from '../../actions/video_actions';
import NavBar from './nav_bar';

const msp = state => {
  return({
    currentUser: state.entities.users[state.session.id],
    topTags: state.ui.topTags
  })
};

const mdp = dispatch => {
  return({
    logout: () => dispatch(logout()),
    openModal: modal => dispatch(openModal(modal)),
    fetchTopTags: () => dispatch(fetchTopTags())
  })
};

export default connect(msp, mdp)(NavBar);
