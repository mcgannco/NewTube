import values from 'lodash/values';

export const selectAllVideos = state => values(state.entities.videos);
export const selectAllComments = state => values(state.entities.comments);
