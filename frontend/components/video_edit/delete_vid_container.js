import {connect} from 'react-redux';
import { login } from '../../actions/session_actions';
import VideoForm from './video_form';

const msp = state => {
  return({
    formType: 'delete',
    video: state.ui.vmodal[1]
  })
};

const mdp = dispatch => {
  return({
    processForm: (user) => dispatch(login(user)),
  })
};

export default connect(msp, mdp)(VideoForm);
