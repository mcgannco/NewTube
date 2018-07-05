import {connect} from 'react-redux';
import { requestSingleUser  } from '../../actions/user_actions';
import ChannelShow from './channel_show';

const msp = (state, ownProps) => {
  return({
    user: state.entities.users[ownProps.match.params.id],
  })
};

const mdp = dispatch => {
  return({
    requestSingleUser: (id) => dispatch(requestSingleUser(id)),
  })
};

export default connect(msp, mdp)(ChannelShow);
