import {connect} from 'react-redux';
import { signup, login, verifyUsername, receiveSessionErrors } from '../../actions/session_actions';
import SessionFrom from './session_form';

const msp = state => {
  return({
    errors: state.errors.session,
    formType: 'signup'
  })
};

const mdp = dispatch => {
  return({
    processForm: (user) => dispatch(signup(user)),
    login: (user) => dispatch(login(user)),
    verifyUsername: (username) => dispatch(verifyUsername(username)),
    receiveSessionErrors: (errors) => dispatch(receiveSessionErrors(errors))
  })
};

export default connect(msp, mdp)(SessionFrom);
