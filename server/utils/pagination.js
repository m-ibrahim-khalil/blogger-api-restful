const getPagination = (page, size) => {
  const limit = Math.abs(size ? size : 3);
  const offset = Math.abs(page ? page * limit : 0);

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: payload } = data;
    const currentPage = page ? page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, payload, totalPages, currentPage };
  };
  

module.exports = {
    getPagination,
    getPagingData
};