import {connect} from 'react-redux';
import { signup } from '../../actions/session_actions';
import SessionFrom from './session_form';

const msp = state => {
  return({
    errors: state.errors.session,
    formType: 'signup'
  })
};

const mdp = dispatch => {
  return({
    processForm: (user) => dispatch(signup(user))
  })
};

export default connect(msp, mdp)(SessionFrom);
