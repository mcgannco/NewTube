export const fetchAllUsers = () => (
  $.ajax({
    method: 'GET',
    url: 'api/users',
  })
);

export const fetchSingleUser = (id) => {
  return(
    $.ajax({
      method: 'GET',
      url: `api/users/${id}`,
    })
  )
}

export const updateUser = (userId, data) => {
  return $.ajax({
    method: 'PATCH',
    url: `api/users/${userId}`,
    data,
    processData: false,
    contentType: false,
    dataType: 'json',
  });
};

export const createLike = (videoId) => {
  return $.ajax({
    url: `api/users/likes/${videoId}`,
    method: 'post',
  });
};

export const createSub = (subscribeeId) => {
  return $.ajax({
    url: `api/users/subscriptions/${subscribeeId}`,
    method: 'post',
  });
};

export const deleteSub = (subscribeeId) => {
  return $.ajax({
    url: `api/users/subscriptions/${subscribeeId}`,
    method: 'delete',
  });
};

export const createWatch = (videoId) => {
  return $.ajax({
    url: `api/users/watchlaters/${videoId}`,
    method: 'post',
  });
};

export const deleteWatch = (videoId) => {
  return $.ajax({
    url: `api/users/watchlaters/${videoId}`,
    method: 'delete',
  });
};
