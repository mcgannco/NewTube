import {connect} from 'react-redux';
import { requestAllVideos,clearAllVideoErrors } from '../../actions/video_actions';
import UploadVideo from './upload_video';

const msp = state => {
  return({
    currentUser: state.entities.users[state.session.id],
    errors: state.errors.videos,
    videoLoad: state.ui.loading.videoLoad
  })
};

const mdp = dispatch => {
  return({
    createVideo: (vid) => dispatch(createVideo(vid)),
    clearAllVideoErrors: () => dispatch(clearAllVideoErrors())
  })
};

export default connect(msp, mdp)(UploadVideo);
