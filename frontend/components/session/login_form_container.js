import {connect} from 'react-redux';
import { login, verifyUsername, receiveSessionErrors, clearSessionErrors } from '../../actions/session_actions';
import SessionFrom from './session_form';

const msp = state => {
  return({
    errors: state.errors.session,
    formType: 'login'
  })
};

const mdp = dispatch => {
  return({
    processForm: (user) => dispatch(login(user)),
    login: (user) => dispatch(login(user)),
    verifyUsername: (username) => dispatch(verifyUsername(username)),
    receiveSessionErrors: (errors) => dispatch(receiveSessionErrors(errors)),
    clearSessionErrors: () => dispatch(clearSessionErrors())
  })
};

export default connect(msp, mdp)(SessionFrom);
