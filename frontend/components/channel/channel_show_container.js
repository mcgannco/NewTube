import {connect} from 'react-redux';
import { requestSingleUser, editUser } from '../../actions/user_actions';
import ChannelShow from './channel_show';

const msp = (state, ownProps) => {
  return({
    user: state.entities.users[ownProps.match.params.id],
    currentUserID: state.session.id,
  })
};

const mdp = dispatch => {
  return({
    requestSingleUser: (id) => dispatch(requestSingleUser(id)),
    editUser: (id, data) => dispatch(editUser(id, data)),
  })
};

export default connect(msp, mdp)(ChannelShow);
