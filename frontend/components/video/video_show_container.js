import {connect} from 'react-redux';
import { requestSingleVideo  } from '../../actions/video_actions';
import { requestAllUsers  } from '../../actions/user_actions';
import VideoShow from './video_show';

const msp = (state, ownProps) => {
  return({
    users: state.entities.users,
    video: state.entities.videos[ownProps.match.params.id]
  })
};

const mdp = dispatch => {
  return({
    requestSingleVideo: (id) => dispatch(requestSingleVideo(id)),
    requestAllUsers: () => dispatch(requestAllUsers()),
  })
};

export default connect(msp, mdp)(VideoShow);
