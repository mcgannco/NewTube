import React from 'react';
import { closeVidModal } from '../../actions/video_modal_actions';
import { connect } from 'react-redux';
import EditVideoFormContainer from '../video_edit/edit_vid_container';
import DeleteVideoFormContainer from '../video_edit/delete_vid_container';

function VideoModal({modal, closeVidModal}) {
  if(!modal) {
    return null;
  }
  let component;
  switch (modal[0]) {
    case 'edit':
      component = <EditVideoFormContainer />;
      break;
    case 'delete':
      component = <DeleteVideoFormContainer />;
      break;
    default:
      return null;
  }
  return(
    <div className="video-modal-background" onClick={closeVidModal}>
      <div className="video-modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const msp = state => {
  return({
    modal: state.ui.vmodal
  });
};

const mdp = dispatch=> {
  return({
    closeVidModal: () => dispatch(closeVidModal())
  });
};

export default connect(msp, mdp)(VideoModal);
