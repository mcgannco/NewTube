import {connect} from 'react-redux';
import { login } from '../../actions/session_actions';
import { deleteVideo } from '../../actions/video_actions';
import { closeVidModal } from '../../actions/video_modal_actions';
import VideoForm from './video_form';

const msp = state => {
  return({
    formType: 'delete',
    video: state.ui.vmodal[1],
    nightMode: state.session.night_mode
  })
};

const mdp = dispatch => {
  return({
    processForm: (videoId) => dispatch(deleteVideo(videoId)),
    closeVidModal: () => dispatch(closeVidModal())
  })
};

export default connect(msp, mdp)(VideoForm);
