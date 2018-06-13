import {connect} from 'react-redux';
import { requestAllVideos  } from '../../actions/video_actions';
import UploadVideo from './upload_video';

const msp = state => {
  return({
    currentUser: state.entities.users[state.session.id]
  })
};

const mdp = dispatch => {
  return({
    createVideo: (vid) => dispatch(createVideo(vid)),
  })
};

export default connect(msp, mdp)(UploadVideo);
