import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { sideBarLink } from '../../actions/side_bar_actions';
import { requestSubscriptions } from '../../actions/user_actions';
import { selectAllChannels } from '../../reducers/selectors';
import { connect } from 'react-redux';
import SideBar from '../side_bar/side_bar';

class Modal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {modal, closeModal, usersArr, currentUser, currentUserId, sideBarLink, sideLink, users, requestSubscriptions} = this.props

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
    component = <SideBar status={"close"} usersArr={usersArr} currentUserId={currentUserId} requestSubscriptions={requestSubscriptions} users={users} sideBarLink={sideBarLink} sideLink={sideLink} currentUser={currentUser} closeModal={closeModal} />;

    } else {
      modalid= "modal-background"
      modalClass = "modal-id-n"
      classN = "modal-child-y";
      click = closeModal;
      clickChild = e => e.stopPropagation();

      switch (modal) {
        case 'sidebar':
        component = <SideBar status={"open"} usersArr={usersArr} currentUserId={currentUserId} requestSubscriptions={requestSubscriptions} users={users} sideBarLink={sideBarLink} sideLink={sideLink} currentUser={currentUser} closeModal={closeModal} />;
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
  let cId;
  if(state.session.id) {
    cId = state.session.id
  }
  return({
    modal: state.ui.modal,
    currentUserId: state.session.id,
    currentUser: state.entities.users[cId] || {},
    sideLink: state.ui.sideLink,
    users: state.entities.users,
    usersArr: selectAllChannels(state)
  });
};

const mdp = dispatch=> {
  return({
    closeModal: () => dispatch(closeModal()),
    sideBarLink: (link) => dispatch(sideBarLink(link)),
    requestSubscriptions: () => dispatch(requestSubscriptions())
  });
};

export default connect(msp, mdp)(Modal);
