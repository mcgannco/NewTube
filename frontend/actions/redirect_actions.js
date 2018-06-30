export const REDIRECT_TO_UPLOAD = 'REDIRECT_TO_UPLOAD';
export const RESET_REDIRECT = 'RESET_REDIRECT';

export const redirectToUpload = () => ({
  type: REDIRECT_TO_UPLOAD
});

export const resetRedirect = () => ({
  type: RESET_REDIRECT
});
