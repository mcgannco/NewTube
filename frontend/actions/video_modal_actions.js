export const OPEN_VIDEO_MODAL = "OPEN_VIDEO_MODAL";
export const CLOSE_VIDEO_MODAL = "CLOSE_VIDEO_MODAL";

export const openVidModal = (modal,vid) => {
  return({
    type: OPEN_VIDEO_MODAL,
    modal,
    vid
  });
};

export const closeVidModal = (modal,vid) => {
  return({
    type: CLOSE_VIDEO_MODAL,
    modal,
    vid
  });
};
