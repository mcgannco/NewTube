export const fetchSearch = query => {
  return $.ajax({
    method: "GET",
    url:'api/search',
    data: { query }
  });
};
