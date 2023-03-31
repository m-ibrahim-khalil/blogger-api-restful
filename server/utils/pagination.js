const getPagination = (page, size) => {
  page = page ? parseInt(page) : 0;
  size = size ? parseInt(size) : 5;
  const limit = size <= 0 ? 5 : size;
  const offset = page < 0 ?  0 : page * limit;
  return { limit, offset };
};

const getPagingData = (data, page, limit, DTO) => {
  const { count: totalItems, rows: payload } = data;
  const currentPage = page < 0 ? 0 : page;
  const totalPages = Math.ceil(totalItems / limit);
  return {
    totalItems,
    payload: payload.map((data) => new DTO(data)),
    totalPages,
    currentPage,
  };
};

module.exports = {
  getPagination,
  getPagingData,
};
