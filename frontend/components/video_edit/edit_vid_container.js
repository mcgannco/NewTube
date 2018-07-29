import {connect} from 'react-redux';
import { login } from '../../actions/session_actions';
import { editVideo } from '../../actions/video_actions';
import { closeVidModal } from '../../actions/video_modal_actions';
import VideoForm from './video_form';

const msp = state => {
  return({
    formType: 'edit',
    video: state.ui.vmodal[1],
    nightMode: state.session.night_mode
  })
};

const mdp = dispatch => {
  return({
    processForm: (videoId, data) => dispatch(editVideo(videoId, data)),
    closeVidModal: () => dispatch(closeVidModal())
  }
  )
};

export default connect(msp, mdp)(VideoForm);
