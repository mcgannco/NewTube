import {connect} from 'react-redux';
import { signup, login, verifyUsername, receiveSessionErrors, clearSessionErrors } from '../../actions/session_actions';
import SessionFrom from './session_form';

const msp = state => {
  return({
    errors: state.errors.session,
    formType: 'signup',
    loading: state.ui.loading.usernameLoading
  })
};

const mdp = dispatch => {
  return({
    processForm: (user) => dispatch(signup(user)),
    login: (user) => dispatch(login(user)),
    verifyUsername: (username) => dispatch(verifyUsername(username)),
    receiveSessionErrors: (errors) => dispatch(receiveSessionErrors(errors)),
    clearSessionErrors: () => dispatch(clearSessionErrors())
  })
};

export default connect(msp, mdp)(SessionFrom);
