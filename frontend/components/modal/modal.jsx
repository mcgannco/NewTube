import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import SideBar from '../side_bar/side_bar';

class Modal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {modal, closeModal, currentUser} = this.props

    let modalClass;
    let modalid;
    let classN;
    let click;
    let clickChild;
    let component;

    if (!modal) {
      modalid= "modal-background"
      modalClass = "modal-id-y"
      classN = "modal-child-n";
      click = null;
      clickChild = null;
      component = <SideBar status={"close"} currentUser={currentUser} closeModal={closeModal} />;

    } else {
      modalid= "modal-background"
      modalClass = "modal-id-n"
      classN = "modal-child-y";
      click = closeModal;
      clickChild = e => e.stopPropagation();

      switch (modal) {
        case 'sidebar':
        component = <SideBar status={"open"} currentUser={currentUser} closeModal={closeModal} />;
        break;
        default:
        return null;
      }

    }

  return(
    <div id={modalid} className={modalClass}  onClick={click}>
      <div id="modal-child" className ={classN} onClick={clickChild}>
        { component }
      </div>
    </div>
  );
}
}

const msp = state => {
  return({
    modal: state.ui.modal,
    currentUser: state.session.id
  });
};

const mdp = dispatch=> {
  return({
    closeModal: () => dispatch(closeModal())
  });
};

export default connect(msp, mdp)(Modal);
