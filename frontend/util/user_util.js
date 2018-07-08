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
