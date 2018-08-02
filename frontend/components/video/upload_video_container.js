import {connect} from 'react-redux';
import { requestAllVideos,clearAllVideoErrors, createVideo } from '../../actions/video_actions';
import UploadVideo from './upload_video';

const msp = state => {
  return({
    currentUser: state.entities.users[state.session.id],
    errors: state.errors.videos,
    videoLoad: state.ui.loading.videoLoad,
    nightMode: state.session.night_mode
  })
};

const mdp = dispatch => {
  return({
    createVideo: (vid) => dispatch(createVideo(vid)),
    clearAllVideoErrors: () => dispatch(clearAllVideoErrors())
  })
};

export default connect(msp, mdp)(UploadVideo);
