import {connect} from 'react-redux';
import { requestAllVideos  } from '../../actions/video_actions';
import { selectAllVideos  } from '../../reducers/selectors';
import VideoIndex from './video_index';

const msp = state => {
  return({
    videos: selectAllVideos(state),
  })
};

const mdp = dispatch => {
  return({
    requestAllVideos: () => dispatch(requestAllVideos()),
  })
};

export default connect(msp, mdp)(VideoIndex);
