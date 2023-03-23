const getPagination = (page, size) => {
  const limit = size <= 0 ? size : 3;
  const offset = page < 0 ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit, DTO) => {
  const { count: totalItems, rows: payload } = data;
  const currentPage = page || 0;
  const totalPages = Math.ceil(totalItems / limit);
  return {
    totalItems,
    payload: payload.map((p) => new DTO(p)),
    totalPages,
    currentPage,
  };
};

module.exports = {
  getPagination,
  getPagingData,
};
