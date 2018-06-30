import {connect} from 'react-redux';
import { login, verifyUsername, receiveSessionErrors, clearSessionErrors } from '../../actions/session_actions';
import { redirectToUpload, resetRedirect } from '../../actions/redirect_actions';
import SessionFrom from './session_form';

const msp = state => {
  return({
    errors: state.errors.session,
    formType: 'login',
    loading: state.ui.loading.usernameLoading,
    uploadRedirect: state.ui.uploadRedirect
  })
};

const mdp = dispatch => {
  return({
    processForm: (user) => dispatch(login(user)),
    login: (user) => dispatch(login(user)),
    verifyUsername: (username) => dispatch(verifyUsername(username)),
    receiveSessionErrors: (errors) => dispatch(receiveSessionErrors(errors)),
    clearSessionErrors: () => dispatch(clearSessionErrors()),
    redirectToUpload: () => dispatch(redirectToUpload()),
    resetRedirect: () => dispatch(resetRedirect()),
  })
};

export default connect(msp, mdp)(SessionFrom);
