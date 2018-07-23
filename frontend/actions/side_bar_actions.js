export const SIDE_BAR_LINK = 'SIDE_BAR_LINK';
export const CLEAR_SIDE_BAR_LINK = 'CLEAR_SIDE_BAR_LINK';

export const sideBarLink = (link) => (
  {
    type: SIDE_BAR_LINK,
    link
  }
);

export const clearSideBarLink = () => (
  {
    type: CLEAR_SIDE_BAR_LINK,
  }
);
