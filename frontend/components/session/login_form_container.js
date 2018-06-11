import {connect} from 'react-redux';
import { login } from '../../actions/session_actions';
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
    login: (user) => dispatch(login(user))
  })
};

export default connect(msp, mdp)(SessionFrom);
