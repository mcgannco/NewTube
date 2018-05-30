export const OPEN_SIDE_BAR = "OPEN_SIDE_BAR";
export const CLOSE_SIDE_BAR = "CLOSE_SIDE_BAR";

export const openSideBar = side_bar => {
  return({
    type: OPEN_SIDE_BAR,
    side_bar
  });
};

export const closeSideBar = side_bar => {
  return({
    type: CLOSE_SIDE_BAR,
    side_bar
  });
};
